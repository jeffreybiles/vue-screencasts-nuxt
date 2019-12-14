<template>
  <div>
    <nuxt-link :to="`/courses/${course.id}`">
      <v-card hover>
        <div class="pl-1" style="background-color: #806780; color: white;">
          <v-row>
            <v-col cols="3" class="text-center">
              <div class="big">{{ decoratedCourse.numVideos }}</div>
              Videos
            </v-col>
            <v-col cols="3" class="text-center">
              <DurationDisplay :duration="decoratedCourse.duration" v-slot="{hours, minutes}">
                <span v-if="hours >= 2">
                  <div class="big">{{hours}}</div> HOURS
                </span>
                <span v-else>
                  <div class="big">{{minutes + (hours * 60)}}</div>Minutes
                </span>
              </DurationDisplay>
            </v-col>
            <v-col cols="6" class="pb-0 pt-0 pl-0">
              <v-img :src="course.image_url || ''" />
            </v-col>
          </v-row>
        </div>
        <ProgressBar :videos="decoratedCourse.videos" />
      </v-card>

      <div class="pt-1">
        <h3>
          <DifficultyBars :difficulty="course.difficulty" />
          {{ course.name }}  
        </h3>
      </div>
    </nuxt-link>
  </div>
    <!-- <v-card-actions></v-card-actions> -->
</template>

<script>
  import DurationDisplay from '@/components/DurationDisplay';
  import { courseDecorator } from '@/utils/course-decorator';
  import ProgressBar from '@/components/ProgressBar.vue';
  import DifficultyBars from '@/components/DifficultyBars.vue';

  export default {
    components: {
      DurationDisplay,
      ProgressBar,
      DifficultyBars
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