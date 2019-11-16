<template>
  <div v-if="date">
    {{date.getMonth() + 1}}/{{date.getDate()}}/{{date.getFullYear()}}
  </div>
</template>

<script>
  export default {
    props: ['date']
  }
</script>

<style lang="scss" scoped>

</style>