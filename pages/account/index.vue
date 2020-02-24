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
      <ProPerksList :services="plan.services" />
      <!-- TODO: make it so that there are action items for using certain perks, like a link to Calendly for weekly/monthly meetings -->
    </div>
  </div>
</template>

<script>
  import DateDisplay from '@/components/DateDisplay.vue';
  import { getPlan } from '@/utils/subscription-utils';
  import ProPerksList from '@/components/ProPerksList.vue';
  import subscriptionPlanJson from '@/utils/subscription-plan-data.json';

  export default {
    components: {
      DateDisplay,
      ProPerksList,
    },
    computed: {
      user(){
        return this.$auth.user;
      },
      plan(){
        return getPlan(this.user.plan_id) || subscriptionPlanJson.plans.find(p => p.id == 2)
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>