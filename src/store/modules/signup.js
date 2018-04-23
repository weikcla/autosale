import * as firebase from 'firebase'

const state = {
  user: null
}

const mutations = {
  setUser (state, payload) {
    state.user = payload
  }
}

const actions = {
  signUserUp ({commit}, payload) {
    firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
      .then(
        user => {
          const newUser = {
            id: user.uid
          }
          commit('setUser', newUser)
        }
      )
      .catch(
        error => {
          console.log(error)
        }
      )
  }
}

const getters = {
  user (state) {
    return state.user
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
