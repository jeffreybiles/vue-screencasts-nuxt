<template>
  <div>
    <div v-for="course in courses" :key="course.id">
      {{ course.name }}
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import { mapState } from 'vuex';

  export default {
    async fetch(context){
      await context.store.dispatch('courses/loadAll')
    },
    computed: {
      ...mapState({
        courses: state => state.courses.courses
      })
    }
  }
</script>

<style lang="scss" scoped>

</style>