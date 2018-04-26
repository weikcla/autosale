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
    firebase.database().ref('/brands').on('value', (snapshot) => {
      const brands = []
      const obj = snapshot.val()
      for (let key in obj) {
        brands.push({
          id: key,
          name: obj[key].name
        })
      }
      commit('setLoadedBrands', brands)
    })
  },

  createBrand ({commit}, payload) {
    const brand = {
      name: payload.name
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
