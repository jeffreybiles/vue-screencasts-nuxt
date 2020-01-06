<template>
  <div>
    <nuxt-link :to="`/courses/${course.id}`">
      
      <!-- TODO: make this more stylish -->
      <span v-if="showFreeStatus">
        <span v-if="decoratedCourse.numProVideos == 0">
          100% Free!
        </span>
        <span v-else-if="decoratedCourse.numProVideos < decoratedCourse.numVideos">
          Includes a free video!
        </span>
        <span v-else>
          Pro Course
        </span>
      </span>
      
      <v-card hover>
        <div class="pl-1 course-card">
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
                  <div class="big">{{Number(minutes) + (hours * 60)}}</div>Minutes
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
        <h3 class="title">
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
      },
      showFreeStatus: {
        type: Boolean,
        default: true
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

  .course-card {
     background-color: #806780; 
     color: white;
  }

  @media (min-width: 960px) and (max-width: 1264px) {
    .course-card {
      font-size: 13px;
    }

    .big {
      font-size: 28px;
    }
  }
</style>