<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Log in</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field
                prepend-icon="person"
                name="login"
                label="Login"
                type="email"
                v-model="email"
                ></v-text-field>
              <v-text-field
                name="password"
                label="Password"
                id="password"
                v-model="password"
                :append-icon="p1 ? 'visibility_off' : 'visibility'"
                :append-icon-cb="() => (p1 = !p1)"
                :type="p1 ? 'password' : 'text'"
                prepend-icon="lock"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="logUserIn({email: email, password: password})">Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
export default {
  data () {
    return {
      p1: true,
      email: '',
      password: ''
    }
  },

  methods: mapActions(['logUserIn']),

  computed: {
    ...mapGetters(['user'])
  },

  watch: {
    user (value) {
      if (value !== null && value !== undefined) {
        this.$router.push({name: 'dashboard'})
      }
    }
  }
}
</script>

<style>

</style>
