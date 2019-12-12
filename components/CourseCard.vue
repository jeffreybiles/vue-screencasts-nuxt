<template>
  <v-card hover>
    <nuxt-link :to="`/courses/${course.id}`">
      <div class="pa-1">
        <h3>{{ course.name }}</h3>
      </div>
      <div class="pl-1">
        <v-row>
          <v-col cols="12" sm="6">
            <div v-if="course.chapter_ids.length > 0">
              {{ course.chapter_ids.length }} Chapters
            </div> 
            <div v-else><br></div>
            <div>{{ decoratedCourse.numVideos }} Videos</div>
            <div><DurationDisplay :duration="decoratedCourse.duration" :verbose="true" /></div>
          </v-col>
          <v-col cols="12" sm="6" class="pb-0 pt-0 pl-0">
            <v-img :src="course.image_url || ''" />
          </v-col>
        </v-row>
      </div>
      <ProgressBar :videos="decoratedCourse.videos" />
    </nuxt-link>
  </v-card>
    <!-- <v-card-actions></v-card-actions> -->
</template>

<script>
  import DurationDisplay from '@/components/DurationDisplay';
  import { courseDecorator } from '@/utils/course-decorator';
  import ProgressBar from '@/components/ProgressBar.vue';

  export default {
    components: {
      DurationDisplay,
      ProgressBar
    },
    computed: {
      decoratedCourse(){
        return courseDecorator(this.course, this.$store)
      },
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