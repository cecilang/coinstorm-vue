import {store} from '../vuex/store'

export default (to, from, next) => {
  if (store.getters.getUser) {
    next()
  } else {
    next('/user/login')
  }
}
