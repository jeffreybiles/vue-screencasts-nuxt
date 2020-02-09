<template>
  <div>
    <h1>Account</h1>

    Name: {{user.name}}<br>
    Email: {{user.email}}<br>
    Created account on: <DateDisplay :date="new Date(user.created_at)" /><br>

    <v-btn class="mt-2 mb-2" color="green darken-2 grey--text text--lighten-4" to="/account/email-preferences">
      Email Preferences
    </v-btn>
    <v-btn class="mt-2 mb-2" color="green darken-2 grey--text text--lighten-4" to="/account/billing">
      Billing
    </v-btn>
    <v-btn class="mt-2 mb-2" color="green darken-2 grey--text text--lighten-4" to="/account/edit">
      Edit User Info
    </v-btn>
    <hr>
  </div>
</template>

<script>
  import DateDisplay from '@/components/DateDisplay.vue';
  export default {
    components: {
      DateDisplay,
    },
    computed: {
      user(){
        return this.$auth.user;
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>