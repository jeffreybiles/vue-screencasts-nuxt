<template>
  <v-container class="home">
    <v-row>
      <v-col cols="12" md="8">
        <h1>Beyond the Basics</h1>
        <p>There are dozens of great resources for getting started with VueJS...</p>
        <p>But what comes next?</p>
        <p>There are only so many times you can go over intro-level concepts before you're just wasting your time.</p>

        <h1>Advanced Vue for Pro Developers</h1>
        <p>I'll still cover the basics, but my goal isn't to compete with all the other educators out there on who can explain v-bind the best.</p>
        <p>Instead, I want to tackle meaty problems that Vue developers will encounter in the real world.</p>

        <h1>Starting in late January 2020: new videos (almost) every workday</h1>
        <p>Start your day off right by watching that morning's video, steadily improving your skills every day.</p>
        <p>Or you could binge through the <em>more than sixteen hours</em> of tutorials I've already released.</p>

        <h1>Start Learning Now</h1>
        <p>Here's a sampling of the courses available:</p>
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
