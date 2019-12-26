<template>
  <v-app>
    <TheNavbar />
    <v-content>
      <div class="green darken-4 white--text text-center">
        VueScreencasts is in Open Beta.  I plan to officially launch mid to late January.  
        Please send me feedback and suggestions 
        via email (<a href="mailto:jeffrey@vuescreencasts.com" class="white--text" target="_blank">jeffrey@vuescreencasts.com</a>) 
        or twitter (<a href="https://twitter.com/VueScreencasts" class="white--text" target="_blank">@vuescreencasts</a>).
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

.clickable {
  cursor: pointer;
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
