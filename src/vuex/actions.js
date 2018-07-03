import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import * as firebase from 'firebase'

Vue.use(VueAxios, axios)

export default {
  // action to get traders
  tradersApi ({commit}) {
    commit('SET_LOADING', true)
    axios
      .get('https://5b3146fb7ad3350014b433b7.mockapi.io/fake/traders')
      .then(r => r.data)
      .then(response => {
        commit('GET_TRADERS', response)
        commit('SET_LOADING', false)
      })
      .catch(error => {
        commit('API_FAILURE', error)
        commit('SET_LOADING', false)
      })
  },
  // action to get orders
  ordersApi ({commit}, payload) {
    commit('SET_LOADING', true)
    axios
      .get('https://5b3146fb7ad3350014b433b7.mockapi.io/fake/orders')
      .then(r => r.data)
      .then(response => {
        commit('GET_ORDERS', response)
        commit('SET_LOADING', false)
      })
      .catch(error => {
        commit('API_FAILURE', error)
        commit('SET_LOADING', false)
      })
  },
  // user login actions
  userLogin ({commit}, payload) {
    const newUser = {
      email: payload.email
    }
    commit('SET_LOADING', true)
    commit('CLEAR_ERROR')
    firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
    .then(user => {
      commit('SET_LOADING', false)
      commit('SET_USER', {
        ...newUser,
        id: user.uid
      })
    })
    .catch(
      error => {
        commit('SET_LOADING', false)
        commit('SET_ERROR', error)
      }
    )
  },
  autoLogin ({commit}, payload) {
    commit('SET_USER', {
      id: payload.uid,
      email: payload.email,
      coveredCompanies: []
    })
  },
  logout ({commit}) {
    firebase.auth().signOut()
    commit('SET_USER', null)
  },
  clearError ({commit}) {
    commit('CLEAR_ERROR')
  }
}
