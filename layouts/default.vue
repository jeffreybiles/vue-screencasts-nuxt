<template>
  <v-app>
    <TheNavbar />
    <v-content>
      <div class="green darken-4 grey--text text--lighten-5 text-center">
        VueScreencasts is feature-complete.
        <span v-if="!($auth.user && !$auth.user.pro)">
          <nuxt-link  to="/pro" class="grey--text text--lighten-5">Subscribe now</nuxt-link> for huge discounts.
        </span>
        New videos coming soon.  
        Send feedback and suggestions 
        via email (<a href="mailto:jeffrey@vuescreencasts.com" class="grey--text text--lighten-5" target="_blank">jeffrey@vuescreencasts.com</a>) 
        or twitter (<a href="https://twitter.com/VueScreencasts" class="grey--text text--lighten-5" target="_blank">@vuescreencasts</a>).
      </div>
      <nuxt />
    </v-content>

    <TheFooter />
    <TheSnackbar />
  </v-app>
</template>

<script>
import TheNavbar from '@/components/TheNavbar.vue';
import TheFooter from '@/components/TheFooter.vue';
import TheSnackbar from '@/components/TheSnackbar.vue';
export default {
  middleware: 'load-videos-and-courses',
  components: {
    TheNavbar,
    TheFooter,
    TheSnackbar
  },
}
</script>
<style lang="scss">

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

.clickable {
  cursor: pointer;
}

body .v-application a {
  color: #276E2B ;
}

.v-input--checkbox {
  margin: 0 !important;

  .v-input__control {
    label {
      color: black !important;
    }
    
    .v-input__slot {
      margin-bottom: 0 !important;
    }

    a {
      margin: 0 5px;
    }
  } 
}
</style>
