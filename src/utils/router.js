import Vue from 'vue'
import Router from 'vue-router'
import home from '../views/home.vue'
import user from '../views/user.vue'
import login from '../views/login.vue'
import admin from '../views/admin.vue'
import error404 from '../views/error404.vue'
import * as activity from '../views/activity'
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
      component: user,
      beforeEnter: (to, from, next) => {
        if (store.state.token) {
          return next()
        }
        return next('login')
      },
      props: {
        id: store.state.profile.id
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
      path: '/admin',
      name: 'admin',
      component: admin
    },
    {
      path: '/activities',
      name: 'activities',
      component: activity.list
    },
    {
      path: '/activities/create',
      component: activity.create
    },
    {
      path: '/activities/show/:id',
      component: activity.show,
      props: true
    },
    {
      path: '*',
      name: 'error404',
      component: error404
    }
  ]
})
