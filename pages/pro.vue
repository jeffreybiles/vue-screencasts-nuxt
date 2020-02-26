
<template>
  <div />
</template>

<script>
  export default {
    created(){
      this.$router.replace(`/#${ this.$route.query.solution || 'pro-platinum'}`);
    }
  }
</script>

<style lang="scss" scoped>

</style>