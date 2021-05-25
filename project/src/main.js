import Vue from 'vue'
import App from './App.vue'
import router from './router'
import element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import api from "./api/type"
Vue.prototype.$api = api;
Vue.use(element)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')