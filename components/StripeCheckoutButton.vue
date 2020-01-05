<template>
  <span>
    <v-btn color="primary">
      {{ buttonText }}
    </v-btn>
  </span>
</template>

<script>
  export default {
    props: {
       buttonText: {
         type: String,
         default: "Subscribe"
       },
       planId: {
         type: String,
         required: true
       }
    }
  }
</script>

<style lang="scss" scoped>

</style>