import moment from 'moment' // 日期格式化插件

export default {
  dateformat(dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
    if (dataStr) {
      return moment(dataStr).format(pattern)
    } else {
      return ''
    }
  } // VUE页面使用：{{ newsinfo.add_time | dateformat('YYYY-MM-DD HH:mm:ss')}}
}
