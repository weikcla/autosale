import * as firebase from 'firebase'

const actions = {
  logUserIn ({commit}, payload) {
    firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
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
  },
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
  },
  checkAuth ({commit}, payload) {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        commit('setUser', {id: user.uid})
      }
    })
  },
  logOut ({commit}) {
    firebase.auth().signOut()
    commit('setUser', null)
  }
}

export default {
  actions
}
