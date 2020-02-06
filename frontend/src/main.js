import 'font-awesome/css/font-awesome.css'
import './config/bootstrap'
import './config/menssage'
import './config/axios'


import 'vue-datetime/dist/vue-datetime.css'
import 'vue-orgchart/dist/style.min.css'
import 'chart.js'
import 'hchs-vue-charts'
import './config/mediasQuery'

import store from './config/store'
import router from './config/router'

import Vue from 'vue'

import App from './App'

Vue.use(window.VueCharts)
Vue.config.productionTip = false

// require('axios').defaults.headers.common['Authorization'] = 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwibmFtZSI6IlByb2Zlc3NvciAxIiwiZW1haWwiOiJwcm9mZXNzb3IxQGVtYWlsLmNvbSIsImFkbWluIjp0cnVlLCJpYXQiOjE1NzMyNDA2NDUsImV4cCI6MTU3MzQ5OTg0NX0.nUNflqobG_gWEna1VmAcjKtEgoY8xLUq6bvXCNGeYaw'
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')