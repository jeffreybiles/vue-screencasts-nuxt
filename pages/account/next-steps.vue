<template>
  <div>
    <h1 class="section-title mt-3 mb-1">Congratulations on subscribing to the {{plan.name}} plan!</h1>
    <h1 class="section-subtitle">Next steps to take:</h1>

    <div v-if="seats > 1">
      <NextStepCompletionCard :markComplete="() => { markComplete('sendTeamMembersInfo')}"
                              :stepCompleted="next_steps_taken.sendTeamMembersInfo">
        <p>Please send <a href="mailto:jeffrey@vuescreencasts.com">jeffrey@vuescreencasts.com</a>the names and emails of the other 
           {{ seats == 2 ? 'team member' : `${seats - 1} team members` }} you want on the plan.</p>
      </NextStepCompletionCard>
    </div>
    <div v-if="plan.services.actionPlan">
      <NextStepCompletionCard :markComplete="() => { markComplete('actionPlan')}"
                              :stepCompleted="next_steps_taken.actionPlan">
        <p>First, let's schedule a time to create our action plan.</p>

        <p><a href="https://calendly.com/jeffreybiles/create-an-action-plan" target="_blank">Book an initial planning session on Calendly</a></p>

        <p>If there's not a time on the calendar that works for you, message me and we'll figure something out.</p>
      </NextStepCompletionCard>
    </div>
    <div v-if="plan.services.retainer">
      <NextStepCompletionCard :markComplete="() => { markComplete('retainer')}"
                              :stepCompleted="next_steps_taken.retainer">
        <p>My phone number is 501-256-3078.</p>

        <p>Text me and say who you are and that you just signed up.</p>

        <p>I'll put your number in my phone so I can answer your calls and messages as soon as possible.</p>
      </NextStepCompletionCard>
    </div>
    <div v-if="plan.services.videoChat">
      <NextStepCompletionCard :markComplete="() => { markComplete('videoChat')}"
                              :stepCompleted="next_steps_taken.videoChat">
        <p>Let's schedule a time for our first video chat.</p>

        <p><a href="https://calendly.com/jeffreybiles/coaching-chat" target="_blank">Schedule Now on Calendly</a>.</p>

        <p>If there's not a time on the calendar that works for you, message me and we'll figure something out.</p>
      </NextStepCompletionCard>
    </div>
    <!-- Turn this on when I create the first group FAQ -->
    <div v-if="plan.services.groupFaq && false">
      <NextStepCompletionCard :markComplete="() => { markComplete('groupFaq')}"
                              :stepCompleted="next_steps_taken.groupFaq">
        <p>Put the next group FAQ on your calendar.</p>

        <!-- Zoom URL -->
      </NextStepCompletionCard>
    </div>
    <div v-if="plan.services.weeklyCheckin">
      <NextStepCompletionCard :markComplete="() => { markComplete('weeklyCheckin')}"
                              :stepCompleted="next_steps_taken.weeklyCheckin">
        <p>I'll be emailing you soon with special instructions on how to get started with weekly checkins.</p>
        <p>The subject line will be "Your First Vue Check-In".</p>
        <p>If you want to get a jump on the process, <a href="mailto:jeffrey@vuescreencasts.com?subject=Let's get started with weekly check-ins" target="_blank">click here to email me</a>.</p>
      </NextStepCompletionCard>
    </div>
    <div v-if="plan.services.proCourses">
      <NextStepCompletionCard :markComplete="() => { markComplete('proCourses')}"
                              :stepCompleted="next_steps_taken.proCourses">
        <p><a href="https://www.vuescreencasts.com/courses" target="_blank">Check out our pro courses</a>.</p>
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
      },
      seats(){
        return this.$auth.user.plan_seats
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
