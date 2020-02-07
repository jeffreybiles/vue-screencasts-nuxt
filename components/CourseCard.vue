<template>
  <div>
    <nuxt-link :to="`/courses/${course.id}`">      
      <v-card hover>
        <div class="pl-0 course-card grey darken-2">
          <v-row>
            <v-col cols="8" class="pb-0 pt-0 pr-0">
              <v-img :src="course.image_url || ''" />
            </v-col>
            <v-col cols="4" class="text-center pl-0 pt-0 pb-0">
              <div class="stripe grey darken-2">
                {{ decoratedCourse.numVideos }} Videos
              </div>

              <div class="stripe grey darken-1">
                <DurationDisplay :duration="decoratedCourse.duration" v-slot="{hours, minutes}">
                  <span v-if="hours >= 2">
                    {{hours}} HOURS
                  </span>
                  <span v-else>
                    {{Number(minutes) + (hours * 60)}} Minutes
                  </span>
                </DurationDisplay>
              </div>

              <div class="stripe grey darken-2">
                <DifficultyBars :difficulty="course.difficulty" verbosity="medium" color="lightgreen" />
              </div>

              <div class="stripe grey darken-1">
                {{ course.category }}
              </div>

              <div class="stripe grey darken-2">
                <span v-if="showFreeStatus">
                  <span v-if="decoratedCourse.numProVideos == 0">
                    100% Free!
                  </span>
                  <span v-else-if="isFreePeriod">
                    Free Period (watch now)
                  </span>
                  <span v-else-if="decoratedCourse.numProVideos < decoratedCourse.numVideos">
                    One free video!
                  </span>
                  <span v-else>
                    Pro Course
                  </span>
                </span>
              </div>
            </v-col>
          </v-row>
        </div>
        <ProgressBar :videos="decoratedCourse.videos" />
      </v-card>

      <div class="pt-1">
        <h3 class="title">
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
      isFreePeriod(){
        var dateOffset = (24*60*60*1000) * 7;
        var published_time = new Date(this.decoratedCourse.published_at)
        var current_time =  new Date(Date.now())
        return published_time.getTime() + dateOffset > current_time.getTime();
      }
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

  .stripe {
    padding: 2px;
    margin: 0px;
    font-size: 11px;
  }

  .course-card {
    color: white;
  }

  @media (min-width: 960px) and (max-width: 1264px) {
    .course-card {
      font-size: 13px;
    }

  }
</style>