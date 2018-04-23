import * as firebase from 'firebase'

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

export default {
  actions
}
