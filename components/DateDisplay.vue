<template>
  <span v-if="date">
    {{date.getMonth() + 1}}/{{date.getDate()}}/{{date.getFullYear()}}
  </span>
</template>

<script>
  export default {
    props: ['date']
  }
</script>

<style lang="scss" scoped>

</style>