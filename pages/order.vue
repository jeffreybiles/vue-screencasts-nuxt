<template>
  <div>
    <HomePageSection classes="" innerClasses="order-header">
      <div class="col-md-6">
        <div v-if="this.$auth.user && this.$auth.user.pro">
          <h1>Your current plan is {{currentPlan && currentPlan.name || 'Bronze'}}.</h1>
          <h1>We're working on a way to change your plan with a click. Until then...</h1>
          <h1>Email me to change your plan:
            <a :href="`mailto:jeffrey@vuescreencasts.com?subject=I would like to change my subscription to ${plan.name}, billed ${planTerm}ly&body=I understand that this email authorizes VueScreencasts.com to charge the card on file for $${currentPrice} every ${planTerm} until I cancel or change plans.`" target="_blank">jeffrey@vuescreencasts.com</a></h1>
        </div>
        <div v-else>
          <h2 class="section-title">Cool!  Let's get some information and get you started.</h2>
          <div class="step">
            <template v-if="!isTeamPackageInterfaceEnabled">
              <font-awesome-icon icon="check" /> &nbsp;You've selected the {{plan.name}} package, with {{planTerm}}ly payments of {{currentPrice | currency}}.
              <br>
              <div v-if="planTerm == 'month'">
                <a @click="setTerm('year')">Save {{yearlySavings}}% by switching to yearly payments ({{yearlyPrice | currency}}/year)</a>
              </div>
              <div v-else>
                <a @click="setTerm('month')">Switch back to monthly payments ({{monthlyPrice | currency}}/month)</a>
              </div>
              or
              <div>
                <a @click="enableTeamPackageInterface">Purchase for a team and save up to {{teamPurchaseMaxSavings}}%</a>
              </div>
            </template>
            <template v-else>
              <div class="headline">You've selected the {{plan.name}} package</div>
              <v-simple-table>
                <template v-slot:default>
                  <thead>
                  <tr>
                    <th class="text-left">Number users</th>
                    <th class="text-left">Cost per month</th>
                    <th class="text-left">Cost per year</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="range in usersRangeKeys" :key="range">
                    <td><v-icon>{{getIcon(range)}}</v-icon> {{ range }}</td>
                    <td>{{ plan['month'].prices[range] | currency }}/user</td>
                    <td>{{ plan['year'].prices[range] | currency }}/user</td>
                  </tr>
                  </tbody>
                </template>
              </v-simple-table>
              <NumberInput label="Please select the number of seats:" :min="1" :value="seats" @input="setSeats" />
              <v-radio-group :value="planTerm" @change="$event => setTerm($event)">
                <template v-slot:label>
                  <div>Select <strong>type of payments</strong></div>
                </template>
                <v-radio value="month">
                  <template v-slot:label>
                    <div>Monthly</div>
                  </template>
                </v-radio>
                <v-radio value="year">
                  <template v-slot:label>
                    <div>Yearly</div>
                  </template>
                </v-radio>
              </v-radio-group>
              <div>Per seat price: {{ currentPrice | currency }}</div>
              <div>Total price: {{ totalPrice | currency }}</div>
              <strong>You're saving {{ teamSavings }}% with a team package!</strong>
            </template>
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
                <p class="subheader">Your card will be charged {{totalPrice | currency}} every {{planTerm}}.  At any point you can change or cancel your plan with just one email.</p>

                <StripeCard buttonText="Pay and Subscribe"
                :clickAction="pay" />

                <small>Payment is handled securely through Stripe, so your credit-card number will never touch VueScreencasts servers.</small>
              </div>
            </v-card>
          </v-dialog>
        </div>
      </div>
      <div class="col-md-6 center-md d-sm-block d-none">
        <img src="~assets/happy-vue-programmer.png" class="img-responsive" alt="VueScreencasts Student Learning">
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
  import { getPlan } from '@/utils/subscription-utils';
  import NumberInput from "~/components/NumberInput";

  export default {
    components: {
      NumberInput,
      StripeCard,
      HomePageSection,
      UserAuthModal
    },
    data() {
      let { stripeEnv } = this.$root.context.env;
      return {
        isTeamPackageInterfaceEnabled: false,
        seats: 1,
        planId: this.$route.query.plan,
        planTerm: this.$route.query.planTerm,
        plans: subscriptionPlanJson.plans.filter(p => !p.deprecated),
        paymentModalOpen: false,
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
        return this.plan[this.planTerm].prices[this.currentUsersRangeKey]
      },
      totalPrice() {
        return this.currentPrice * this.seats
      },
      yearlyPrice(){
        return this.plan['year'].prices[this.currentUsersRangeKey]
      },
      monthlyPrice(){
        return this.plan['month'].prices[this.currentUsersRangeKey]
      },
      teamPurchaseMaxSavings() {
        let teamCostDifference = Math.floor(this.plan[this.planTerm].prices["5+"] / this.plan[this.planTerm].prices["1"]  * 100)
        return 100 - teamCostDifference;
      },
      teamSavings() {
        let teamCostDifference = Math.floor(this.plan[this.planTerm].prices[this.currentUsersRangeKey] / this.plan[this.planTerm].prices["1"]  * 100)
        return 100 - teamCostDifference;
      },
      yearlySavings(){
        let costPercentOfYearly = Math.floor(this.yearlyPrice / (this.monthlyPrice * 12)  * 100)
        return 100 - costPercentOfYearly;
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
      this.isTeamPackageInterfaceEnabled = this.seats > 1 || team === "true"
    },
    methods: {
      getIcon(range) {
        if (range === "5+") { return "mdi-account-group"}
        else if (range === "2-4") { return "mdi-account-multiple"}
        return "mdi-account"
      },
      enableTeamPackageInterface() {
        this.isTeamPackageInterfaceEnabled = true
        this.seats = 2
        this.$router.replace({ path: '/order', query: { ...this.$route.query, team: true, seats: 2 }})
      },
      async pay(source){
        let planId = this.plan[this.planTerm].stripeId[this.stripeEnv]
        let updatedUser = await this.$axios.post('stripe/create_subscription', {
          source,
          planId,
          seats: this.seats
        })
        await this.$auth.fetchUser()
        this.$router.push({path: '/account/next-steps', query: {seats: this.seats}})
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

  .paper-container-large {
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
    padding-left: 15px;
    padding-right: 15px;
  }

  .step {
    padding-bottom: 20px;

    a {
      color: green;
    }
  }

  .disabled {
    background-color: $grey;
    color: #aaaaaa;
    cursor: none;
    pointer-events: none;
  }
</style>
