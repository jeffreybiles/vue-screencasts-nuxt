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

  </div>
</template>

<script>
  import subscriptionPlanJson from '@/utils/subscription-plan-data.json'
  import { mapState } from 'vuex';

  export default {
    async middleware({store}) {
      if (!store.state.user.users.length) {
        await store.dispatch('user/loadAll')
      }
    },
    data(){
      return {
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
        return this.users.filter(u => {
          return this.currentFilterPlanIds.includes(u.plan_id)
        })
      },
      headers(){
        return [
          {text: 'Name', value: 'name'},
          {text: 'Pro', value: 'pro', width: '70px'},
          {text: 'Date', value: 'sortable_published_at'},
          {text: 'Duration', value: 'duration'},
          {text: 'Course', value: 'courseName'}
        ]
      },
    },
    methods: {
      getPlanIds(plan) {
        if (!plan.month || !plan.year) {
          return []
        }
        return [
          plan.month.stripeId.dev,
          plan.month.stripeId.prod,
          plan.year.stripeId.dev,
          plan.year.stripeId.prod
        ]
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
