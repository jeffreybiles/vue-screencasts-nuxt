<template>
  <v-card class="ma-2"
          hover
          width="340px">
    <nuxt-link :to="`/courses/${course.id}`">
      <v-img :src="course.image_url || ''" />
      <v-card-title>{{ course.name }}</v-card-title>
      <v-card-text>
        <div v-if="course.chapter_ids.length > 0">
          {{ course.chapter_ids.length }} Chapters
        </div> 
        <div v-else><br></div>
        <div>{{ course.video_ids.length }} Videos</div>
        <div>X Minutes</div>
      </v-card-text>
    </nuxt-link>
    <!-- <v-card-actions></v-card-actions> -->
  </v-card>
</template>

<script>
  export default {
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