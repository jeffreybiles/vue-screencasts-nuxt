<template>
  <span>
    <slot :val="val" />
  </span>
</template>

<script>
  export default {
    props: ['val']
  }
</script>

<style lang="scss" scoped>
</style>