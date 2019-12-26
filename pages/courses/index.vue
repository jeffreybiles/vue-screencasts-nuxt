<template>
  <div class="course-index">
    <v-container>
      <v-row>
        <v-col cols="6" sm="3">
          <h3>Difficulties</h3>
          <v-checkbox v-model="difficulties.beginner" label="Beginner" hide-details />
          <v-checkbox v-model="difficulties.intermediate" label="Intermediate" hide-details />
          <v-checkbox v-model="difficulties.advanced" label="Advanced" hide-details />
        </v-col>
        <v-col cols="6" sm="3">
          <!-- Consider changing these to links... "hide completed courses" and "view in-progress courses" -->
          <h3>Progress</h3>
          <v-checkbox v-model="progress.fresh" label="Fresh" hide-details />
          <v-checkbox v-model="progress.started" label="In Progress" hide-details />
          <v-checkbox v-model="progress.completed" label="Completed" hide-details />
        </v-col>
      </v-row>
      <p>{{sortedCourses.length}} course{{sortedCourses.length == 1 ? '' : 's'}}</p>
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
  import { courseDecorator, percentVideosComplete } from '@/utils/course-decorator';

  export default {
    data(){
      return {
        difficulties: {
          beginner: true,
          intermediate: true,
          advanced: true,
          'beginner to advanced': true
        },
        progress: {
          fresh: true,
          started: true,
          completed: true
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
        return _.sortBy(this.filteredCourses, 'mostRecentVideo.published_at').reverse()
      },
      filteredCourses(){
        return this.courses.map(c => courseDecorator(c, this.$store)).filter(course => {
          let percentComplete = percentVideosComplete(course.videos, this.$store)
          let progress = percentComplete == 0 ? 'fresh' : percentComplete == 100 ? 'completed' : 'started'
          return this.difficulties[course.difficulty] && this.progress[progress]
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>