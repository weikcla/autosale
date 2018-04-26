<template>
  <section>
      <v-navigation-drawer permanent absolute v-model="drawer">
        <v-toolbar flat class="transparent">
          <v-list class="pa-0">
            <v-list-tile avatar>
              <v-list-tile-avatar>
                <img src="https://randomuser.me/api/portraits/men/85.jpg" >
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title>Auto Sale</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-toolbar>
        <v-list class="pt-0" dense>
          <v-divider></v-divider>
          <v-list-tile v-for="(item, key) in navItems" :key="key" :to="{name: item.nameView}" exact>
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ item.name }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>
      <div class="contentView">
        <router-view></router-view>
      </div>
  </section>
</template>

<script>
import {mapState} from 'vuex'
export default {
  data () {
    return {
      drawer: true,
      right: null
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
          {nameView: 'brands_and_models', name: `Brand's and Model's`, icon: 'home'},
          {nameView: 'atributes', name: 'Atributes', icon: 'apps'}
        ]
      }
      return navItems
    }
  }
}
</script>

<style scope>
 .contentView {
   position: absolute;
   min-height: 100%;
   transform: translateX(300px)
 }
</style>
