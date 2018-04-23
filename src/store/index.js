import Vue from 'vue'
import Vuex from 'vuex'
import SignUp from './modules/signup'
import SignIn from './modules/signin'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    SignUp,
    SignIn
  },
  state: {
    user: null,
    isAuthenticated: false
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
      state.isAuthenticated = true
    }
  },
  getters: {
    user (state) {
      return state.user
    }
  }
})
