import Vue from 'vue'
import Vuex from 'vuex'
import Auth from './modules/auth'
import Brands from './modules/brands'
import Models from './modules/models'
import Vehicles from './modules/vehicles'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    Auth,
    Brands,
    Models,
    Vehicles
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
