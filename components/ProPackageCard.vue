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
        {{plan.month.prices['1'] | currency}}/month
      </v-btn>
      <a :href="bossLink" target="_blank" v-if="bossLink">
        <v-btn x-large color="green accent-2">
          Get your boss to pay for it
        </v-btn>
      </a>
      <v-btn x-large color="green accent-3" :to="`/pro?solution=${nextSolutionId}`" v-if="nextSolutionId">{{nextSolutionText || 'Next Solution'}}</v-btn>
    </div>
    <div v-else class="my-3">
      <v-btn>Sign Up Free</v-btn>
    </div>
    <p>If you have any other questions,  email <a href="mailto:jeffrey@vuescreencasts.com" target="_blank">jeffrey@vuescreencasts.com</a> or text <a href="sms:501-256-3078">(501) 256-3078</a>.  We really do care and want you to make the best choice.</p>

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
      },
      nextSolutionId: {
        type: [Number, String],
      },
      nextSolutionText: {
        type: String
      },
      bossLink: {
        type: String
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
      text-decoration: none;
    }
  }
</style>