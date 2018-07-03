export default {
  GET_TRADERS (state, payload) {
    state.traders = payload
  },
  GET_ORDERS (state, payload) {
    state.orders = payload
  },
  API_FAILURE (state, payload) {
    state.error = payload
  },
  SET_LOADING (state, payload) {
    state.loading = payload
  },
  SET_USER (state, payload) {
    state.user = payload
  },
  SET_ERROR (state, payload) {
    state.error = payload
  },
  CLEAR_ERROR (state, payload) {
    state.error = null
  }
}
