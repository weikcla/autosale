<template>
  <section>
    <h1>Dashboard</h1>
    <router-link v-for="(item, key) in navItems" :key="key" :to="{name: item.nameView}">{{item.name}}</router-link>
    <br>
    <hr>
    <router-view></router-view>
  </section>
</template>

<script>
import {mapState} from 'vuex'
export default {
  data () {
    return {

    }
  },
  computed: {
    ...mapState(['isAuthenticated']),
    navItems () {
      let navItems = [
        {nameView: 'dashboard', name: 'Home'},
        {nameView: 'signin', name: 'Sign In'},
        {nameView: 'signup', name: 'Sign Up'}
      ]
      if (this.isAuthenticated) {
        navItems = [
          {nameView: 'dashboard', name: 'Home'},
          {nameView: 'vehicles', name: 'Vehicles'},
          {nameView: 'brands_and_models', name: `Brand's and Model's`},
          {nameView: 'atributes', name: 'Atributes'}
        ]
      }
      return navItems
    }
  }
}
</script>

<style>

</style>
