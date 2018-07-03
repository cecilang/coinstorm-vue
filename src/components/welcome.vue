<template>
  <v-container fluid>
    <v-parallax 
    :src="require('@/assets/data.png')"
    height="600">
      <v-layout column align-center justify-center>
        <h1 class="green--text mb-4 mt-2">All the Signals, None of the Noise.</h1>
        <h2 class="green--text text-xs-center">Financial Analysis for Web 3.0</h2>
      </v-layout>
      <v-layout column align-center justify-center>
        <v-flex xs12 sm6 class="text-xs-center text-sm-right">
          <v-btn 
          large
          class="success"
          to="/live-traders">Login</v-btn>
        </v-flex>
      </v-layout>
    </v-parallax>
    <v-layout row wrap align-center>
      <v-flex xs12 class="text-xs-center mt-4">
        <h1 class="text-xs-center mt-4">See what others are saying about Coinstorm.ai</h1>
      </v-flex>
      <v-carousel class="mt-4">
        <v-carousel-item
          v-for="comment in comments"
          :src="comment.imageUrl"
          :key="comment.id">
          <div class="comment">
            {{ comment.name }}: {{comment.comment}}
          </div>
        </v-carousel-item>
      </v-carousel>
    </v-layout>
    <v-layout row wrap>
      <v-jumbotron
      :gradient="gradient"
      class="mt-4"
      >
        <v-container fill-height>
          <v-layout align-center>
            <v-flex xs12 sm6 offset-sm3 text-xs-center>
              <v-flex xs12 class="text-xs-center mt-4">
                <h1 class="text-xs-center mt-4">Coinstorm is in stealth.</h1>
              </v-flex>
              <p class="display-5">Our team is working hard on algorithmic innovation for new asset classes. Feel free to contact us if you have any questions.</p>
              <v-form ref="form" v-model="valid" lazy-validation
              class="mb-4"
              >
                <v-text-field
                  v-model="name"
                  :rules="nameRules"
                  color="info"
                  label="Your Name"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="email"
                  :rules="emailRules"
                  color="info"
                  label="Your E-mail"
                  required
                ></v-text-field>
                <v-select
                  v-model="select"
                  :items="items"
                  :rules="[v => !!v || 'Item is required']"
                  color="info"
                  label="I'd like to: "
                  required
                ></v-select>
                <v-btn
                  :disabled="!valid"
                  @click="submit"
                >
                  submit
                </v-btn>
                <v-btn @click="clear">clear</v-btn>
              </v-form>
            </v-flex>
          </v-layout>
        </v-container>
      </v-jumbotron>
    </v-layout>
  </v-container>
</template>

<script>
// import axios from 'axios'
export default {
  data () {
    return {
      // for advertising carousel
      comments: [
        { imageUrl: 'http://www.parkslopetherapist.com/wp-content/uploads/2015/05/man-tshirt-smiling.jpg', id: 'afajfjadfaadfa323', name: 'Peter Parker', comment: 'Coinstorm makes crypto mining a breeze!' },
        { imageUrl: 'http://blogs.dctc.edu/dctc-news/files/2017/01/Scott_1-1050x735.jpg', id: 'aadsfhbkhlk1241', name: 'Tony Stark, C.F.A.', comment: 'Thanks to Coinstorm, I can trade in multiple crypto exchanges all day while catching up with my grandchildren.' },
        { imageUrl: 'https://i2.wp.com/www.michaelsinkindds.com/wp-content/uploads/2014/12/man-smiling-hoodie.jpg', id: 'aadsfhbkhlk1242', name: 'Steve Rogers', comment: 'No more cryptotrading burnout!' }
      ],
      // for contact form
      gradient: 'to top right, #C8E6C9, #B3E5FC',
      name: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters'
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
      ],
      select: null,
      items: [
        'Join the team',
        'Be a user',
        'Get more info'
      ],
      valid: true
    }
  },
  methods: {
    submit () {
      if (this.$refs.form.validate()) {
        /* axios.post('/api/submit', {
          name: this.name,
          email: this.email,
          select: this.select
        }) */
      }
    },
    clear () {
      this.$refs.form.reset()
    }
  }
}
</script>

<style scoped>
  .comment {
    position: absolute;
    bottom: 50px;
    background-color: rgba(0,0,0,.5);
    color: white;
    font-size: 1.5em;
    padding: 20px;
  }
</style>

