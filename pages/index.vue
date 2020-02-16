<template>
  <v-container class="home">
    <v-row>
      <v-col cols="12">
        <h1 class="display-2 text-center">VueScreencasts.com</h1>
        <!-- change slogan font to make it more fun -->
        <h3 class="display-1 text-center">All things intermediate and advanced.</h3>
        <div class="text-center">
          <v-btn color="green darken-2" outlined x-large class="mt-2 mb-2" to="/courses">Start Learning Now</v-btn>
        </div>
      </v-col>
      <v-col cols="12" md="8">
        <p>{{courses.length}} courses. {{videos.length}} videos. Over 19 hours of content.</p>
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
import { mapGetters, mapState } from 'vuex';
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
      getCourse: 'courses/get',
      courses: 'courses/topLevel'
    }),
    ...mapState({
      videos: state => state.videos.videos,
    }),
    featuredCourses(){
      return this.course_ids.map(c_id => this.getCourse(c_id))
    },
  }
}
</script>

<style lang="scss">
</style>
