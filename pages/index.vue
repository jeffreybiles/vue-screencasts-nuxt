<template>
  <v-container class="home">
    <v-row>
      <v-col cols="12">
        <h1 class="display-2 text-center">VueJS for the Real World</h1>
        <h3 class="display-1 text-center">Advanced skills. Big projects.</h3>
        <div class="text-center">
          <v-btn color="primary" text x-large class="mt-2 mb-2" to="/courses">Start Learning Now</v-btn>
        </div>
      </v-col>
      <v-col cols="12" md="8">
        <h1 class="display-2">SO MANY COURSES</h1>
        <p>16 courses. 169 videos. Almost 17 hours of content.</p>
        <p>And <em>much</em> more on the way.</p>
        <p>Here's a sample.</p>
        <v-row>
          <v-col v-for="course in featuredCourses" 
                :key="course.id"
                cols="12" sm="6">
            <CourseCard :course="course" />
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" md="4" class="pr-0">
        <SocialProofGrid />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import SocialProofGrid from '@/components/SocialProofGrid.vue';
import CourseCard from '@/components/CourseCard.vue';

export default {
  components: {
    SocialProofGrid,
    CourseCard
  },
  data(){
    return {
      course_ids: [
        3, //Building VueScreencasts.com
        27, //Building Complex Data Tables with Vuetify's v-data-table and VueJS
        15, //Introduction to NuxtJS
        19, //Nuxt Auth: Authentication and Authorization in Nuxt
        24, //Vue 2.6 Slots
        26 //VueJS: Secure File Upload to S3, Directly from the Browser
      ]
    }
  },
  computed: {
    ...mapGetters({
      getCourse: 'courses/get'
    }),
    headers(){
      return [
        {text: 'Played', value: 'played', sortable: false, width: "70px"},
        {text: 'Name', value: 'name'},
        {text: 'Date', value: 'sortable_published_at'},
        {text: 'Duration', value: 'duration'},
        {text: 'Course', value: 'courseName'},
      ]
    },
    featuredCourses(){
      return this.course_ids.map(c_id => this.getCourse(c_id))
    },
  }
}
</script>

<style lang="scss">
</style>
