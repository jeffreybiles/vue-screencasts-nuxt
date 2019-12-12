<template>
  <v-container>
    <v-row>
      <v-col>
        <VideoWatch :video="video" />
        <v-progress-linear v-model="percentVideosComplete" color="green" height="25">
          {{percentVideosComplete}}% done with {{course.name}}
        </v-progress-linear>
        
        <v-row class="">

          <v-btn text @click="goToVideo(previousVideo)" v-if="previousVideo">
            < Previous
          </v-btn>
          <v-btn text @click="goToChapter(previousChapter)" v-else-if="previousChapter.id">
            << Previous <br>(part of previous chapter)
          </v-btn>
          <v-btn text :to="`/courses/${course.id}`" v-else>
            Go Back to Course Page
          </v-btn>

          <v-spacer />

          <VideoByline :video="video" class="mt-2">
              <span class="green--text big-check" v-if="isPlayed(video.id)">
                <font-awesome-icon icon="check" /> Watched
              </span>
              <span v-else>
                <v-btn x-small @click="markPlayed" v-if="$auth.loggedIn">
                  Mark Played
                </v-btn>
              </span>
          </VideoByline>
          <v-spacer />
          
          <v-btn text @click="goToVideo(nextVideo)" v-if="nextVideo">
            Next >
          </v-btn>
          <v-btn text @click="goToChapter(nextChapter, 'first')" v-else-if="nextChapter.id">
            Next <br>(part of next chapter) >>
          </v-btn>
          <v-btn text :to="`/courses`" v-else>
            Explore More Courses
          </v-btn>

        </v-row>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="6">
        <div class="display-1">{{video.name}}</div>

        <MarkdownDisplay :markdown="video.description" />
        
        <span v-for="tag_id in video.tag_ids" :key="tag_id">
          <v-btn color="green lighten-2"
                 :to="`/tags/${tag_id}`"
                 class="mr-1 mb-2">
            {{ getTag(tag_id).name }}
          </v-btn>
        </span>
      </v-col>
      <v-col cols="12" md="6">
        <div v-if="course.parent_id" class="text-center">
          Chapter {{currentChapterIndex + 1}} of {{parentCourse.chapter_ids.length}} in <strong>{{parentCourse.name}}</strong>
        </div>
        <div class="text-center"><strong>{{ course.name }}</strong></div>
        
        <v-row>
          <v-btn v-if="previousChapter.id" text @click="goToChapter(previousChapter, 'first')">
            << Previous Chapter
          </v-btn>
          <v-spacer />
          <v-btn v-if="nextChapter.id" text @click="goToChapter(nextChapter, 'first')">
            Next Chapter >>
          </v-btn>
        </v-row>
        <v-row>
          <CourseContentTable :course="course" :highlightedVideo="video" />
        </v-row>
      </v-col>
    </v-row>

    <!-- Probably put this in a tab -->
    <!-- tabs: general, code, and transcript... but only show a tab if it has something available for it -->
    <!-- <v-row>
      <v-col cols="12">
        <h1>Code Summary</h1>
        <MarkdownDisplay :markdown="video.code_summary" />
      </v-col>
    </v-row> -->

  </v-container>
</template>

<script>
import VideoByline from '@/components/VideoByline';
import VideoWatch from '@/components/VideoWatch';
import MarkdownDisplay from '@/components/MarkdownDisplay';
import CourseContentTable from '@/components/CourseContentTable.vue';
import {courseDecorator, sortCourse, percentVideosComplete } from '../../utils/course-decorator';

import { mapState, mapGetters } from 'vuex';
import _ from 'lodash';

export default {
  components: {
    VideoByline,
    VideoWatch,
    MarkdownDisplay,
    CourseContentTable,
  },
  computed: {
    ...mapGetters({
      isPlayed: 'user/videoIsPlayed',
      getCourse: 'courses/get',
    }),
    ...mapState({
      tags: state => state.tags.tags,
      videos: state => state.videos.videos,
    }),
    video(){
      return this.videos.find(v => v.id == this.$route.params.id)
    },
    course(){
      let course = this.getCourse(this.video.course_id)
      return courseDecorator(course, this.$store)
    },

    parentCourse() { return this.getCourse(this.course.parent_id) },
    sortedChapters() { 
      let chapters = this.parentCourse.chapter_ids.map(c_id => this.getCourse(c_id));
      return _.sortBy(chapters, c => Number(c.order))
    },
    currentChapterIndex(){ return this.sortedChapters.findIndex(c => c.id == this.course.id) },
    previousChapter(){ return sortCourse(this.sortedChapters[this.currentChapterIndex - 1], this.$store) },
    nextChapter(){ return sortCourse(this.sortedChapters[this.currentChapterIndex + 1], this.$store) },

    sortedVideos() { return _.sortBy(this.course.videos, v => Number(v.order)) },
    currentIndex(){ return this.sortedVideos.findIndex(v => v.id == this.video.id); },
    nextVideo(){ return this.sortedVideos[this.currentIndex + 1]; },
    previousVideo(){ return this.sortedVideos[this.currentIndex - 1]; },
    seriesType(){ return this.$route.query.seriesType},

    percentVideosComplete(){ return percentVideosComplete(this.course.videos, this.$store) }
  },
  methods: {
    getTag(tagId) {
      return this.tags.find(t => t.id == tagId);
    },
    markPlayed(){
      this.$store.dispatch('user/markVideoPlayed', this.video.id)
    },
    goToVideo(video){
      this.$router.push(`/watch/${video.id}`)
    },
    goToChapter(chapter, firstOrLastVideo){
      let { sortedItems } = sortCourse(chapter, this.$store)
      let video;
      if(firstOrLastVideo == 'first') {
        video = sortedItems[0]
      } else {
        video = sortedItems[sortedItems.length - 1]
      }
      this.$router.push(`/watch/${video.id}`)
    }
  }
}
</script>

<style scoped>
  .big-check {
    font-size: 16px;
  }
</style>