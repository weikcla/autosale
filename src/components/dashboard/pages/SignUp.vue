<template>
  <section>
    <v-container>
      <v-layout>
        <v-flex xs12 sm6 offset-sm3>
          <v-card>
            <v-card-text>
              <v-container grid-list-md>
                <form @submit.prevent="signUserUp({email: email, password: password})">
                  <v-layout wrap>
                    <v-flex xs12>
                      <v-text-field
                        name="email"
                        label="E-mail"
                        id="email"
                        v-model="email"
                        type="email"
                        required>
                      </v-text-field>
                    </v-flex>
                    <v-flex xs12>
                      <v-text-field
                        name="password"
                        label="Password"
                        id="password"
                        v-model="password"
                        :append-icon="p1 ? 'visibility' : 'visibility_off'"
                        :append-icon-cb="() => (p1 = !p1)"
                        :type="p1 ? 'password' : 'text'"
                        required>
                      </v-text-field>
                    </v-flex>
                    <v-flex xs12>
                      <v-text-field
                        name="confirmPassword"
                        label="Confirm Password"
                        id="confirmPassword"
                        v-model="confirmPassword"
                        :rules="[comparedPasswords]"
                        :append-icon="p2 ? 'visibility' : 'visibility_off'"
                        :append-icon-cb="() => (p2 = !p2)"
                        :type="p2 ? 'password' : 'text'"
                        required>
                      </v-text-field>
                    </v-flex>
                    <v-flex xs12>
                      <v-btn type="submit">Sign Up</v-btn>
                    </v-flex>
                  </v-layout>
                </form>
              </v-container>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </section>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
export default {
  data () {
    return {
      p1: true,
      p2: true,
      email: '',
      password: '',
      confirmPassword: ''
    }
  },

  methods: mapActions(['signUserUp']),

  computed: {
    ...mapGetters(['user']),
    comparedPasswords () {
      return this.password !== this.confirmPassword ? 'Passwords do not match' : ''
    }
  },

  watch: {
    user (value) {
      if (value !== null && value !== undefined) {
        this.$router.push('/dashboard')
      }
    }
  }
}
</script>

<style>

</style>
