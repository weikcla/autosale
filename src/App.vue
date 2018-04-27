<template>
  <v-app>
    <v-content>
      <v-toolbar dark dense>
        <v-toolbar-title>Auto Sale</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items v-for="(item, key) in navItems" :key="key">
          <v-btn flat :to="{name: item.nameView}" exact>
            {{ item.name }}
            <v-icon>
              {{ item.icon }}
            </v-icon>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-container fluid fill-height>
        <router-view></router-view>
        <router-view name="navbar"></router-view>
        <router-view name="slider"></router-view>
        <router-view name="filter"></router-view>
        <router-view name="lists"></router-view>
        <router-view name="footer"></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'App',
  data () {
    return {
    }
  },
  computed: {
    ...mapState(['isAuthenticated']),
    navItems () {
      let navItems = [
        {nameView: 'dashboard', name: 'Home', icon: 'home'},
        {nameView: 'signin', name: 'Sign In', icon: 'lock_open'},
        {nameView: 'signup', name: 'Sign Up', icon: 'perm_identity'}
      ]
      if (this.isAuthenticated) {
        navItems = [
          {nameView: 'dashboard', name: 'Home', icon: 'home'},
          {nameView: 'vehicles', name: 'Vehicles', icon: 'directions_car'},
          {nameView: 'brands_and_models', name: `Brands and Models`, icon: 'home'},
          {nameView: 'atributes', name: 'Atributes', icon: 'apps'}
        ]
      }
      return navItems
    }
  }
}
</script>
