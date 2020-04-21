<template>
  <v-container>
    <v-tabs color="green darken-3">
      <v-tab to="/account">Account</v-tab>
      <v-tab to="/account/email-preferences">Email Preferences</v-tab>
      <v-tab to="/account/billing" v-if="$auth.user.has_stripe">Billing</v-tab>
      <v-tab to="/account/edit">Edit</v-tab>
      <v-tab to="/account/next-steps" v-if="$auth.user.has_stripe">Next Steps</v-tab>
    </v-tabs>
    <nuxt-child />
  </v-container>
</template>

<script>
  export default {
    middleware: ['auth-guard']
  }
</script>

<style lang="scss" scoped>

</style>