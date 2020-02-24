<template>
  <div class="pro-card">
    <div class="row">
      <div class="col-sm-6">
        <slot />
      </div>

      <div class="col-sm-6">
        <ProPerksList :services="plan.services" />
      </div>
    </div>
    <div v-if="!plan.services.free" class="my-3 buy-buttons">
      <v-btn x-large color="green accent-1" :to="`/order?plan=${plan.id}&planTerm=month`">
        {{plan.month.currentPrice | currency}}/month
      </v-btn>
      <v-btn x-large color="green accent-2" :to="`/order?plan=${plan.id}&planTerm=year`">
        {{plan.year.currentPrice | currency}}/year
      </v-btn>
      <v-btn x-large color="green accent-3">Get your boss to pay for it</v-btn>
    </div>
    <div v-else class="my-3">
      <v-btn>Sign Up Free</v-btn>
    </div>
  </div>
</template>

<script>
  import subscriptionPlanJson from '@/utils/subscription-plan-data.json';
  import ProPerksList from '@/components/ProPerksList.vue';

  export default {
     data(){
      let plans = subscriptionPlanJson.plans;
      let plan = plans.find(p => p.id == this.stripePlanId);

      return {
        plan,
      }
    },
    components: {
      ProPerksList
    },
    props: {
      stripePlanId: {
        type: [Number, String],
        required: true
      }
    }
  }
</script>

<style lang="scss" scoped>
  .pro-card {
    margin-top: 10px;
  }

  .buy-buttons {
    button, a {
      margin-bottom: 8px;
    }
  }
</style>