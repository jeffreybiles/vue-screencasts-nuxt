<template>
  <v-app>
    <v-app-bar app color="green">
      <v-btn text to="/">Vue Screencasts</v-btn>
      <v-btn text to="/admin/videos" v-show="$auth.user && $auth.user.admin">Admin</v-btn>
      <v-spacer></v-spacer>
      <div v-if="$auth.loggedIn">
        {{ $auth.user.name }}
        <v-btn text class="mr-2" @click="$auth.logout()">Logout</v-btn>
      </div>
      <div v-else>
        <v-btn text class="mr-2" to="/login">Login</v-btn>
        <v-btn text class="mr-2" to="/register">Register</v-btn>
      </div>
    </v-app-bar>

    <v-content>
      <nuxt />
    </v-content>

    <v-snackbar
      v-for="(snackbar, index) in snackbars.filter(s => s.showing)"
      :key="snackbar.text + Math.random()"
      v-model="snackbar.showing"
      :timeout="snackbar.timeout"
      :color="snackbar.color"
      :style="`bottom: ${(index * 60) + 8}px`"
    >
      {{snackbar.text}}

      <v-btn text @click="snackbar.showing = false">
        Close
      </v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
import { mapState } from 'vuex';
export default {
  middleware: 'load-videos-and-tags',
  computed: {
    ...mapState({
      snackbars: state => state.snackbar.snackbars
    })
  },
}
</script>
<style>

html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>
