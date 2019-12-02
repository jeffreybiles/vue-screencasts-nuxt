<template>
  <div>
    <h1>{{course.name}}</h1>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';

  export default {
    computed: {
      ...mapGetters({
        getCourse: 'courses/get'
      }),
      course(){
        return this.getCourse(this.$route.params.id)
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>