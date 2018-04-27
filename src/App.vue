<template>
  <v-app>
    <v-content>
      <v-toolbar dark color="primary darken-1" dense>
        <v-toolbar-title class="white--text">
          <v-btn flat :to="{name: 'home'}" exact>
            <v-icon left>home</v-icon>
            Auto Sale
          </v-btn>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn 
            v-for="(item, key) in navItems" 
            :key="key" 
            :to="{name: item.nameView}" 
            exact
            flat>
            {{ item.name }}
            <v-icon right>
              {{ item.icon }}
            </v-icon>
          </v-btn>
          <v-btn v-if="isAuthenticated" @click="onLogOut()" flat>
            Log Out
            <v-icon right>
              exit_to_app
            </v-icon>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <section>
        <router-view></router-view>
        <router-view name="navbar"></router-view>
        <router-view name="slider"></router-view>
        <router-view name="filter"></router-view>
        <router-view name="lists"></router-view>
        <router-view name="footer"></router-view>
      </section>
    </v-content>
  </v-app>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'App',

  created () {
    this.$store.dispatch('checkAuth')
  },

  data () {
    return {
    }
  },

  methods: {
    onLogOut () {
      this.$store.dispatch('logOut')
      this.$router.push({name: 'home'})
    }
  },

  computed: {
    ...mapState(['isAuthenticated']),
    navItems () {
      let navItems = [
        {nameView: 'login', name: 'Log In', icon: 'lock_open'},
        {nameView: 'signup', name: 'Sign Up', icon: 'perm_identity'}
      ]
      if (this.isAuthenticated) {
        navItems = [
          {nameView: 'dashboard', name: 'Dashboard', icon: 'dashboard'},
          {nameView: 'vehicles', name: 'Vehicles', icon: 'directions_car'},
          {nameView: 'brands_and_models', name: `Brands and Models`, icon: 'style'},
          {nameView: 'atributes', name: 'Atributes', icon: 'apps'}
        ]
      }
      return navItems
    }
  }
}
</script>
