<template>
  <v-container>
    <v-row>
      <v-col md="9" cols="12">
        <VideoWatch :video="video" />
        <v-row class="">

          <v-btn text @click="goToVideo(previousVideo)" v-if="previousVideo">
            < Previous
          </v-btn>
          <v-btn text @click="goToChapter(previousChapter)" v-else-if="previousChapter.id">
            << Previous (part of previous chapter)
          </v-btn>
          <v-btn text :to="`/courses/${course.id}`" v-else>
            Go Back to Course Page
          </v-btn>

          <v-spacer />
          
          <v-btn text @click="goToVideo(nextVideo)" v-if="nextVideo">
            Next >
          </v-btn>
          <v-btn text @click="goToChapter(nextChapter, 'first')" v-else-if="nextChapter.id">
            Next (part of next chapter) >>
          </v-btn>
          <v-btn text :to="`/courses`" v-else>
            Explore More Courses
          </v-btn>

        </v-row>
      </v-col>
      <v-col md="3" cols="12">
        <div class="display-1">{{video.name}}</div>
        <VideoByline :video="video" />
        <div class="green--text" v-if="isPlayed(video.id)">
          <font-awesome-icon icon="check" /> 
          Played
        </div>
        <div v-else>
          <v-btn x-small @click="markPlayed" v-if="$auth.loggedIn">
            Mark Played
          </v-btn>
        </div>

        <MarkdownDisplay :markdown="video.description" />
        
        <span v-for="tag_id in video.tag_ids" :key="tag_id">
          <v-btn color="green lighten-2"
                 :to="`/tags/${tag_id}`"
                 class="mr-1 mb-2">
            {{ getTag(tag_id).name }}
          </v-btn>
        </span>
      </v-col>
    </v-row>
    <!-- <v-row>
      <v-col cols="12">
        <h1>Code Summary</h1>
        <MarkdownDisplay :markdown="video.code_summary" />
      </v-col>
    </v-row> -->
    <v-row>
      <div v-if="previousChapter.id" @click="goToChapter(previousChapter, 'first')" class="clickable">
        << Previous Chapter
      </div>

      <v-spacer />
      <h3>More in this course</h3>
      <v-spacer />

      <div v-if="nextChapter.id" @click="goToChapter(nextChapter, 'first')" class="clickable">
        Next Chapter >>
      </div>

    </v-row>
    <v-row>
      <CourseContentTable :course="course" :highlightedVideo="video" />
    </v-row>
  </v-container>
</template>

<script>
import VideoByline from '@/components/VideoByline';
import VideoWatch from '@/components/VideoWatch';
import MarkdownDisplay from '@/components/MarkdownDisplay';
import CourseContentTable from '@/components/CourseContentTable.vue';
import courseDecorator, {sortCourse} from '../../utils/course-decorator';

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
    nextChapter(){ return this.sortedChapters[this.currentChapterIndex + 1] },

    sortedVideos() { return _.sortBy(this.course.videos, v => Number(v.order)) },
    currentIndex(){ return this.sortedVideos.findIndex(v => v.id == this.video.id); },
    nextVideo(){ return this.sortedVideos[this.currentIndex + 1]; },
    previousVideo(){ return this.sortedVideos[this.currentIndex - 1]; },
    seriesType(){ return this.$route.query.seriesType}
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

<style>
</style>