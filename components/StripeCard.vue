<template>
  <div>
    <card class='stripe-card mt-2 mb-2'
      :class='{ complete }'
      :stripe='stripePublicKey'
      :options='stripeOptions'
      @change='complete = $event.complete'
    />
    <v-btn class='pay-with-stripe' 
            @click='click'
            large
            color="green darken-2 grey--text text--lighten-4"
            :disabled='!complete || paymentPending'>
      <span>{{ buttonText }}</span>
      &nbsp;
      <v-progress-circular v-if="paymentPending" indeterminate size="20" />
      <font-awesome-icon v-else :icon="['fab', 'cc-stripe']" size="lg" />
    </v-btn>

  </div>
</template>

<script>
  import { Card } from 'vue-stripe-elements-plus'
  export default {
    data(){
      let { stripePublicKey } = this.$root.context.env;

      return {
        complete: false,
        paymentPending: false,
        stripePublicKey: stripePublicKey,
        stripeOptions: {},
      }
    },
    components: {
      Card,
    },
    methods: {
      async click(){
        this.paymentPending = true
        try {
          await this.clickAction()
          this.paymentPending = false
        } catch {
          // TODO: more specific error handling
          this.$store.dispatch('snackbar/setSnackbar', {color: 'red', text: "Something went wrong :( Check the card number and try again, or contact jeffrey: jeffrey@vuescreencasts.com", timeout: 0})

          this.paymentPending = false
        }
      }
    },
    props: {
      clickAction: {
        type: Function,
        required: true
      },
      buttonText: {
        type: String,
        required: true
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>