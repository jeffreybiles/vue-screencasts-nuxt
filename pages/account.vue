<template>
  <v-container>
    <v-tabs>
      <v-tab to="/account">Account</v-tab>
      <v-tab to="/account/billing">Billing</v-tab>
    </v-tabs>
    <nuxt-child />
  </v-container>
</template>

<script>
  export default {
    
  }
</script>

<style lang="scss" scoped>

</style>