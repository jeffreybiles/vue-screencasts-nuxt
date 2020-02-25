
<template>
  <div />
</template>

<script>
  export default {
    created(){
      this.$router.push(`/#${ this.$route.query.solution || 'pro-platinum'}`);
    }
  }
</script>

<style lang="scss" scoped>

</style>