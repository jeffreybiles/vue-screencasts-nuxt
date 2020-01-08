<template>
  <v-container>
    <div v-if="this.$auth.user && this.$auth.user.pro">
      <h1 class="display-2">Congratulations!</h1>
      <p class="headline">You're a full-fledged VueScreencasts Pro member.</p>
      <p class="headline">You can access every single video on the site - including new exclusive content every week.</p>
      <p class="headline">Here are some good courses to get started with.</p>

      <v-row>
        <v-col v-for="course in featuredCourses" 
              :key="course.id"
              cols="12" sm="6">
          <CourseCard :course="course" :showFreeStatus="false" />
        </v-col>
      </v-row>
    </div>
    <div v-else>
      <!-- Step 1: Auth -->
      <div v-if="!$auth.loggedIn" class="pb-2">
        <h1 class="display-1">Step 1: log in or register</h1>
        <UserAuthTogglableForm />
      </div>
      <div v-else>
        <h1 class="display-1 grey--text">
          <font-awesome-icon icon="check" /> 
          You're logged in as {{$auth.user.email}}
        </h1>
        <a @click="$auth.logout()">Change User</a>
      </div>

      <!-- Step 2: Selecting a plan -->
      <div v-if="planId">
        <h1 class="display-1 grey--text">
          <font-awesome-icon icon="check" />
          You've selected a Pro subscription for ${{plan.currentPrice}}/{{plan.period}}
        </h1>
        <a @click="updatePlan(null)" v-if="$auth.loggedIn">Change Plans</a>
      </div>
      <div v-else-if="!$auth.loggedIn">
        <h1 class="display-1 grey--text">
          Step 2: Select a plan
        </h1>
      </div>
      <div v-else>
        <h1 class="display-1">
          Step 2: Select a plan
        </h1>
        <v-row>
          <v-col cols="6" v-for="plan in plans" :key="plan.id">
            <!-- STYLE TODO: add fun logos for each plan -->
            <!-- TODO: make it work with a team plan -->
            <v-hover v-slot="{hover}">
              <v-card :class="['green', hover ? 'lighten-1' : 'lighten-2']" @click="updatePlan(plan.id)">
                <v-card-title class="display-1">
                  <span v-if="plan.currentPrice != plan.fullPrice">
                    <strike>${{plan.fullPrice}}/{{plan.period}}</strike>
                    &nbsp;
                  </span>
                  ${{plan.currentPrice}}/{{plan.period}}
                </v-card-title>
                <v-card-text>
                  <span v-if="plan.period == 'year'">
                    <p>Commit for a year and save big.</p>
                  </span>
                  <span v-else-if="plan.period == 'month'">
                    <p>An affordable way to turbo-boost your knowledge.</p>
                  </span>
                </v-card-text>
              </v-card>
            </v-hover>
          </v-col>
        </v-row>
        <p>Have a team?  I'll be providing a one-click solution soon.  Until then, select yearly, then contact me: <a href="mailto:jeffrey@vuescreencasts.com" target="_blank">jeffrey@vuescreencasts.com</a>.</p>
      </div>

      <!-- Step 3: Payment Info -->
      <div v-if="!$auth.loggedIn || !this.plan">
        <h1 class="display-1 grey--text">
          Step 3: Payment Info
        </h1>
      </div>
      <div v-else>
        <h1 class="display-1">
          Step 3: Payment Info
        </h1>
        <p class="subheader">Payment is handled securely through Stripe, so your credit-card number will never touch VueScreencasts servers.</p>
        <card class='stripe-card mt-2 mb-2'
          :class='{ complete }'
          :stripe='stripePublicKey'
          :options='stripeOptions'
          @change='complete = $event.complete'
        />
        <v-btn class='pay-with-stripe primary' 
               @click='pay'
               large
               :disabled='!complete || paymentPending'>
          <span>Pay and Subscribe</span>
          &nbsp;
          <v-progress-circular v-if="paymentPending" indeterminate size="20" />
          <font-awesome-icon v-else :icon="['fab', 'cc-stripe']" size="lg" />
        </v-btn>
    
      </div>
    </div>
  </v-container>
</template>

<script>
  import UserAuthTogglableForm from '@/components/UserAuthTogglableForm.vue';
  import CourseCard from '@/components/CourseCard.vue';
  import { mapGetters } from 'vuex';
  import subscriptionPlanJson from '@/utils/subscription-plan-data.json';
  import { Card, createSource } from 'vue-stripe-elements-plus'

  export default {
    components: {
      UserAuthTogglableForm,
      CourseCard,
      Card
    },
    data() {
      let { environment, stripePublicKey } = this.$root.context.env;
      return {
        // TODO: when I get Pro courses, start including them here preferentially...
        // I want them seeing what they just gained
        course_ids: [
          3, //Building VueScreencasts.com
          27, //Building Complex Data Tables with Vuetify's v-data-table and VueJS
          15, //Introduction to NuxtJS
          19, //Nuxt Auth: Authentication and Authorization in Nuxt
          24, //Vue 2.6 Slots
          26 //VueJS: Secure File Upload to S3, Directly from the Browser
        ],
        planId: this.$route.query.plan,
        plans: subscriptionPlanJson.plans.filter(p => p.env == environment),
        complete: false,
        stripePublicKey: stripePublicKey,
        stripeOptions: {},
        paymentPending: false
      }
    },
    computed: {
      ...mapGetters({
        getCourse: 'courses/get'
      }),
      featuredCourses(){
        return this.course_ids.map(c_id => this.getCourse(c_id))
      },
      plan(){
        return this.plans.find(p => p.id == this.planId)
      }
    },
    methods: {
      updatePlan(planId){
        this.planId = planId
        this.$router.replace({
          name: 'order',
          query: {
            plan: planId
          }
        })
      },
      async pay(){
        this.paymentPending = true
        try {
          let {source} = await createSource({type: 'card'})
          let updatedUser = await this.$axios.post('stripe/create_subscription', {
            source,
            planId: this.plan.stripeId
          })
          this.$auth.fetchUser()
        } catch {
          this.paymentPending = false
        }        
      }
    }
  }
</script>

<style lang="scss" scoped>
  .stripe-card {
    width: 300px;
    border: 1px solid grey;
  }
  .stripe-card.complete {
    border-color: green;
  }
</style>