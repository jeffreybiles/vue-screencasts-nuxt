<template>
  <div class="course-index">
    <v-container>
      <v-row>
        <v-col v-for="course in sortedCourses" 
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
  import _ from 'lodash';
  import { courseDecorator } from '@/utils/course-decorator';

  export default {
    components: {
      CourseCard
    },
    computed: {
      ...mapGetters({
        courses: 'courses/topLevel'
      }),
      sortedCourses(){
        let courses = this.courses.map(c => courseDecorator(c, this.$store))
        return _.sortBy(courses, 'mostRecentVideo.published_at').reverse()
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>