<template>
  <div>
    <HomePageSection classes="bg-dark" innerClasses="order-header">
      <div class="col-md-6">
        <!-- X will be calculated based on how many steps are completed (and be sure to pluralize step/steps)-->
        <h2 class="section-title">You're {{stepsLeft}} {{ stepsLeft | pluralize('step') }} away from turbocharging your Vue journey.</h2>

        <div class="step">
          <font-awesome-icon icon="check" /> &nbsp;You've selected the {{plan.name}} package, with {{planTerm}} payments.
        </div>

        <div class="step">
          <div v-if="$auth.loggedIn">
            <font-awesome-icon icon="check" /> &nbsp; You're logged in as {{$auth.user.email}}
          </div>
          <UserAuthModal v-else
                         :postRegisterAction="() => {paymentModalOpen = true}"
                         :postLoginAction="() => {paymentModalOpen = true}"
                         v-slot="{openModal}">
            <v-btn @click="openModal">
              Sign In or Register
            </v-btn>
          </UserAuthModal>
        </div>

        <div class="step">
          <v-btn :class="{'disabled': !$auth.loggedIn}" @click="paymentModalOpen = true">Enter Payment Information</v-btn>
        </div>

        <v-dialog
          v-model="paymentModalOpen"
          width="600"
        >
          <v-card min-height="200px" min-width="600px">
            <div class="pa-3">
              <h2 class="section-title">Purchase {{plan.name}} package.</h2>
              <p class="subheader">Your card will be charged {{plan[planTerm].currentPrice | currency}} every {{planTerm}}.  At any point you can change your plan with just one email.</p>

              <StripeCard buttonText="Pay and Subscribe"
              :clickAction="pay" />

              <small>Payment is handled securely through Stripe, so your credit-card number will never touch VueScreencasts servers.</small>
            </div>
          </v-card>
        </v-dialog>
      </div>
      <div class="col-md-6 center-md">
        <img src="~assets/vuescreencasts-student-learning-3.png" class="img-responsive" alt="VueScreencasts Student Learning">
      </div>
    </HomePageSection>
  </div>
</template>

<script>
  import CourseCard from '@/components/CourseCard.vue';
  import StripeCard from '@/components/StripeCard.vue';
  import HomePageSection from '@/components/HomePageSection.vue';
  import { mapGetters } from 'vuex';
  import subscriptionPlanJson from '@/utils/subscription-plan-data.json';
  import UserAuthModal from '@/components/UserAuthModal.vue';

  export default {
    components: {
      StripeCard,
      HomePageSection,
      UserAuthModal
    },
    data() {
      let { stripeEnv } = this.$root.context.env;
      return {
        planId: this.$route.query.plan,
        planTerm: this.$route.query.planTerm,
        plans: subscriptionPlanJson.plans.filter(p => !p.deprecated),
        paymentModalOpen: false
      }
    },
    computed: {
      plan(){
        return this.plans.find(p => p.id == this.planId)
      },
      stepsLeft(){
        return this.$auth.loggedIn ? 1 : 2;
      }
    },
    methods: {
      async pay(source){
        let updatedUser = await this.$axios.post('stripe/create_subscription', {
          source,
          planId: this.plan.stripeId
        })
        this.$auth.fetchUser()
      }
    }
  }
</script>

<style lang="scss" scoped>
  $grey: #E2E7E9;

  .stripe-card {
    width: 300px;
    border: 1px solid grey;
  }
  .stripe-card.complete {
    border-color: green;
  }

  .paper-container-large {
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
    padding-left: 15px;
    padding-right: 15px;
  }

  .step {
    padding-bottom: 20px;
  }

  .disabled {
    background-color: $grey;
    color: #aaaaaa;
    cursor: none;
    pointer-events: none;
  }
</style>