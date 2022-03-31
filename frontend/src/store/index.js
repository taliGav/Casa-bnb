import { createStore } from 'vuex'
import stayStore from './modules/stay-store'
import userStore from './modules/user-store'
import orderStore from './modules/order-store'
import msgStore from './modules/msg-store'

const store = createStore({
  strict: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    stayStore,
    userStore,
    orderStore,
    msgStore,
  },
})

export default store
