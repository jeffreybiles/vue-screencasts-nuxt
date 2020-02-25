<template>
  <div>
    <h1>Congratulations on subscribing to the {{plan.name}} plan!</h1>
    <h1>Next steps to take:</h1>
    <!-- TODO: make workflow for each -->
    <!-- TODO: have ability to 'check them off' -->
    <div v-if="plan.services.actionPlan">
      <NextStepCompletionCard :markComplete="() => { markComplete('actionPlan')}" 
                              :stepCompleted="next_steps_taken.actionPlan">
        <p>First, let's schedule a time to create our action plan.</p>

        <p><a href="https://calendly.com/jeffreybiles/create-an-action-plan">Book an initial planning session on Calendly</a></p>

        <p>If there's not a time on the calendar that works for you, message me and we'll figure something out.</p>
      </NextStepCompletionCard>
    </div>

    <div v-if="plan.services.retainer">
      <NextStepCompletionCard :markComplete="() => { markComplete('retainer')}" 
                              :stepCompleted="next_steps_taken.retainer">
        <p>My phone number is 501-256-3078.</p>

        <p>Message me, or put in your phone number here:<p>

        <!-- TODO: phone number field -->

        <p>I'll put your number in my phone so I can answer your calls and messages as soon as possible.</p>
      </NextStepCompletionCard>
    </div>
    <div v-if="plan.services.videoChat">
      <NextStepCompletionCard :markComplete="() => { markComplete('videoChat')}" 
                              :stepCompleted="next_steps_taken.videoChat">
        <p>Let's schedule a time for our first video chat.</p>

        <p><a href="https://calendly.com/jeffreybiles/coaching-chat">Schedule Now on Calendly</a>.</p>

        <p>If there's not a time on the calendar that works for you, message me and we'll figure something out.</p>
      </NextStepCompletionCard>
    </div>
    <div v-if="plan.services.groupFaq" class="perk-step">
      <NextStepCompletionCard :markComplete="() => { markComplete('groupFaq')}" 
                              :stepCompleted="next_steps_taken.groupFaq">
        <p>Put the next group FAQ on your calendar.</p>

        <!-- Zoom URL -->
      </NextStepCompletionCard>
    </div>
    <div v-if="plan.services.proCourses" class="perk-step">
      <NextStepCompletionCard :markComplete="() => { markComplete('proCourses')}" 
                              :stepCompleted="next_steps_taken.proCourses">
        <p>Check out some of our pro courses</p>

        <!-- Course cards -->
      </NextStepCompletionCard>
    </div>
  </div>
</template>

<script>
  import { getPlanWithDefault } from '@/utils/subscription-utils';
  import NextStepCompletionCard from '@/components/NextStepCompletionCard.vue';

  export default {
    data(){
      return {
        plan: getPlanWithDefault(this.$auth.user.plan_id),
      }
    },
    components: {
      NextStepCompletionCard
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

</style>