<template>
  <div class="mt-3">
    <v-btn @click="filterState = null" small class="ma-1">
      All ({{ users.length }})
    </v-btn>
    <span v-for="plan in plans" :key="plan.id" @click="filterState = plan">
      <Let :val="users.filter(user => getPlanIds(plan).includes(user.plan_id))" v-slot="{val: subscribedUsers}">
        <v-btn v-if="subscribedUsers.length > 0" small class="ma-1">
          {{ plan.name }} ({{ subscribedUsers.length }})
        </v-btn>
      </Let>
    </span>

    <span v-if="filterState">
      <h1>Users whose plan is: {{filterState.name}}</h1>
      <h3>
        ID {{filterState.id}}, 
        price {{getMonthlyPrice(filterState) | currency}}/month
      </h3>
    </span>
    <h1 v-else>All users</h1>
    

    <v-text-field
      v-model="search"
      single-line
      hide-details>
      <template #label>
        &nbsp; Search by name or email among {{filteredUsers.length}} users
      </template>
    </v-text-field>
    <v-data-table :items="filteredUsers"
                  :headers="headers"
                  :search="search"
                  :custom-filter="filter"
    >
      <template #item.pro="{item}">
        <v-icon v-if="item.pro" color="green">mdi-check-circle</v-icon>
        <v-icon v-else color="red">mdi-cancel</v-icon>
      </template>
      <template #item.plan_id="{item}">
        {{ item.plan_id ? getPlanWithDefault(item.plan_id).name : ' – ' }}
      </template>
    </v-data-table>
  </div>
</template>

<script>
  import subscriptionPlanJson from '@/utils/subscription-plan-data.json'
  import { mapState } from 'vuex';
  import {getPlanWithDefault} from "~/utils/subscription-utils";
  import Let from '@/components/Let.vue';

  export default {
    async middleware({store}) {
      if (!store.state.user.users.length) {
        await store.dispatch('user/loadAll')
      }
    },
    components: {
      Let
    },
    data(){
      return {
        search: '',
        filterState: null,
        plans: subscriptionPlanJson.plans
      }
    },
    computed: {
      ...mapState({
        users: state => state.user.users
      }),
      currentFilterPlanIds() {
        return this.getPlanIds(this.filterState)
      },
      filteredUsers(){
        if (!this.filterState) {
          return this.users
        }
        return this.users.filter(u => {
          return this.currentFilterPlanIds.includes(u.plan_id)
        })
      },
      headers(){
        return [
          {text: 'Name', value: 'name'},
          {text: 'Email', value: 'email'},
          {text: 'Pro', value: 'pro', width: '70px'},
          {text: 'Plan', value: 'plan_id'}
        ]
      },
    },
    methods: {
      getPlanIds(plan) {
        if (!plan || !plan.month || !plan.year) {
          return []
        }
        return [
          plan.month.stripeId.dev,
          plan.month.stripeId.prod,
          plan.year.stripeId.dev,
          plan.year.stripeId.prod
        ]
      },
      filter(value, search, item) {
        let isInName = (item) => RegExp(search, 'i').test(item.name)
        let isInEmail = (item) => RegExp(search, 'i').test(item.email)

        return isInName(item) || isInEmail(item)
      },
      getPlanWithDefault,
      getMonthlyPrice(plan) {
        if(plan.month.prices){
          return plan.month.prices['1']
        } else {
          return plan.month.currentPrice
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
