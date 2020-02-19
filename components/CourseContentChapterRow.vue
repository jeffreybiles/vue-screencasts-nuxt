<template>
  <div>
    <div class="course-content-chapter" :style="{height: '100%', 'background': `linear-gradient(90deg, #99CC99 ${percentVideoComplete}%, transparent ${percentVideoComplete}%)`}">
      <v-expansion-panel-header>
        <v-row>
          <v-col sm="7" cols="12" class="pl-0"><h2>{{decoratedCourse.name}}</h2></v-col>
          <v-col sm="1" cols="0">
            <v-btn small v-if="isAdminScreen" @click="detachChapter" class="clickable" >
              Detach
            </v-btn>
          </v-col>
          <v-col sm="1" cols="4">
            <div v-if="isAdminScreen">
              <font-awesome-icon icon="arrow-up" @click.stop="moveEarlier" class="clickable" />
              <font-awesome-icon icon="arrow-down" @click.stop="moveLater" class="clickable" />
              {{decoratedCourse.order}}
            </div>
            <div v-else>            
              {{ finishedVideos.length }} / {{decoratedCourse.numVideos}}
            </div>
          </v-col>
          <v-col sm="1" cols="4"><DurationDisplay :duration="decoratedCourse.duration" /></v-col>
          <v-col sm="2" cols="4">
            <DateDisplay :date="mostRecentVideo && mostRecentVideo.published_at" />
          </v-col>
        </v-row>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <div v-for="video in sortedVideos" :key="video.id">
          <CourseContentVideoRow :video="video" :isAdminScreen="isAdminScreen" :clickAction="videoClickAction" :highlightedVideo="highlightedVideo"/>
        </div>
      </v-expansion-panel-content>
    </div>
  </div>
</template>

<script>
  import courseDecorator, { percentVideosComplete } from '@/utils/course-decorator';
  import CourseContentVideoRow from '@/components/CourseContentVideoRow';
  import DurationDisplay from '@/components/DurationDisplay.vue';
  import DateDisplay from '@/components/DateDisplay.vue';
  import { mapGetters } from 'vuex';
  import _ from 'lodash';
  import { percentVideoComplete } from '@/utils/course-decorator';

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
        return this.decoratedCourse.mostRecentVideo;
      },
      percentVideoComplete(){
        return percentVideosComplete(this.decoratedCourse.videos, this.$store)
      },
    },
    methods: {
      async detachChapter(){
        this.$store.dispatch('courses/detachChapter', {chapter: this.chapter, course: this.course})
      },
      moveEarlier(){
        this.updateOrder(-1, 0)
      },
      moveLater(){
        this.updateOrder(1, this.course.sortedItems.length - 1)
      },
      // intDirection must be 1 or -1
      updateOrder(intDirection, edge){
        this.$store.dispatch('courses/updateOrder', {item: this.chapter, intDirection, edge, course: this.course, itemPath: 'courses'})
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
      },
      course: {
        type: Object
      },
      videoClickAction: {
        type: Function,
        required: true
      },
      highlightedVideo: {
        type: Object
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>