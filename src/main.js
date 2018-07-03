// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import { store } from './vuex/store'
import TraderEditDialog from './components/dialogs/trader-edit.vue'
import TraderAddDialog from './components/dialogs/trader-add.vue'
import DateFilter from './filters/date'
import * as firebase from 'firebase'
import Alert from './shared/alert.vue'

Vue.use(Vuetify, { theme: {
  primary: '#ee44aa',
  secondary: '#424242',
  accent: '#82B1FF',
  error: '#FF5252',
  info: '#2196F3',
  success: '#4CAF50',
  warning: '#FFC107'
}})

Vue.config.productionTip = false

Vue.component('app-trader-edit-dialog', TraderEditDialog)
Vue.component('app-trader-add-dialog', TraderAddDialog)
Vue.component('app-alert', Alert)
Vue.filter('dateFilter', DateFilter)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  created () {
    // plug in firebase instance
    firebase.initializeApp({
      apiKey: 'AIzaSyD2dZCdXH7X0Fe6foY7tlXNZG9mR6yGTGk',
      authDomain: 'coinstorm-vue.firebaseapp.com',
      databaseURL: 'https://coinstorm-vue.firebaseio.com',
      projectId: 'coinstorm-vue',
      storageBucket: 'coinstorm-vue.appspot.com',
      messagingSenderId: '25255118159'
    })
    // check for existing user authentication
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoLogin', user)
      }
    })
  }
})
