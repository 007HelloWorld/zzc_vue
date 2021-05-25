import Vue from 'vue'
import { thousandSepToNum, numToThousandSep } from '@/utils'
import store from '@/store'

/**
 * 说明：自定义限制input输入框输入指令,会自动修改成符合条件的数字或者空
 *
 * 使用方法：v-limit-number:FIXEDNUM="{max:MAXNUM,min:MINNUM}"
 * 参数：
 * 1.FIXEDNUM，表示保留小数尾数，不传默认为0，即整数
 * 2.MAXNUM，限制最大值
 * 3.MINNUM，限制最小值
 *
 * 使用方法示例：
 * 1.限制输入整数 ： v-limit-number:0    v-limit-number:int
 * 2.限制两位浮点数： v-limit-number:2
 * 3.限制最大值最小值： v-limit-number="{max:max,min:min}"
 *
 * 备注：Vue双向绑定，是通过input事件绑定的，所以修改值后手动触发了input事件实现更新
 *
 * 作者：孙星晨
 *  */

const dispatchEvent = function(target, eventName) {
  // Vue双向绑定，是通过input事件绑定的，所以修改值后一定要手动触发input事件实现更新
  let evt = document.createEvent('Event')
  evt.initEvent(eventName, true, true)
  target.dispatchEvent(evt)
}
const initNumberStr = function(target) {
  let value = target.value
  if (Number(value) > 999 && value.split(',').length === 1) {
    target.value = numToThousandSep(value)
  }
}
const getInputElement = function(el) {
  if (el.tagName === 'INPUT') {
    return el
  } else if (el.getElementsByTagName('input')[0]) {
    return el.getElementsByTagName('input')[0]
  } else {
    return null
  }
}
Vue.directive('limitNumber', {
  inserted: (el, binding) => {
    let fixedNum = binding.arg
    let inputEl = getInputElement(el)
    let prevValue = ''
    initNumberStr(inputEl)
    inputEl.addEventListener('blur', (e) => {
      let valueArr = String(e.target.value).split('.')
      if (!valueArr[1] && valueArr.length >= 2) {
        e.target.value = valueArr[0]
        dispatchEvent(e.target, 'input')
      } else if (e.target.value !== prevValue) {
        prevValue = e.target.value
        dispatchEvent(e.target, 'input')
      }
      e.target.value = numToThousandSep(e.target.value)
    })
    inputEl.addEventListener('focus', (e) => {
      e.target.value = thousandSepToNum(e.target.value)
    })
    inputEl.addEventListener('input', (e) => {
      if (e.target.value !== prevValue) {
        let newVal = ''
        if (Number(e.target.value) + '' === 'NaN') {
          if (parseFloat(e.target.value) + '' === 'NaN') {
            newVal = ''
          } else {
            newVal = parseFloat(e.target.value)
          }
        } else {
          newVal = e.target.value
        }
        let arr = newVal.toString().split('.')
        if (arr[1] && fixedNum && arr[1].length > fixedNum) {
          newVal = Number(arr[0] + arr[1].slice(0, 2)) / 100
        }
        // let max = el.getAttribute('limit-max')
        // let min = el.getAttribute('limit-min')
        // let newVal = String(e.target.value).replace(/[^(\d|.)]/g, '')
        // if (!newVal) {
        //   // 如果替换后为空
        //   newVal = ''
        // } else {
        //   // 如果替换后还有值，处理多个小数点的情况，然后转化为Int或者Float
        //   newVal = newVal.replace(/(^\.)|(\.$)/g, '')
        //   let arr = newVal.split('.')
        //   newVal = arr[0] + (arr[1] ? '.' + arr[1] : '')
        //   if (fixedNum === '0' || fixedNum === 'int') {
        //     newVal = parseInt(newVal)
        //   } else if (fixedNum) {
        //     newVal = Number(Number(newVal).toFixed(fixedNum))
        //   }
        // }
        // if (max && newVal > max) {
        //   newVal = max
        // } else if (min && newVal < min) {
        //   newVal = min
        // }
        e.target.value = newVal
        prevValue = e.target.value
        dispatchEvent(e.target, 'input')
      }
    })
  },
  update: (el, binding) => {
    // 此处用来动态更新binding的参数
    let max = !!binding.value && binding.value.max
    let min = !!binding.value && binding.value.min
    el.setAttribute('limit-max', max || '')
    el.setAttribute('limit-min', min || '')
    if (document.activeElement !== getInputElement(el)) {
      Vue.prototype.$nextTick(() => {
        initNumberStr(getInputElement(el))
      })
    }
  }
})

// v-permission: 功能权限指令
Vue.directive('permission', {
  inserted(el, binding, vnode, oldVnode) {
    const { value } = binding
    const userRoles = store.getters && store.getters.userRoles
    if (value) {
      if (!userRoles || !userRoles.buttonAuth || !userRoles.buttonAuth[value]) {
        console.log(el.parentNode)
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      throw new Error('need button key ! Like v-permission="\'test\'"')
    }
  }
})
