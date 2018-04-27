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
      if (payload !== null) {
        state.isAuthenticated = true
      } else {
        state.isAuthenticated = false
      }
    }
    // rules: {
    //   required: (value) => !!value || 'This field is required.',
    //   numeric: (value) => {
    //       const pattern =  /^[0-9]+$/
    //       return pattern.test(value) || 'This field only numbers.'
    //   },
    //   email: (value) => {
    //     const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    //     return pattern.test(value) || 'Invalid e-mail.'
    //   }
    // }
  },
  getters: {
    user (state) {
      return state.user
    }
  }
})
