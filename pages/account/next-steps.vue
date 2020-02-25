<template>
  <div>
    <h1>Congratulations on subscribing to the {{plan.name}} plan!</h1>
    <h1>Next steps to take:</h1>
    <!-- TODO: make workflow for each -->
    <!-- TODO: have ability to 'check them off' -->
    <div v-if="plan.services.actionPlan" 
        :class="['perk-step', next_steps_taken.actionPlan ? 'minimized-step' : '']">
      <p v-if="next_steps_taken.actionPlan">
        <font-awesome-icon icon="check" /> Done
      </p>
      
      <p>First, let's schedule a time to create our action plan.</p>

      <a href="https://calendly.com/jeffreybiles/create-an-action-plan">Book an initial planning session on Calendly</a>

      <p>If there's not a time on the calendar that works for you, message me and we'll figure something out.</p>

      <v-btn @click="markComplete('actionPlan')" 
             color="green accent-3" 
             v-if="!next_steps_taken.actionPlan">
        Mark Complete
      </v-btn>
    </div>
    <div v-if="plan.services.retainer" class="perk-step">
      <p>My phone number is 501-256-3078.</p>

      <p>Put in your phone number here<p>

      <!-- phone number field -->

      <p>I'll put your number in my phone so I can answer your calls and messages as soon as possible.</p>
    </div>
    <div v-if="plan.services.videoChat" class="perk-step">
      <p>Let's schedule a time for our first video chat.</p>

      <p><a href="https://calendly.com/jeffreybiles/coaching-chat">Schedule Now on Calendly</a>.</p>

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
    },
    computed: {
      next_steps_taken(){
        return this.$auth.user.next_steps_taken
      }
    },
    methods: {
      async markComplete(step) {
        let next_steps = this.next_steps_taken
        next_steps[step] = true;

        await this.$axios.put(`/users/${this.$auth.user.id}/update_nonsensitive`, {
          next_steps_taken: next_steps
        })
        this.$auth.fetchUser();
      }
    }
  }
</script>

<style lang="scss" scoped>
  .perk-step {
    border: 1px solid black;
    padding: 8px;
    margin-top: 8px;

    &.minimized-step {
      opacity: 0.8;
    }
  }
</style>