<template>
  <span>
    {{ Math.floor(duration / 60)}}:{{duration % 60}}
  </span>
</template>

<script>
  export default {
    props: ['duration']
  }
</script>

<style lang="scss" scoped>

</style>