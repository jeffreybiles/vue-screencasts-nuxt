<template>
  <v-card hover style="border: 3px solid #806780; border-radius: 3px;">
    <nuxt-link :to="`/courses/${course.id}`">
      <div class="pa-1" style="background-color: #eee;">
        <h3>{{ course.name }}</h3>
      </div>
      <div class="pl-1" style="background-color: #806780; color: white;">
        <v-row>
          <v-col cols="12" sm="3" class="text-center">
            <div class="big">{{ decoratedCourse.numVideos }}</div>
            Videos
          </v-col>
          <v-col cols="12" sm="3" class="text-center">
            <DurationDisplay :duration="decoratedCourse.duration" v-slot="{hours, minutes}">
              <span v-if="hours >= 2">
                <div class="big">{{hours}}</div> HOURS
              </span>
              <span v-else>
                <div class="big">{{minutes + (hours * 60)}}</div>Minutes
              </span>
            </DurationDisplay>
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

  .big {
    font-size: 36px;
  }
</style>