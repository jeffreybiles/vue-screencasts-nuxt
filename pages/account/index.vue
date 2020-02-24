<template>
  <div>
    <h1>Account</h1>

    Name: {{user.name}}<br>
    Email: {{user.email}}<br>
    Created account on: <DateDisplay :date="new Date(user.created_at)" /><br>
    <hr>
    <div v-if="user.plan_id">
      <h1>You are subscribed to the {{plan.name}} plan.</h1>
      <small>For billing details, see <nuxt-link to="/account/billing">the billing page</nuxt-link>.</small>

      <p>You have the following perks:</p>

      

    </div>
  </div>
</template>

<script>
  import DateDisplay from '@/components/DateDisplay.vue';
  import subscriptionPlanJson from '@/utils/subscription-plan-data.json';

  export default {
    components: {
      DateDisplay,
    },
    computed: {
      user(){
        return this.$auth.user;
      },
      plan(){
        let plan_id = this.$auth.user.plan_id;
        let plans = subscriptionPlanJson.plans;

        return plans.find(p => {
          let planIds = [
            p.month.stripeId.dev,
            p.month.stripeId.prod,
            p.year.stripeId.dev,
            p.year.stripeId.prod
          ]

          return planIds.includes(plan_id)
        })
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>