<template>
  <v-container>
    <p>A listing of our legal policies.</p>
    <ul>
      <li><nuxt-link :to="'policies/terms-and-conditions'">Terms and Conditions</nuxt-link></li>
      <li><nuxt-link :to="'policies/privacy-policy'">Privacy Policy</nuxt-link></li>
    </ul>
  </v-container>
</template>

<script>
  export default {
    
  }
</script>

<style lang="scss" scoped>

</style>