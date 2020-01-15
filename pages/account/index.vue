<template>
  <div>
    <h1>Account</h1>

    Name: {{user.name}}<br>
    Email: {{user.email}}<br>
    Created account on: <DateDisplay :date="new Date(user.created_at)" /><br>


    <v-btn class="mt-2 mb-2" color="green darken-2 grey--text text--lighten-4" to="/account/billing">
      Billing
    </v-btn>
    <v-btn class="mt-2 mb-2" color="green darken-2 grey--text text--lighten-4" to="/account/edit">
      Edit User Info
    </v-btn>
    <hr>

    <h3>Email Settings</h3>

    <p>Subscriptions are tracked on the email provider.  If you haven’t been getting weekly newsletters, but you want to, then click this button to resubscribe.</p>
    <v-btn color="green darken-2 grey--text text--lighten-4" @click="resubscribe">Resubscribe To Mailing List</v-btn>
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
    methods: {
      async resubscribe(){
        await this.$axios.post('/users/newsletter_subscribe')
        this.$store.dispatch('snackbar/setSnackbar', {text: "You should be subscribed now.  Check your email!"})
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>