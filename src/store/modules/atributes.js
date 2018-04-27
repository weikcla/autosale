import * as firebase from 'firebase'

const state = {
  atribute: null,
  types: [
    'Confort',
    'Internal',
    'Exterior',
    'Security',
    'Sound'
  ],
  atributes: []
}

const getters = {
  atribute (state) {
    return state.atribute
  },
  types (state) {
    return state.types
  }
}

const actions = {
  loadAtributes ({commit}) {
    firebase.database().ref('/atributes').on('value', (snapshot) => {
      const allAtributes = snapshot.val()
      const atributes = []
      for (let type in allAtributes) {
        for (let key in allAtributes[type]) {
          atributes.push({
            type: type,
            atributeId: key,
            atributeName: allAtributes[type][key].name
          })
        }
      }
      commit('setLoadedAtributes', atributes)
    })
  },

  createAtribute ({commit}, payload) {
    const type = payload.type
    const atribute = {
      name: payload.name
    }
    firebase.database().ref('/atributes').child(type).push(atribute)
      .then((data) => {
        commit('setAtribute', atribute)
      })
      .catch((error) => {
        console.log(error)
      })
  },

  updateAtribute ({commit}, payload) {
    const type = payload.type
    const atribute = {
      name: payload.name,
      id: payload.id
    }
    firebase.database().ref('/atributes').child(type).child(atribute.id).update({
      name: atribute.name
    })
      .then((data) => {
        commit('setAtribute', atribute)
      })
      .catch((error) => {
        console.log(error)
      })
  },

  removeAtribute ({commit}, payload) {
    const type = payload.type
    const atribute = payload.id
    firebase.database().ref('/atributes').child(type).child(atribute).remove()
      .catch((error) => {
        console.log(error)
      })
  }
}

const mutations = {
  setAtribute (state, payload) {
    state.atribute = payload
  },
  setLoadedAtributes (state, payload) {
    state.atributes = payload
  }
}
export default {
  state,
  getters,
  actions,
  mutations
}
