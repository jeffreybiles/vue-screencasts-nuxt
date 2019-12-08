<template>
  <v-footer padless>
    <v-card
      flat
      tile
      width="100%"
    >
      <v-card-title>
        <div>Copyright 2019 Happy Programmer LLC</div>
        <v-spacer />
        <nuxt-link to="policies/terms-and-conditions">Terms and Conditions</nuxt-link>
        <nuxt-link to="policies/privacy-policy">Privacy Policy</nuxt-link>
        <a href="mailto:jeffrey@vuescreencasts.com">Contact Me</a>
        <!-- <nuxt-link to="policies">View All Policies</nuxt-link> -->
      </v-card-title>
    </v-card>
  </v-footer>
</template>

<script>
  export default {
    
  }
</script>

<style lang="scss" scoped>
  .v-card__title {
    font-size: 100%;
    a {
      margin-right: 9px;
    }
  }
</style>