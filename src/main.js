import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'

import '@/icons' // icon
import '@/permission' // permission control
import axios from 'axios'
Vue.prototype.$axios = axios
//
Vue.prototype.$URL = process.env.BASE_API

Vue.use(ElementUI, { locale })

Vue.config.productionTip = false
//引入全局变量Global,并全局引用
import global_ from './components/tools/Global.vue'
Vue.prototype.GLOBAL = global_
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
