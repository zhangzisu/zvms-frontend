import Vue from 'vue'
import Router from 'vue-router'
import home from './views/home.vue'
import my from './views/my.vue'
import login from './views/login.vue'
import error404 from './views/error404.vue'
import store from './store'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/my',
      name: 'my',
      component: my,
      beforeEnter: (to, from, next) => {
        if (store.state.token) {
          return next()
        }
        return next('login')
      }
    },
    {
      path: '/login',
      name: 'login',
      component: login,
      beforeEnter: (to, from, next) => {
        if (store.state.token) {
          return next(false)
        }
        return next()
      }
    },
    {
      path: '*',
      name: 'error404',
      component: error404
    }
  ]
})
