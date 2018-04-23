import Vue from 'vue'
import Vuex from 'vuex'
import SignUp from './modules/signup'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    SignUp
  },
  state: {
    var: null
  }
})
