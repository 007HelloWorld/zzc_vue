// 公用修改vuex的state的方法
export const setState = (state, data) => {
  // 循环修改，好处是不会更新其他数据
  if (!data || typeof data !== 'object' || !!Array.isArray(data)) {
    throw new Error('setState warning：data需要是Object类型！')
  }
  for (const key in data) {
    state[key] = data[key]
  }
}

// 手机号加密****
export const phoneEncryption = function(phone) {
  return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
}

// 返回是否是链接
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}
// n级数数据处理
export const formatOrgTree = function(orgData) {
  orgData = JSON.parse(JSON.stringify(orgData))
  let orgIdArr = orgData.map((item) => item.id)
  let tree = orgData.reduce((arr, item) => {
    if (item.parentId === '0') {
      arr.push(item)
    } else {
      let pIdx = orgIdArr.indexOf(item.parentId)
      if (pIdx > -1) {
        Array.isArray(orgData[pIdx].children) ? orgData[pIdx].children.push(item) : (orgData[pIdx].children = [item])
      }
    }
    return arr
  }, [])
  return tree
}

export const getParameter = function(key) {
  var parameters = decodeURI(window.location.search.substr(1)).split('&')
  for (var i = 0; i < parameters.length; i++) {
    var paramCell = parameters[i].split('=')
    if (paramCell.length === 2 && paramCell[0].toUpperCase() === key.toUpperCase()) {
      return paramCell[1]
    }
  }
  return ''
}
// 处理数据流
export const processDataFlow = function(res, name) {
  const content = res
  const blob = new Blob([content])
  // '事项管理列表.xlsx'
  const fileName = name
  if ('download' in document.createElement('a')) {
    // 非IE下载
    const elink = document.createElement('a')
    elink.download = fileName
    elink.style.display = 'none'
    elink.href = URL.createObjectURL(blob)
    document.body.appendChild(elink)
    elink.click()
    URL.revokeObjectURL(elink.href) // 释放URL 对象
    document.body.removeChild(elink)
  } else {
    // IE10+下载
    navigator.msSaveBlob(blob, fileName)
  }
}
// 正整数校验
export const mathValid = function(string) {
  let req = /^[+]{0,1}(\d+)$/
  return req.test(string)
}
// 金额校验
export const moneyValid = function(string) {
  let req = /^([1-9]\d{0,9}|0)([.]?|(\.\d{1,2})?)$/
  return req.test(string)
}
// 汉字转换空
export const charactersChangeNull = function(string) {
  if (Number(string) + '' === 'NaN') {
    if (parseFloat(string) + '' === 'NaN') {
      return ''
    } else {
      return parseFloat(string)
    }
  } else {
    return string
  }
}
// 将千分位值转换成number
export const thousandSepToNum = function(value) {
  if (!value) return ''
  let strArr = String(value).split('.')
  let n1 = strArr[0].replace(/,/g, '')
  return strArr[1] ? `${n1}.${strArr[1]}` : `${n1}`
}
// 将Number转换成千分位
export const numToThousandSep = function(value) {
  // 大于等于1000处理成千分位字符串
  let valueArr = String(value).split('.')

  if (!value || Number(value) < 1000) {
    if (!valueArr[1]) {
      return valueArr[0]
    }
    return value
  }
  let intNum = valueArr[0]
  let len = intNum.length
  let remainder = len % 3
  let resultStr =
    remainder > 0
      ? intNum.slice(0, remainder) +
        ',' +
        intNum
          .slice(remainder, len)
          .match(/\d{3}/g)
          .join(',')
      : intNum
          .slice(remainder, len)
          .match(/\d{3}/g)
          .join(',')
  return valueArr[1] ? `${resultStr}.${valueArr[1]}` : resultStr
}
