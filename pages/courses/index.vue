<template>
  <div class="course-index">
    <v-container>
      <v-row>
        <v-col v-for="course in courses" 
              :key="course.id"
              cols="12" sm="6" lg="4">
          <CourseCard :course="course" />
        </v-col>
      </v-row>
    </v-container>
  </div>
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