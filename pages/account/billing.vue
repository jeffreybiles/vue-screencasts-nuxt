<template>
  <div>
    <h1>Billing</h1>
    
    <p>
      Your current card ends in <strong>{{card.last4}}</strong>.  
      It expires <strong>{{card.exp_month}}/{{card.exp_year}}</strong>.
    </p>

    <p>
      <!-- TODO: make sure this displays correctly once user has unsubscribed -->
      <span v-if="subscription.cancel_at_period_end">
        Your subscription will end on
        <!-- TODO: make a one-click way for them to resubscribe -->
      </span>
      <span v-else>
        Your next payment will be on 
      </span>
      {{ new Date(subscription.current_period_end * 1000).toDateString() }}
    </p>

    <h3>Previous Payments</h3>
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
  </div>
</template>

<script>
  export default {
    async asyncData({$axios}){
      let { data } = await $axios.get('/stripe/user_info')
      let { charges, card, subscription } = data
      return {
        charges,
        card,
        subscription,
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>