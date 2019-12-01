<template>
  <v-card class="ma-2"
          hover
          width="340px">
    <CourseInfo :course="course" v-slot="{numVideos, duration}">
      <nuxt-link :to="`/courses/${course.id}`">
        <v-img :src="course.image_url || ''" />
        <v-card-title>{{ course.name }}</v-card-title>
        <v-card-text>
          <div v-if="course.chapter_ids.length > 0">
            {{ course.chapter_ids.length }} Chapters
          </div> 
          <div v-else><br></div>
          <div>{{ numVideos }} Videos</div>
          <div><DurationDisplay :duration="duration" /></div>
        </v-card-text>
      </nuxt-link>
      <!-- <v-card-actions></v-card-actions> -->
    </CourseInfo>
  </v-card>
</template>

<script>
  import CourseInfo from '@/components/CourseInfo';
  import DurationDisplay from '@/components/DurationDisplay';

  export default {
    components: {
      CourseInfo,
      DurationDisplay
    },
    props: {
      course: {
        type: Object,
        required: true
      }
    }
  }
</script>

<style lang="scss" scoped>
  .v-application a {
    text-decoration: none;
    color:black;
  }
</style>