<template>
  <div>
    <h1>Next steps to take:</h1>
    <!-- TODO: make workflow for each -->
    <!-- TODO: have ability to 'check them off' -->
    <div v-if="plan.services.actionPlan" class="perk-step">
      <p>We need to schedule a time to create our action plan.</p>

      <p>But before we do that, let's do some pre-work so our call can be as effective as possible.</p>

      <!-- link to Google Forms -->
    </div>
    <div v-if="plan.services.retainer" class="perk-step">
      <p>My phone number is 501-256-3078.</p>

      <p>Put in your phone number here<p>

      <!-- phone number field -->

      <p>I'll put your number in my phone so I can answer your calls and messages as soon as possible.</p>
    </div>
    <div v-if="plan.services.videoChat" class="perk-step">
      <p>Let's schedule a time for our first video chat.</p>

      <!-- link to Calendly -->

      <p>If there's not a time on the calendar that works for you, message me and we'll figure something out.</p>
    </div>
    <div v-if="plan.services.groupFaq" class="perk-step">
      <p>Put the next group FAQ on your calendar.</p>

      <!-- Zoom URL -->
    </div>
    <div v-if="plan.services.proCourses" class="perk-step">
      <p>Check out some of our pro courses</p>

      <!-- Course cards -->
    </div>
  </div>
</template>

<script>
  import { getPlanWithDefault } from '@/utils/subscription-utils';

  export default {
    data(){
      return {
        plan: getPlanWithDefault(this.$auth.user.plan_id),
      }
    }
  }
</script>

<style lang="scss" scoped>
  .perk-step {
    border: 1px solid black;
    padding: 8px;
    margin-top: 8px;
  }
</style>