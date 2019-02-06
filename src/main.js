import Vue from 'vue'
import './plugins/vuetify'
import app from './app.vue'
import router from './utils/router'
import store from './utils/store'
import './registerServiceWorker'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import Axios from 'axios'

Axios.defaults.baseURL = '/api'
if (store.state.token) {
  Axios.defaults.headers['x-access-token'] = store.state.token
}

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(app)
}).$mount('#app')
