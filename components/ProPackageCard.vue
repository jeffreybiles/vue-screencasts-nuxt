<template>
  <div class="pro-card">
    <h1 class="display-1">{{plan.name}}</h1>
    <slot />

    <ul>
      <li v-if="plan.services.actionPlan">
        <font-awesome-icon icon="tasks" /> I'll do a complete analysis of your real-world situation and build an action plan based on your goals.
      </li>
      <li v-if="plan.services.retainer">
        <font-awesome-icon icon="hands-helping" /> I'm in the trenches with you, on retainer for up to 4 hours a month.  You can reach me via phone, text, or email, and I'll do everything in my power to solve your problem.
      </li>
      <li v-if="plan.services.videoChat">
        <font-awesome-icon icon="chalkboard-teacher" /> {{plan.services.videoChat}} 1-on-1 video chat, where we (need sales language here)
      </li>
      <li v-if="plan.services.weeklyCheckin">
        <font-awesome-icon icon="envelope" /> Weekly check-in
      </li>
      <li v-if="plan.services.groupFaq">
        <font-awesome-icon icon="user-friends" /> Monthly group FAQ sessions
      </li>
      <li v-if="plan.services.proCourses">
        <font-awesome-icon icon="laptop-code" /> Access to in-depth, interactive courses released monthly.
      </li>
      <li v-if="plan.services.coursePriority">
        <font-awesome-icon icon="clock" /> {{plan.services.coursePriority}} for suggesting which topics to cover next.
      </li>
      <font-awesome-icon icon="desktop" /> Access to all free courses and videos.
    </ul>

    <div v-if="!plan.services.free" class="my-3">
      <v-btn>${{plan.month.currentPrice}}/month</v-btn>
      <v-btn>${{plan.year.currentPrice}}/year</v-btn>
    </div>
    <div v-else class="my-3">
      <v-btn>Sign Up Free</v-btn>
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
    background-color: #ACA;
    border: 1px solid black;
    padding: 10px;
    margin-top: 10px;
    cursor: pointer;

    &:hover {
      background-color: #A0C0A0;
      box-shadow: #797 5px 5px 5px;
    }
  }

  ul {
    padding: 0px;

    li {
      list-style-type: none;
    }
  }
</style>