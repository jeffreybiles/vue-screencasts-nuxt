<template>
  <v-app>
    <TheNavbar />
    
    <v-content>
      <nuxt />
    </v-content>

    <TheFooter />
    <TheSnackbar />

    <template v-if="!$auth.loggedIn">
      <!-- TODO: add a conditional for if the user is logged in but not subscribed -->
      <script src="https://vuescreencasts.activehosted.com/f/embed.php?id=3" type="text/javascript" charset="utf-8"></script>
    </template>
  </v-app>
</template>

<script>
import TheNavbar from '@/components/TheNavbar.vue';
import TheFooter from '@/components/TheFooter.vue';
import TheSnackbar from '@/components/TheSnackbar.vue';
export default {
  components: {
    TheNavbar,
    TheFooter,
    TheSnackbar
  },
  head(){
    return {
      meta: [
        {name: 'google-site-verification', property: 'google-site-verification', content: "mjhSM8iNpXB9ns6_DOYUyPmVEGVu3dtIvcP88oASFMk"},
      ]
    }
  }
}
</script>
<style lang="scss">
$font: Roboto, sans-serif;

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

.paper-container {
  max-width: 960px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 15px;
  padding-right: 15px;
}

.paper-container-large {
  @extend .paper-container;
  max-width: 1200px;
}

.img-responsive {
  max-width: 100%;
}

.section-title {
  font: 400 32px/40px $font;
  margin-bottom: 30px;
}

.section-subtitle {
  font: 400 24px/32px $font;
}

.section {
  background-color: #ffffff;
  padding: 60px 0;
  .section-title {
    font: 400 32px/40px $font;
    margin-bottom: 30px;
  }

  ul {
    margin: 0;
  }
  img {
    margin-top: 30px;
    @media (min-width: 64em) {
      margin-top: 0;
    }
  }
  .bottom-image {
    margin-bottom: -66px;
  }
}

</style>
