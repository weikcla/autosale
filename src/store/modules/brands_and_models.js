import * as firebase from 'firebase'

const state = {
  brand: null,
  loadedBrands: []
}

const getters = {
  brand (state) {
    return state.brand
  }
}

const actions = {
  loadBrands ({commit}) {
    firebase.database().ref('/brands').once('value')
      .then((data) => {
        const brands = []
        const obj = data.val()
        for (let key in obj) {
          brands.push({
            id: key,
            name: obj[key].name
          })
        }
        commit('setLoadedBrands', brands)
      })
      .catch((error) => {
        console.log(error)
      })
  },

  createBrand ({commit}, payload) {
    const brand = {
      name: payload.brand
    }
    firebase.database().ref('/brands').push(brand)
      .then((data) => {
        commit('setBrand', brand)
      })
      .catch((error) => {
        console.log(error)
      })
  },

  updateBrand ({commit}, payload) {
    const brand = {
      id: payload.id,
      name: payload.name
    }
    firebase.database().ref('/brands').child(brand.id).update({
      name: brand.name
    })
      .then((data) => {
        commit('setBrand', brand.name)
      })
      .catch((error) => {
        console.log(error)
      })
  },

  removeBrand ({commit}, payload) {
    const brand = payload
    firebase.database().ref('/brands').child(brand).remove()
      .catch((error) => {
        console.log(error)
      })
  }
}

const mutations = {
  setBrand (state, payload) {
    state.brand = payload
  },
  setLoadedBrands (state, payload) {
    state.loadedBrands = payload
  }
}
export default {
  state,
  getters,
  actions,
  mutations
}
