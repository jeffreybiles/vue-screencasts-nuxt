<template>
  <v-btn x-large color="green darken-2 grey--text text--lighten-4" class="ma-1" :disabled="disabled" :to="`/order?plan=${plan.id}`">
    <div>
      Subscribe for <br>
      <strike>${{plan.fullPrice}}/{{plan.period}}</strike>
      ${{plan.currentPrice}}/{{plan.period}}
    </div>
  </v-btn>
</template>

<script>
  export default {
    props: {
      plan: {
        type: Object,
        required: true
      },
      disabled: {
        type: Boolean
      }
    }  
  }
</script>

<style lang="scss" scoped>

</style>