<template>
  <div>
    <h1>Billing</h1>

    <span v-if="!subscription">
      You are not subscribed.
      <nuxt-link :to="`/order`">Order Now</nuxt-link>
    </span>
    <span v-else>
    
      <p v-if="card">
        Your current card ends in <strong>{{card.last4}}</strong>.  
        It expires <strong>{{card.exp_month}}/{{card.exp_year}}</strong>.
      </p>
      <p v-else>
        There is no card on file.  <nuxt-link :to="`/order`">Go to the order page</nuxt-link> to restart your account.
      </p>

      <p>
        <span v-if="!$auth.user.pro">
          You are not currently subscribed.
        </span>
        <span v-else-if="subscription.canceled_at">
          Your subscription will end on {{ subscriptionEndDate }}.
          <ButtonAsync color="green darken-2 grey--text text--lighten-4" :clickAction="resubscribe">
            Resubscribe
          </ButtonAsync>
        </span>
        <span v-else>
          Your next payment will be on {{ subscriptionEndDate }}.
        </span>
      </p>

      <h2 class="mt-3">Previous Payments</h2>
      <v-simple-table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Amount</th>
            <th>Paid?</th>
            <th>Card</th>
            <th>Invoice</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="charge in charges" :key="charge.id">
            <td>{{ new Date(charge.created * 1000).toDateString() }}</td>
            <td>${{ charge.amount / 100 }}</td>
            <td>{{charge.paid}}</td>
            <td>{{charge.payment_method_details.card.last4}}</td>
            <td><a :href="`${charge.receipt_url}`" target="_blank">Link</a></td>
          </tr>
        </tbody>
      </v-simple-table>

      <span v-if="!subscription.canceled_at">
        <h2 class="mt-3">Cancellation</h2>
        <p>Switched frameworks?  Had enough learning?</p>
        <ButtonAsync color="red" :clickAction="cancelSubscription" :outlined="true">
          Cancel Subscription
        </ButtonAsync>
      </span>
      <span v-else-if="$auth.user.pro">
        <!-- If user still has subscription but has canceled it -->
        <h2 class="mt-3">Resubscribe</h2>
        <p>If you resubscribe, next payment will be on {{ subscriptionEndDate }}.</p>
        <ButtonAsync color="green darken-2 grey--text text--lighten-4" :clickAction="resubscribe">
          Resubscribe
        </ButtonAsync>
      </span>
    </span>
  </div>
</template>

<script>
  import ButtonAsync from '@/components/ButtonAsync.vue';
  export default {
    components: {
      ButtonAsync
    },
    async asyncData({$axios}){
      let { data } = await $axios.get('/stripe/user_info')
      let { charges, card, subscription } = data
      return {
        charges,
        card,
        subscription,
      }
    },
    computed: {
      subscriptionEndDate(){
        return new Date(this.subscription.current_period_end * 1000).toDateString()
      }
    },
    methods: {
      async cancelSubscription(){
        // TODO: Error handling
        let response = await this.$axios.post('/stripe/cancel_subscription')
        this.subscription = response.data

        // TODO: make this a popup asking what went wrong (maybe a quick poll), 
        // then saying they can resubscribe any time...
        // and if they do it within a month, they'll be able to keep their special pricing
        this.$store.dispatch('snackbar/setSnackbar', {text: "You're unsubscribed :(  I hope you'll join us again soon.", timeout: 0})
      },
      async resubscribe(){
        let response = await this.$axios.post('/stripe/resubscribe');
        this.subscription = response.data;

        // TODO: make this a popup celebrating them, and explaining that they won't be charged until X date
        this.$store.dispatch('snackbar/setSnackbar', {text: "You're subscribed again!  Congratulations!", timeout: 0})

        this.$router.push('/order')
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>