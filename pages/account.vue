<template>
  <v-container>
    <v-tabs color="green darken-3">
      <v-tab to="/account">Account</v-tab>
      <v-tab to="/account/email-preferences">Email Preferences</v-tab>
      <v-tab to="/account/billing" v-if="$auth.user.plan_id">Billing</v-tab>
      <v-tab to="/account/edit">Edit</v-tab>
      <v-tab to="/account/next-steps" v-if="$auth.user.plan_id">Next Steps</v-tab>
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