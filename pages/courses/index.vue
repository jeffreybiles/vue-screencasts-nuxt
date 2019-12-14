<template>
  <div class="course-index">
    <v-container>
      <v-row>
        <v-col cols="3">
          <h3>Difficulties</h3>
          <v-checkbox v-model="difficulties.beginner" label="Beginner" hide-details />
          <v-checkbox v-model="difficulties.intermediate" label="Intermediate" hide-details />
          <v-checkbox v-model="difficulties.advanced" label="Advanced" hide-details />
        </v-col>
      </v-row>
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
    data(){
      return {
        difficulties: {
          beginner: true,
          intermediate: true,
          advanced: true,
          'beginner to advanced': true
        }
      }
    },
    components: {
      CourseCard
    },
    computed: {
      ...mapGetters({
        courses: 'courses/topLevel'
      }),
      sortedCourses(){
        let courses = this.filteredCourses.map(c => courseDecorator(c, this.$store))
        return _.sortBy(courses, 'mostRecentVideo.published_at').reverse()
      },
      filteredCourses(){
        return this.courses.filter(course => {
          return this.difficulties[course.difficulty]
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>