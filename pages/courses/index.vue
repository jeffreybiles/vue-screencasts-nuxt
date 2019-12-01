<template>
  <v-container class="d-flex flex-wrap">
    <div v-for="course in courses" :key="course.id">
      <CourseCard :course="course" />
    </div>
  </v-container>
</template>

<script>
  import axios from 'axios';
  import { mapGetters } from 'vuex';
  import CourseCard from '@/components/CourseCard';

  export default {
    components: {
      CourseCard
    },
    computed: {
      ...mapGetters({
        courses: 'courses/topLevel'
      }),
    }
  }
</script>

<style lang="scss" scoped>

</style>