<template>
  <div>
    <div class="course-content-chapter">
        <v-expansion-panel-header>
          <v-row>
            <v-col cols="8"><h2>{{decoratedCourse.name}}</h2></v-col>
            <v-col cols="1">
              {{ finishedVideos.length }} / {{decoratedCourse.numVideos}}
            </v-col>
            <v-col cols="1"><DurationDisplay :duration="decoratedCourse.duration" /></v-col>
            <v-col cols="2">
              <DateDisplay :date="mostRecentVideo && mostRecentVideo.published_at" />
            </v-col>
          </v-row>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <div v-for="video in sortedVideos" :key="video.id">
            <CourseContentVideoRow :video="video" :isAdminScreen="isAdminScreen" />
          </div>
        </v-expansion-panel-content>
      </div>
  </div>
</template>

<script>
  import courseDecorator from '@/utils/course-decorator';
  import CourseContentVideoRow from '@/components/CourseContentVideoRow';
  import DurationDisplay from '@/components/DurationDisplay.vue';
  import DateDisplay from '@/components/DateDisplay.vue';
  import { mapGetters } from 'vuex';
  import _ from 'lodash';

  export default {
    components: {
      CourseContentVideoRow,
      DurationDisplay,
      DateDisplay
    },

    computed: {
      ...mapGetters({
        isPlayed: 'user/videoIsPlayed'
      }),
      decoratedCourse() { return courseDecorator(this.chapter, this.$store)},
      sortedVideos(){
        return this.decoratedCourse.videos.sort((i, j) => {
          return (Number(i.order) > Number(j.order)) ? 1 : -1
        })
      },
      finishedVideos() {
        return this.decoratedCourse.videos.filter(v => this.isPlayed(v.id))
      },

      mostRecentVideo(){
        return _.sortBy(this.decoratedCourse.videos, 'published_at').reverse()[0]
      }
    },
    props: {
      chapter: {
        type: Object,
        required: true
      },
      isAdminScreen: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>