<template>
  <v-container>
    <!-- TODO: Make sure user is Pro... and if they aren't, keep polling server until they are -->
    <!-- This should be done after webhooks and server-side pro calculation -->
    <h1 class="display-2">Congratulations!</h1>
    <p class="headline">You're now a full-fledged VueScreencasts Pro member.</p>
    <p class="headline">You can access every single video on the site - including new exclusive content every week.</p>
    <p class="headline">Here are some good courses to get started with.</p>

    <v-row>
      <v-col v-for="course in featuredCourses" 
            :key="course.id"
            cols="12" sm="6">
        <CourseCard :course="course" :showFreeStatus="false" />
      </v-col>
    </v-row>
    
  </v-container>
</template>

<script>
  import CourseCard from '@/components/CourseCard.vue';
  import { mapGetters } from 'vuex';

  export default {
    components: {
      CourseCard
    },
    data() {
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
      featuredCourses(){
        return this.course_ids.map(c_id => this.getCourse(c_id))
      },
    }
  }
</script>

<style lang="scss" scoped>

</style>