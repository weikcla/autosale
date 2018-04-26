// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import {store} from './store'
import router from './router'
import * as firebase from 'firebase'
import {
  Vuetify,
  VApp,
  VNavigationDrawer,
  VFooter,
  VPagination,
  VDataTable,
  VTooltip,
  VDialog,
  VForm,
  VList,
  VCard,
  VTextField,
  VSelect,
  VDivider,
  VBtn,
  VIcon,
  VGrid,
  VToolbar,
  transitions
} from 'vuetify'
import '../node_modules/vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
  components: {
    VApp,
    VNavigationDrawer,
    VFooter,
    VPagination,
    VDataTable,
    VTooltip,
    VDialog,
    VForm,
    VList,
    VCard,
    VTextField,
    VSelect,
    VDivider,
    VBtn,
    VIcon,
    VGrid,
    VToolbar,
    transitions
  }
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyAr84IQNgdwn6Fc-9mRpg_1K1YrE2TgONc',
      authDomain: 'auto-sale-1edb1.firebaseapp.com',
      databaseURL: 'https://auto-sale-1edb1.firebaseio.com',
      projectId: 'auto-sale-1edb1',
      storageBucket: 'auto-sale-1edb1.appspot.com',
      messagingSenderId: '599623091336'

    })
  }
})
