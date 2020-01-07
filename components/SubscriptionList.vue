<template>
  <div>
    <span v-for="plan in plans" :key="plan.id">
      <slot :plan="plan" />
    </span>
  </div>
</template>

<script>
  import subscriptionPlanJson from '@/utils/subscription-plan-data.json';
  export default {
    data(){
      let plans = subscriptionPlanJson.plans;
      let env = this.$root.context.env.environment;
      return {
        plans: plans.filter(p => p.env == env)
      }
    }  
  }
</script>

<style lang="scss" scoped>

</style>