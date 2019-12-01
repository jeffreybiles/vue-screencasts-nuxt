<template>
  <v-container>
    <CourseInfo :course="course" v-slot="{duration, numVideos}">
      <h1>{{ course.name }}</h1>
      <v-img :src="course.image_url || ''" class="thumbnail-image" />
      <br>
      <div>{{numVideos}} videos</div>
      <div>Total length: <DurationDisplay :duration="duration" /></div>
    </CourseInfo>
  </v-container>
</template>

<script>
  import { mapGetters } from 'vuex';
  import CourseInfo from '@/components/CourseInfo'
  import DurationDisplay from '@/components/DurationDisplay'

  export default {
    components: {
      CourseInfo,
      DurationDisplay
    },
    computed: {
      ...mapGetters({
        getCourse: 'courses/get'
      }),
      course(){
        return this.getCourse(this.$route.params.id)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .thumbnail-image {
    max-width: 500px;
    margin: auto;
  }
</style>