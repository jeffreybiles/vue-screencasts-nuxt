<template>
  <div>
    <v-btn @click="filterState = null">
      All ({{ users.length }})
    </v-btn>
    <v-btn v-for="plan in plans" :key="plan.id" @click="filterState = plan">
      {{ plan.name }} ({{ users.filter(user => getPlanIds(plan).includes(user.plan_id)).length }})
    </v-btn>

    <h1 v-if="filterState">Users whose plan is: {{filterState.name}}</h1>
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

  export default {
    async middleware({store}) {
      if (!store.state.user.users.length) {
        await store.dispatch('user/loadAll')
      }
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
      getPlanWithDefault
    }
  }
</script>

<style lang="scss" scoped>

</style>
