import Vue from "vue";
import { Toast } from "vant";
Vue.use(Toast);
import axios from "axios";
import storage from "good-storage";
import config from "../utils/config";

// 配置请求头
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
axios.defaults.headers.post["Content-Type"] = "application/json;charset=UTF-8";
// if (token) {
// axios.defaults.headers.common['Authorization'] = 'Bearer ' + window.localStorage.getItem('token');
// }
// 静态资源
Vue.prototype.$static = "";
// 配置接口地址
// axios.defaults.baseURL = config.baseUrl;
axios.defaults.baseURL = "/api";
// 超时时间
axios.defaults.timeout = 15000;
// 配置cookie
// axios.defaults.withCredentials=true;
// http请求拦截器
axios.interceptors.request.use(
  (config) => {
    console.log("数据获取",storage.get("token"));
    if (storage.get("token")) {
        config.headers.Authorization = "Bearer " + storage.get("token");
    }
    return config;
  },
  (error) => {
    setTimeout(() => {
      Toast.clear();
      Toast("加载超时");
    }, 3000);
    return Promise.reject(error);
  }
);
// http响应拦截器
axios.interceptors.response.use(
  (data) => {
    // 响应成功关闭loading
    Toast.clear();
    return data;
  },
  (error) => {
    setTimeout(() => {
      Toast.clear();
      Toast("请求失败，换稍后再试");
    }, 3000);
    return Promise.reject(error);
  }
);

// 发送请求
export function post(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, params)
      .then(
        (res) => {
          resolve(res.data);
        },
        (err) => {
          reject(err.data);
        }
      )
      .catch((err) => {
        reject(err.data);
      });
  });
}

export function get(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params: params,
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.data);
      });
  });
}

export function del(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .delete(url, {
        params: params,
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.data);
      });
  });
}

export function patch(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .patch(url, params)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.data);
      });
  });
}
