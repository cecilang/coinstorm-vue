import Vue from 'vue'
import Router from 'vue-router'
import Welcome from '@/components/welcome'
import LiveTraders from '@/components/live-traders/live-traders'
import Rates from '@/components/rates/rates'
import Login from '@/components/users/login'
import Profile from '@/components/users/profile'
import AuthGuard from './guard'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'welcome',
      component: Welcome
    },
    {
      path: '/live-traders',
      name: 'live-traders',
      component: LiveTraders,
      beforeEnter: AuthGuard
    },
    {
      path: '/rates',
      name: 'rates',
      component: Rates,
      beforeEnter: AuthGuard
    },
    {
      path: '/user/login',
      name: 'login',
      component: Login
    },
    {
      path: '/user/profile',
      name: 'profile',
      component: Profile,
      beforeEnter: AuthGuard
    }
  ],
  // remove # in url
  mode: 'history'
})
