import * as firebase from 'firebase'

const state = {
  model: null,
  loadedModels: []
}

const getters = {
  model (state) {
    return state.brand
  }
}

const actions = {
  loadModels ({commit}) {
    firebase.database().ref('/brands').on('value', (snapshot) => {
      const models = []
      const brands = snapshot.val()
      for (let i in brands) {
        for (let key in brands[i].models) {
          models.push({
            brandId: i,
            brandName: brands[i].name,
            modelId: key,
            modelName: brands[i].models[key].name
          })
        }
      }
      commit('setLoadedModels', models)
    })
  },

  createModel ({commit}, payload) {
    const brandId = payload.brand.id
    const model = {
      name: payload.name
    }
    firebase.database().ref('/brands').child(brandId).child('/models').push(model)
      .then((data) => {
        commit('setModel', model)
      })
      .catch((error) => {
        console.log(error)
      })
  },

  updateModel ({commit}, payload) {
    const brandId = payload.brand
    const model = {
      id: payload.id,
      name: payload.name
    }
    firebase.database().ref('/brands').child(brandId).child('models').child(model.id).update({
      name: model.name
    })
      .then((data) => {
        commit('setModel', model.name)
      })
      .catch((error) => {
        console.log(error)
      })
  },

  removeModel ({commit}, payload) {
    const brandId = payload.brand
    const model = {
      id: payload.id
    }
    firebase.database().ref('/brands').child(brandId).child('models').child(model.id).remove()
      .catch((error) => {
        console.log(error)
      })
  }
}

const mutations = {
  setModel (state, payload) {
    state.model = payload
  },
  setLoadedModels (state, payload) {
    state.loadedModels = payload
  }
}
export default {
  state,
  getters,
  actions,
  mutations
}
