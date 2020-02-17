<template>
  <div class="pro-card">
    <div class="row">
      <div class="col-sm-6">
        <slot />
        
        <div v-if="!plan.services.free" class="my-3">
          <v-btn x-large color="green accent-1 mr-2">
            {{plan.month.currentPrice | currency}}/month
          </v-btn>
          <v-btn x-large color="green accent-1">
            {{plan.year.currentPrice | currency}}/year
          </v-btn>
        </div>
        <div v-else class="my-3">
          <v-btn>Sign Up Free</v-btn>
        </div>
      </div>

      <div class="col-sm-6">
        <ul>
          <li v-if="plan.services.actionPlan">
            <font-awesome-icon icon="chart-bar" /> Analysis of your real-world situation.
          </li>
          <li v-if="plan.services.actionPlan">
            <font-awesome-icon icon="tasks" /> Custom action plan based on your goals.
          </li>
          <li v-if="plan.services.retainer">
            <font-awesome-icon icon="phone" /> Access via phone, text, and email.
          </li>
          <li v-if="plan.services.retainer">
            <font-awesome-icon icon="hands-helping" /> On retainer for up to 4 hours a month.
          </li>
          <li v-if="plan.services.videoChat">
            <font-awesome-icon icon="chalkboard-teacher" /> {{plan.services.videoChat}} 1-on-1 video chat.
          </li>
          <li v-if="plan.services.weeklyCheckin">
            <font-awesome-icon icon="envelope" /> Weekly check-in.
          </li>
          <li v-if="plan.services.groupFaq">
            <font-awesome-icon icon="user-friends" /> Monthly group FAQ sessions.
          </li>
          <li v-if="plan.services.proCourses">
            <font-awesome-icon icon="laptop-code" /> Access to in-depth, interactive courses released monthly.
          </li>
          <li v-if="plan.services.coursePriority">
            <font-awesome-icon icon="clock" /> {{plan.services.coursePriority}} for suggesting which topics to cover next.
          </li>
          <font-awesome-icon icon="desktop" /> Access to all free courses and videos.
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import subscriptionPlanJson from '@/utils/subscription-plan-data.json';

  export default {
     data(){
      let plans = subscriptionPlanJson.plans;
      let plan = plans.find(p => p.id == this.stripePlanId);

      return {
        plan,
      }
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

  ul {
    padding: 0px;

    li {
      list-style-type: none;
    }
  }
</style>