<template>
  <v-container 
  fluid
  fill-height>
    <v-layout row>
      <v-jumbotron
      :src="require('@/assets/devices.png')"
      height="600px"
      >
        <v-flex xs12 sm6 offset-sm3>
          <v-card class="mt-5">
          <v-layout 
          row
          v-if="error">
            <v-flex xs12>
              <app-alert 
              @dismissed="onDismissed"
              :text="error.message"></app-alert>
            </v-flex>
          </v-layout>
            <v-card-text>
              <v-container>
                <form @submit.prevent="onLogin">
                  <v-layout row>
                    <v-flex xs12>
                      <h2>User Login</h2>
                    </v-flex>
                  </v-layout>
                  <v-layout row>
                    <v-flex xs12>
                      <v-text-field
                      name="email"
                      label="Email"
                      id="email"
                      v-model="email"
                      type="email"
                      color="success"
                      required></v-text-field>
                    </v-flex>
                  </v-layout>
                  <v-layout row>
                    <v-flex xs12>
                      <v-text-field
                      name="password"
                      label="Password"
                      id="password"
                      v-model="password"
                      type="password"
                      color="success" 
                      required></v-text-field>
                    </v-flex>
                  </v-layout>
                  <v-layout row>
                    <v-flex xs12>
                      <v-btn 
                      type="submit"
                      class="success"
                      :disabled="loading"
                      :loading="loading"
                      >Log In
                      <span slot="loader" class="custom-loader">
                        <v-icon light>cached</v-icon>
                      </span>
                      </v-btn>
                      <p>*Talk to your administrator for access rights</p>
                    </v-flex>
                  </v-layout>
                </form>
              </v-container>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-jumbotron>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      password: ''
    }
  },
  computed: {
    user () {
      return this.$store.getters.getUser
    },
    error () {
      return this.$store.getters.getError
    },
    loading () {
      return this.$store.getters.getLoading
    }
  },
  // listen to user login states
  watch: {
    user (value) {
      if (
        value !== null && value !== undefined
      ) this.$router.push('/live-traders')
    }
  },
  methods: {
    onLogin () {
      this.$store.dispatch('userLogin', {email: this.email, password: this.password})
    },
    onDismissed () {
      this.$store.dispatch('clearError')
    }
  }
}
</script>

