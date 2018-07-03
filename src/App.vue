<template>
  <v-app>
    <v-toolbar fixed dark class="success">
      <v-toolbar-side-icon 
      @click.stop="sideNav = !sideNav"
      class="hidden-sm-and-up"></v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link 
        to="/"
        tag="span"
        style="cursor: pointer">Coinstorm (Beta)</router-link>
        </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items
      class="hidden-xs-only">
        <p 
        v-if="user"
        class="mt-4 mr-2">Welcome {{user.email}}!</p>
        <v-btn 
        flat
        v-for="item in menuItems"
        :key="item.title"
        :to="item.link">
          <v-icon left>{{item.icon}}</v-icon>
          {{item.title}}
        </v-btn>
        <v-btn
        v-if="userAuthenticated"
        @click="onLogout"
        :to="'/'"        
        flat>
          <v-icon left>exit_to_app</v-icon>
          Logout
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>   
    <main>
      <router-view  class="mt-4 pt-5"></router-view>
    </main> 
    <v-navigation-drawer 
    temporary
    absolute
    v-model="sideNav">
      <v-list>
        <p 
        v-if="user"
        class="ml-3">Welcome {{user.email}}!</p>
        <v-divider></v-divider>
        <v-list-tile 
        v-for="item in menuItems"
        :key="item.title"
        :to="item.link">
          <v-list-tile-action>
              <v-icon left>{{item.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            {{item.title}}
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile
        v-if="userAuthenticated"
        @click="onLogout"
        :to="'/'">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>Logout</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      sideNav: false
    }
  },
  // guard nav items according to user login status
  computed: {
    menuItems () {
      let menuItems = [
        {icon: 'lock_open', title: 'Login', link: '/user/login'}
      ]
      if (this.userAuthenticated) {
        menuItems = [
          {icon: 'compare_arrows', title: 'Live Traders', link: '/live-traders'},
          {icon: 'equalizer', title: 'Rates', link: '/rates'},
          {icon: 'person', title: 'Profile', link: '/user/profile'}
        ]
      }
      return menuItems
    },
    userAuthenticated () {
      return this.$store.getters.getUser !== null && this.$store.getters.getUser !== undefined
    },
    user () {
      return this.$store.getters.getUser
    }
  },
  methods: {
    onLogout () {
      this.$store.dispatch('logout')
    }
  },
  name: 'App'
}
</script>

<style>
  .custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>

