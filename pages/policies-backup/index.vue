<template>
  <v-container>
    <p>A listing of all the policies we have backed up.  Actual policies hosted on https://www.websitepolicies.com/</p>
    <ul>
      <li><nuxt-link :to="'policies-backup/terms-and-conditions'">Terms and Conditions</nuxt-link></li>
      <li><nuxt-link :to="'policies-backup/privacy-policy'">Privacy Policy</nuxt-link></li>
    </ul>
  </v-container>
</template>

<script>
  export default {
    
  }
</script>

<style lang="scss" scoped>

</style>