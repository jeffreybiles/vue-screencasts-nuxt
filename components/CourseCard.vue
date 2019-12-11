<template>
  <v-card class="ma-2"
          hover
          width="340px">
    <nuxt-link :to="`/courses/${course.id}`">
      <v-img :src="course.image_url || ''" />
      <v-card-text>
        <h3>{{ course.name }}</h3>
        <div v-if="course.chapter_ids.length > 0">
          {{ course.chapter_ids.length }} Chapters
        </div> 
        <div v-else><br></div>
        <div>{{ decoratedCourse.numVideos }} Videos</div>
        <div><DurationDisplay :duration="decoratedCourse.duration" :verbose="true" /></div>
      </v-card-text>
    </nuxt-link>
    <!-- <v-card-actions></v-card-actions> -->
  </v-card>
</template>

<script>
  import DurationDisplay from '@/components/DurationDisplay';
  import courseDecorator from '@/utils/course-decorator';

  export default {
    components: {
      DurationDisplay
    },
    computed: {
      decoratedCourse(){
        return courseDecorator(this.course, this.$store)
      }
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