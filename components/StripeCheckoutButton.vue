<template>
  <span>
    <v-btn large color="primary" class="mt-1">
      <div v-html="buttonText" />
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