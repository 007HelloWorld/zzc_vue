import axios from 'axios'
import { Message } from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
NProgress.configure({
  easing: 'ease',
  speed: 500,
  showSpinner: false
})

const request = axios.create({
  baseURL: process.env.VUE_APP_API_HOST,
  timeout: 10000,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
})
const noProgressList = ['/invest/api/1/v1/oaRecords/getOARecordByDataId']
// 请求拦截器
request.interceptors.request.use(
  (config) => {
    // 某些接口不需要加载进度条，比如需要轮询的接口
    if (noProgressList.indexOf(config.url) === -1) {
      NProgress.start() // 开始
    }
    if (config.method === 'post') {
      config.data = config.data || {}
    }
    // let userInfo = sessionStorage.getItem('ngStorage-currentUser')
    // let token = userInfo ? JSON.parse(userInfo).token : ''
    // if (token) {
    //   config.headers.token = token
    //   config.headers.Authorization = 'Bearer ' + token
    // }
    // 文件上传的请求超时时间设置为两分钟
    if (config.type && config.type === 'file') {
      config.timeout = 120000
    }
    // console.log(config)
    return config
  },
  (error) => {
    console.log(error)
    Message.error('网络错误！')
    // 触发promise的reject事件
    return Promise.reject(error)
  }
)
// 响应拦截器
request.interceptors.response.use(
  (response) => {
    NProgress.done()
    // /uc/sso/auth 接口特殊判断 status500，重新登录
    const res = response.data
    if (res) {
      if (res.state === false) {
        Message.error(res.message)
        return Promise.reject(res)
      } else {
        return res
      }
    } else {
      return Promise.reject(res)
    }
  },
  (error) => {
    if (error.message !== '取消上传') {
      Message.error(error.message || '网络错误！')
    }
    return Promise.reject(error)
  }
)

export default request
