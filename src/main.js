import Vue from 'vue'
import './plugins/vuetify'
import app from './app.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import Axios from 'axios'

Axios.defaults.baseURL = 'http://127.0.0.1:8007/api'
if (store.state.token) {
  Axios.defaults.headers['x-access-token'] = store.state.token
}

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(app)
}).$mount('#app')
