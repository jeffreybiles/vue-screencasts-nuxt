<template>
  <div class="text-center">
    <SubscriptionList v-slot="{plan}">
      <SubscriptionLinkButton :plan="plan" :disabled="isPro" />
    </SubscriptionList>
    
    <div v-if="isPro" class="pt-2">
      <span v-if="$auth.user.subscription_cancelled">
        Your subscription runs out on <DateDisplay :date="new Date($auth.user.subscription_end_date)" />.
        <ButtonAsync color="green darken-2 grey--text text--lighten-4" :clickAction="resubscribe">
          Resubscribe
        </ButtonAsync>
      </span>
      <span v-else>
        You're already a Pro member.  Smart. <nuxt-link to="/courses">Start Learning</nuxt-link>.
      </span>
    </div>
  </div>
</template>

<script>
  import SubscriptionList from '@/components/SubscriptionList.vue';
  import SubscriptionLinkButton from '@/components/SubscriptionLinkButton.vue';
  import ButtonAsync from '@/components/ButtonAsync.vue';
  import DateDisplay from '@/components/DateDisplay.vue';

  export default {
    components: {
      SubscriptionList,
      SubscriptionLinkButton,
      ButtonAsync,
      DateDisplay,
    },
    computed: {
      isPro(){
        return this.$auth.user && this.$auth.user.pro
      }
    },
    methods: {
      async resubscribe(){
        await this.$axios.post('/stripe/resubscribe');

        this.$store.dispatch('snackbar/setSnackbar', {text: "You're subscribed again!  Congratulations!", timeout: 0})

        await this.$auth.fetchUser()

        this.$router.push('/order')
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>