<template>
  <v-container>
  <div v-if="this.$auth.user && this.$auth.user.pro">
    <h1>Your current plan is {{currentPlan && currentPlan.name || 'Bronze'}}.</h1>
    <h1>We're working on a way to change your plan with a click. Until then...</h1>
    <h1>Email me to change your plan:
      <a :href="`mailto:jeffrey@vuescreencasts.com?subject=I would like to change my subscription to ${plan.name}, billed ${planTerm}ly&body=I understand that this email authorizes VueScreencasts.com to charge the card on file for $${currentPrice} every ${planTerm} until I cancel or change plans.`" target="_blank">jeffrey@vuescreencasts.com</a></h1>
  </div>
  <div v-else>
    <div class="headline">Purchase the {{plan.name}} package</div>

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
          Pay {{totalPrice | currency}}/{{planTerm}}
        </v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <v-simple-table>
            <thead>
              <tr>
                <th class="text-left">Number users</th>
                <th :class="['text-left', planTerm == 'month' ? 'selected-term' : '']">Billed monthly</th>
                <th :class="['text-left', planTerm == 'year' ? 'selected-term' : '']">Billed yearly</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="range in Object.keys(this.plan['month'].prices)" 
                  :key="range"
                  :class="[ range == currentUsersRangeKey ? 'selected-range' : '']">
                <td><v-icon>{{getIcon(range)}}</v-icon> {{ range }}</td>
                <td :class="[planTerm == 'month' ? 'selected-term' : '']">
                  {{ plan['month'].prices[range] | currency }}/user
                  (save {{calculateSavings('month', range)}}%)
                </td>
                <td :class="[planTerm == 'year' ? 'selected-term' : '']">
                  {{ plan['year'].prices[range] | currency }}/user
                  (save {{calculateSavings('year', range)}}%)
                </td>
              </tr>
              <tr>
                <td>
                  <NumberInput label="Please select the number of seats:" 
                               width="150"
                               :min="1"
                               :value="seats"
                               @input="setSeats" />
                </td>
                <td>
                  <v-btn @click="planTerm='month'" 
                          color="primary"
                          :disabled="planTerm == 'month'">
                    Billed Monthly
                  </v-btn>
                </td>
                <td>
                  <v-btn @click="planTerm='year'" 
                         color="primary"
                         :disabled="planTerm == 'year'">
                    Billed Yearly
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </v-simple-table>

          <div>Per-user price: {{ currentPrice | currency }}</div>
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
            <font-awesome-icon icon="check" /> &nbsp; You're logged in as {{$auth.user.email}}.
            <div class="pt-3"><v-btn color="primary" @click="step = 3">Continue</v-btn></div>
          </div>
          <UserAuthTogglableForm v-else
                        :postRegisterAction="() => step = 3"
                        :postLoginAction="() => step = 3" />
        </v-stepper-content>
        <v-stepper-content step="3">
          <v-card min-height="200px" min-width="600px">
            <div class="pa-3">
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

  export default {
    components: {
      NumberInput,
      StripeCard,
      HomePageSection,
      UserAuthTogglableForm
    },
    data() {
      let { stripeEnv } = this.$root.context.env;
      let query = this.$route.query;
      return {
        step: query.step ? parseInt(query.step) : 1,
        seats: query.seats ? parseInt(query.seats) : 1,
        planId: query.plan,
        planTerm: query.planTerm,
        plans: subscriptionPlanJson.plans.filter(p => !p.deprecated),
        stripeEnv
      }
    },
    computed: {
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
      currentUsersRangeKey() {
        if (this.seats >= 5) { return "5+"}
        else if (this.seats >= 2) { return "2-4" }
        return "1"
      }
    },
    watch: {
      step(val){
        this.$router.push({path: '/order', query: {
          ...this.$route.query,
          step: val
        }})
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

  .selected-term {
    background-color: #EEE;
  }
  .selected-range {
    background-color: #EEE;

    .selected-term {
      background-color: #CCC;
    }
  }

  // overriding v-simple-table border-bottom
  .v-data-table tbody tr.selected-range td.selected-term {
    border: 2px solid #999;
  }

  // overriding v-simple-table hover effect
  .v-data-table tbody tr:hover:not(.v-data-table__expanded__content) {
    background: inherit;

    &.selected-range {
      background: #EEE;
    }
  }
</style>
