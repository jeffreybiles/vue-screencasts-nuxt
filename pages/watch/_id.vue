<template>
  <v-container>
    <div v-if="video.pro">
      <div v-if="$auth.loggedIn && $auth.user.pro">
        <VideoWatch :video="video" :ended="ended" :autoplay="true" />
      </div>
      <div v-else class="text-center">
        <div class="display-3">
          This is a Pro video.
        </div>
        <div class="headline">
          Study Vue <font-awesome-icon icon="laptop-code" />. 
          Level Up <font-awesome-icon icon="arrow-up" />. 
          Leap Forward <font-awesome-icon icon="dollar-sign" />.
        </div>

        <div v-if="$auth.loggedIn">
          <v-btn to="/pro" color="green darken-2 grey--text text--lighten-4" class="ma-5" x-large>Go Pro</v-btn>
          <!-- TODO: replace the link with an action that actually lets them sign up on-page -->
          <!-- Then have a smaller "see more details" link below, which goes to the /pro page -->
        </div>
        <div v-else class="ma-4">
          <UserAuthTogglableForm />
        </div>  
      </div>
    </div>
    <div v-else>
      <VideoWatch :video="video" :ended="ended" :autoplay="true" />
    </div>

    <v-progress-linear v-model="percentVideosComplete" color="green" height="25">
      {{percentVideosComplete}}% done with {{course.name}}
    </v-progress-linear>
    
    <v-row>

      <v-btn text 
             @click="goToPrevious()"
             v-shortkey.once="['arrowleft']" 
             @shortkey="goToPrevious()">
        <span v-if="previousVideo">&lt; Previous</span>
        <span v-else-if="previousChapter.id">&lt;&lt; Previous <br>(part of previous chapter)</span>
        <span v-else>Go Back to Course Page</span>
      </v-btn>

      <v-spacer />

      <VideoByline :video="video" class="mt-2">
          <span class="green--text big-check" v-if="isPlayed(video.id)">
            <font-awesome-icon icon="check" /> Watched
          </span>
          <span v-else-if="$auth.loggedIn">
            <v-btn x-small
                   outlined
                   @click="markPlayed"
                   v-shortkey.once="['m']"
                   @shortkey="markPlayed">
              Mark Played
            </v-btn>
          </span>
          <span v-else>
            <UserAuthModal v-slot="{openModal}">
              <v-btn @click="openModal" x-small>
                Log In to start tracking your learning
              </v-btn>
            </UserAuthModal>
          </span>
      </VideoByline>
      <v-spacer />
      
      <v-btn text 
             @click="goToNext()" 
             v-shortkey.once="['arrowright']"
             @shortkey="goToNext()">
        <span v-if="nextVideo">Next &gt;</span>
        <span v-else-if="nextChapter.id">Next <br>(part of next chapter) &gt;&gt;</span>
        <span v-else>Explore More Courses</span>
      </v-btn>
    </v-row>

    <v-row>
      
      <v-col cols="12" md="6">
        <div class="display-1">{{video.name}}</div>
        <MarkdownDisplay :markdown="video.description" />
      </v-col>

      <v-col cols="12" md="6">
        <div v-if="course.parent_id" class="text-center">
          Chapter {{currentChapterIndex + 1}} of {{parentCourse.chapter_ids.length}} in <strong>{{parentCourse.name}}</strong>
        </div>
        <div class="text-center"><strong>{{ course.name }}</strong></div>
        
        <v-row>
          <v-btn v-if="previousChapter.id" text @click="goToChapter(previousChapter, 'first')">
            &lt;&lt; Previous Chapter
          </v-btn>
          <v-spacer />
          <v-btn v-if="nextChapter.id" text @click="goToChapter(nextChapter, 'first')">
            Next Chapter &gt;&gt;
          </v-btn>
        </v-row>
        <v-row>
          <CourseContentTable :course="course" :highlightedVideo="video" :compact="true" />
        </v-row>
      </v-col>

    </v-row>

    <VideoWatchCompleteModal :isOpen="endingScreenOpen" 
                             :close="function(){endingScreenOpen = false}"
                             :nextVideo="nextVideo"
                             :markPlayed="markPlayed"
                             :nextChapter="nextChapter"
                             :goToNextChapter="goToChapter" />

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
import UserAuthModal from '@/components/UserAuthModal.vue';
import VideoWatchCompleteModal from '@/components/VideoWatchCompleteModal.vue';
import UserAuthTogglableForm from '@/components/UserAuthTogglableForm.vue';
import {courseDecorator, sortCourse, percentVideosComplete } from '../../utils/course-decorator';

import { mapState, mapGetters } from 'vuex';
import _ from 'lodash';
import {getThumbnail} from '@/utils/video-decorator';

export default {
  data(){
    return {
      endingScreenOpen: false,
    }
  },
  components: {
    VideoByline,
    VideoWatch,
    MarkdownDisplay,
    CourseContentTable,
    UserAuthModal,
    VideoWatchCompleteModal,
    UserAuthTogglableForm
  },
  computed: {
    ...mapGetters({
      isPlayed: 'user/videoIsPlayed',
      getCourse: 'courses/get',
    }),
    ...mapState({
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
      if(this.parentCourse){
        let chapters = this.parentCourse.chapter_ids.map(c_id => this.getCourse(c_id));
        return _.sortBy(chapters, c => Number(c.order))
      } else {
        return [this.course]
      }
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
    ended(){
      if(this.$auth.loggedIn){
        this.markPlayed();
        this.endingScreenOpen = true;
      } else {
        this.endingScreenOpen = true;
      }
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
    },
    openAuthModal(){

    },

    goToPrevious(){
      if(this.previousVideo && this.previousVideo.id) {
        this.goToVideo(this.previousVideo)
      } else if (this.previousChapter && this.previousChapter.id) {
        this.goToChapter(this.previousChapter)
      } else {
        this.$router.push(`/courses/${this.course.id}`)
      }
    },
    goToNext(){
      if(this.nextVideo && this.nextVideo.id) {
        this.goToVideo(this.nextVideo)
      } else if (this.nextChapter && this.nextChapter.id) {
        this.goToChapter(this.nextChapter, 'first')
      } else {
        this.$router.push(`/courses`)
      }
    }
  },
  head(){
    let title = `${this.video.name} - VueScreencasts`
    let thumbnail = getThumbnail(this.video, this.$store).split(' ').join('+')
    let videoUrl = this.video.videoUrl
    let video = videoUrl && videoUrl.split(' ').join('+')

    return {
      title: title,
      meta: [
        {property: 'og:title', content: title},
        {property: 'og:type', content: 'video.other'},
        {property: 'og:url', content: `https://www.vuescreencasts.com/watch/${this.video.id}`},
        {property: 'og:site_name', content: "VueScreencasts.com"},
        {property: 'og:video:url', content: video},
        {property: 'og:video:secure_url', content: video},
        {property: 'og:video:type', content: 'text/html'},
        {property: 'og:video:width', content: 1280},
        {property: 'og:video:height', content: 720},
        {property: 'og:image', content: thumbnail},
        {property: 'og:image:url', content: thumbnail},
        {property: 'og:image:width', content: 1280},
        {property: 'og:image:height', content: 720},
        {property: 'og:image:type', content: "image/jpeg"},
        {name: 'twitter:image:src', property: 'twitter:image:src', content: thumbnail},
        {property: 'twitter:title', content: title},
        {property: 'og:description', content: this.video.description},
      ]
    }
  },
}
</script>

<style scoped>
  .big-check {
    font-size: 16px;
  }
</style>