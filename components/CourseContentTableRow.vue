<template>
  <div>
    <span v-if="isCourse">
      <div class="course-content-chapter">
        <v-expansion-panel-header>
          <v-row>
            <v-col cols="8"><h2>{{decoratedCourse.name}}</h2></v-col>
            <v-col cols="1">
              {{ finishedVideos.length }} / {{decoratedCourse.numVideos}}
            </v-col>
            <v-col cols="1"><DurationDisplay :duration="decoratedCourse.duration" /></v-col>
            <v-col cols="2">
              <!-- TODO: actually get the most recently published video -->
              <DateDisplay :date="sortedVideos[0] && sortedVideos[0].published_at" />
            </v-col>
          </v-row>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <div v-for="video in sortedVideos" :key="video.id">
            <course-content-table-row :courseItem="video" :isAdminScreen="isAdminScreen" />
          </div>
        </v-expansion-panel-content>
      </div>
    </span>
    <span v-else>
      <v-row class="course-content-video">
        <v-col cols="8">&nbsp; {{courseItem.name}}</v-col>
        <v-col cols="1">
          <div v-if="isAdminScreen">
            <!-- IF in admin mode, have up or down arrows -->
            {{courseItem.order}}
          </div>
          <div v-else>
            <div v-if="isPlayed(courseItem.id)">
              <!-- ELSE have played checkmark -->
              Played
            </div>
          </div>
        </v-col>
        <v-col cols="1"><DurationDisplay :duration="courseItem.duration" /></v-col>
        <v-col cols="2"><DateDisplay :date="courseItem.published_at" /></v-col>
      </v-row>
    </span>
  </div>
</template>

<script>
  import CourseContentTableRow from '@/components/CourseContentTableRow';
  import courseDecorator from '@/utils/course-decorator';
  import DurationDisplay from '@/components/DurationDisplay.vue';
  import DateDisplay from '@/components/DateDisplay.vue';
  import { mapGetters } from 'vuex';
  import _ from 'lodash';

  export default {
    name: 'course-content-table-row',
    components: {
      CourseContentTableRow,
      DurationDisplay,
      DateDisplay
    },
    computed: {
      isCourse() { return !!this.courseItem.chapter_ids },
      decoratedCourse() { return courseDecorator(this.courseItem, this.$store)},
      ...mapGetters({
        isPlayed: 'user/videoIsPlayed'
      }),
      finishedVideos() {
        return this.decoratedCourse.videos.filter(v => this.isPlayed(v.id))
      },
      sortedVideos(){
        return _.sortBy(this.decoratedCourse.videos, 'order')
      }
    },
    props: {
      courseItem: {
        type: Object,
        required: true
      },
      isAdminScreen: {
        type: Boolean,
        default: false
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>