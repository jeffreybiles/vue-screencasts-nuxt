<template>
  <v-container class="d-flex flex-wrap">
    <div v-for="course in courses" :key="course.id">
      <CourseCard :course="course" />
    </div>
  </v-container>
</template>

<script>
  import axios from 'axios';
  import { mapState } from 'vuex';
  import CourseCard from '@/components/CourseCard';

  export default {
    components: {
      CourseCard
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