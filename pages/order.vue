<template>
  <v-container>
  <div v-if="this.$auth.user && this.$auth.user.pro">
    <h1>Your current plan is {{currentPlan && currentPlan.name || 'Bronze'}}.</h1>
    <h1>We're working on a way to change your plan with a click. Until then...</h1>
    <h1>Email me to change your plan:
      <a :href="`mailto:jeffrey@vuescreencasts.com?subject=I would like to change my subscription to ${plan.name}, billed ${planTerm}ly&body=I understand that this email authorizes VueScreencasts.com to charge the card on file for $${currentPrice} every ${planTerm} until I cancel or change plans.`" target="_blank">jeffrey@vuescreencasts.com</a></h1>
  </div>
  <div v-else>
    <v-stepper v-model="step" non-linear>
      <v-stepper-header>
        <v-stepper-step :complete="step > 1" editable step="1">
          {{seats}} User{{seats > 1 ? 's' : ''}}, billed {{planTerm}}ly
        </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step :complete="$auth.loggedIn" editable step="2">
          <span v-if="$auth.loggedIn">
            Logged in as {{$auth.user.email}}
          </span>
          <span v-else>
            Login
          </span>
        </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step :editable="$auth.loggedIn" step="3">
          Pay {{totalPrice | currency}}
        </v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <div class="headline">You've selected the {{plan.name}} package</div>
          <OrderPricesTable :data="orderPricesTableData" />
          <NumberInput label="Please select the number of seats:" width="265" :min="1" :value="seats" @input="setSeats" />
          <SelectWithButtons title="Select billing cycle" :value="planTerm" @change="setTerm($event)">
            <v-btn value="month">Monthly</v-btn>
            <v-btn value="year">Yearly (save additional {{this.calculateSavings('year', 1)}}%)</v-btn>
          </SelectWithButtons>
          <div>Per seat price: {{ currentPrice | currency }}</div>
          <div>Total price: {{ totalPrice | currency }}</div>

          <p v-if="seats > 1 || planTerm == 'year'">
            <strong>
              You're saving {{ calculateSavings(planTerm, seats) }}% with
              <span v-if="seats > 1">a team purchase</span>
              <span v-if="seats > 1 && planTerm == 'year'"> and </span>
              <span v-if="planTerm == 'year'">yearly payments</span>.
            </strong>
          </p>

          <v-btn @click="step = 2" color="primary">Continue</v-btn>
        </v-stepper-content>
        <v-stepper-content step="2">
          <div v-if="$auth.loggedIn">
            <font-awesome-icon icon="check" /> &nbsp; You're logged in as {{$auth.user.email}}
            <v-btn color="primary" @click="step = 3">Continue</v-btn>
          </div>
          <UserAuthTogglableForm v-else
                        :postRegisterAction="() => step = 3"
                        :postLoginAction="() => step = 3" />
        </v-stepper-content>
        <v-stepper-content step="3">
          <v-card min-height="200px" min-width="600px">
            <div class="pa-3">
              <h2 class="section-title">Purchase {{plan.name}} package.</h2>
              <p class="subheader">Your card will be charged {{totalPrice | currency}} every {{planTerm}}.  At any point you can change or cancel your plan with just one email.</p>

              <StripeCard buttonText="Pay and Subscribe"
              :clickAction="pay" />

              <small>Payment is handled securely through Stripe, so your credit-card number will never touch VueScreencasts servers.</small>
            </div>
          </v-card>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </div>
  </v-container>
</template>

<script>
  import CourseCard from '@/components/CourseCard.vue';
  import StripeCard from '@/components/StripeCard.vue';
  import HomePageSection from '@/components/HomePageSection.vue';
  import { mapGetters } from 'vuex';
  import subscriptionPlanJson from '@/utils/subscription-plan-data.json';
  import UserAuthTogglableForm from '@/components/UserAuthTogglableForm.vue';
  import { getPlan } from '@/utils/subscription-utils';
  import NumberInput from "~/components/NumberInput";
  import OrderPricesTable from "~/components/OrderPricesTable";
  import SelectWithButtons from "~/components/SelectWithButtons";

  export default {
    components: {
      SelectWithButtons,
      OrderPricesTable,
      NumberInput,
      StripeCard,
      HomePageSection,
      UserAuthTogglableForm
    },
    data() {
      let { stripeEnv } = this.$root.context.env;
      return {
        step: 1,
        seats: 1,
        planId: this.$route.query.plan,
        planTerm: this.$route.query.planTerm,
        plans: subscriptionPlanJson.plans.filter(p => !p.deprecated),
        stripeEnv
      }
    },
    computed: {
      orderPricesTableData() {
        return this.usersRangeKeys.map(range => ({
          range,
          icon: this.getIcon(range),
          monthlyPrice: this.plan['month'].prices[range],
          monthlySaving: this.calculateSavings('month', range),
          yearlyPrice: this.plan['year'].prices[range],
          yearlySaving: this.calculateSavings('year', range)
        }))
      },
      plan(){
        return this.plans.find(p => p.id == this.planId)
      },
      currentPlan(){
        return getPlan(this.$auth.user.plan_id)
      },
      currentPrice(){
        return this.currentTermPrices[this.currentUsersRangeKey]
      },
      totalPrice() {
        return this.currentPrice * this.seats
      },
      currentTermPrices(){
        return this.plan[this.planTerm].prices
      },
      usersRangeKeys() {
        return Object.keys(this.plan['month'].prices)
      },
      currentUsersRangeKey() {
        if (this.seats >= 5) { return "5+"}
        else if (this.seats >= 2) { return "2-4" }
        return "1"
      }
    },
    created() {
      let { seats, team } = this.$route.query
      if (seats) {
        this.seats = parseInt(seats)
      }
    },
    methods: {
      getIcon(range) {
        if (range === "5+") { return "mdi-account-group"}
        else if (range === "2-4") { return "mdi-account-multiple"}
        return "mdi-account"
      },
      calculateSavings(term, rangeKey){
        // allow for rangeKey to be either the key or an integer
        if(!isNaN(Number(rangeKey))) {
          if(rangeKey >= 5) {
            rangeKey = '5+'
          } else if(rangeKey >= 2) {
            rangeKey = '2-4'
          } else {
            rangeKey = '1'
          }
        }

        let highestCost = this.plan['month'].prices['1']
        let currentCost = this.plan[term].prices[rangeKey]

        // get per-month cost for yearly prices
        if(term == 'year') {
          currentCost = currentCost / 12
        }

        return 100 - Math.floor(currentCost/highestCost * 100)
      },
      async pay(source){
        let planId = this.plan[this.planTerm].stripeId[this.stripeEnv]
        let updatedUser = await this.$axios.post('stripe/create_subscription', {
          source,
          planId,
          seats: this.seats
        })
        await this.$auth.fetchUser()
        this.$router.push({path: '/account/next-steps'})
      },
      setTerm(newTerm) {
        this.planTerm = newTerm;

        this.$router.push({path: '/order', query: {
          ...this.$route.query,
          planTerm: newTerm
        }})
      },
      setSeats(newSeats) {
        this.seats = newSeats

        this.$router.push({path: '/order', query: {
          ...this.$route.query,
          seats: newSeats
        }})
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

  .disabled {
    background-color: $grey;
    color: #aaaaaa;
    cursor: none;
    pointer-events: none;
  }
</style>
