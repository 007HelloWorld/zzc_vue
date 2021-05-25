import router from '@/router'

router.beforeEach(function(to, from, next) {
  // 本地开发无法登录，获取线上token后本地写死
  if (process.env.NODE_ENV === 'development') {
    let userInfo = {
      token:
        'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzeGN0ZXN0IiwiZXhwIjoxNjA2MTg0MDMxLCJpYXQiOjE2MDYwOTc2MzF9.bOGgt9znxPadNpNrrgtmexZ18vm9-YzNEa3GaEldWmA2oFvxPhRUfP3stqRX-QurJNSVOq6ziSAkVd2YygLrVw',
      username: '超级管理员',
      account: 'admin',
      userId: '1'
    }
    sessionStorage.setItem('ngStorage-currentUser', JSON.stringify(userInfo))
    return next()
  }
  if (to.meta.anonymous) {
    next()
  } else if (sessionStorage.getItem('ngStorage-currentUser')) {
    // 如果已登录
    next()
  } else {
    location.href = process.env.VUE_APP_API_HOST + '/#/login'
  }
})
