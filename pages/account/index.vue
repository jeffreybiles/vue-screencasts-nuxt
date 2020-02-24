<template>
  <div>
    <h1>Account</h1>

    Name: {{user.name}}<br>
    Email: {{user.email}}<br>
    Created account on: <DateDisplay :date="new Date(user.created_at)" /><br>
    <hr>
    <div v-if="user.pro">
      <h1>You are subscribed to the {{plan.name || 'Pro Standard'}} plan.</h1>
      <small>For billing details, see <nuxt-link to="/account/billing">the billing page</nuxt-link>.</small>

      <p>You have the following perks:</p>



    </div>
  </div>
</template>

<script>
  import DateDisplay from '@/components/DateDisplay.vue';
  import { getPlan } from '@/utils/subscription-utils';

  export default {
    components: {
      DateDisplay,
    },
    computed: {
      user(){
        return this.$auth.user;
      },
      plan(){
        return getPlan(this.user.plan_id)
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>