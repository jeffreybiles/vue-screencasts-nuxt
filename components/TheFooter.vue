<template>
  <v-footer padless>
    <v-card
      flat
      tile
      width="100%"
      class="text-center"
    >
      <v-card-text>
        <nuxt-link to="policies/terms-and-conditions">Terms and Conditions</nuxt-link>
        <nuxt-link to="policies/privacy-policy">Privacy Policy</nuxt-link>
        <nuxt-link to="policies">View All Policies</nuxt-link>
        Policies last updated December 7, 2019
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
  export default {
    
  }
</script>

<style lang="scss" scoped>
  .v-card__text {
    font-size: 10px;
    a {
      margin-right: 10px;
    }
  }
</style>