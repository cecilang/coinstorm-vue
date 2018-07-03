import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    traders: [
      {
        id: 'qvwbvwbqvqbwvkj1243',
        rule: 'Loading...'
      }
    ],
    orders: [
      {
        id: 'Loading...'
      }
    ],
    user: null,
    error: null,
    loading: false
  },
  mutations,
  actions,
  getters
})
