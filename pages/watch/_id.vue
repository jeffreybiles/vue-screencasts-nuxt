<template>
  <div>
    <div v-if="video.pro">
      <div v-if="$auth.loggedIn && $auth.user.pro">
        <VideoWatch :video="video" :ended="ended" :autoplay="true" :sortedVideos="sortedVideos" :showSidebar="true" />
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
      <VideoWatch :video="video" :ended="ended" :autoplay="true" :sortedVideos="sortedVideos" :showSidebar="true" />
    </div>

    <v-progress-linear v-model="percentVideosComplete" color="green" height="25">
      {{percentVideosComplete}}% done with {{course.name}}
    </v-progress-linear>
    <v-container>
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
        <v-btn v-if="previousChapter.id" text @click="goToChapter(previousChapter, 'first')">
          &lt;&lt; Previous Chapter
        </v-btn>
        <v-spacer />
        <div v-if="course.parent_id" class="text-center">
          Chapter {{currentChapterIndex + 1}} of {{parentCourse.chapter_ids.length}} in <strong>{{parentCourse.name}}</strong>
        </div>
        <v-spacer />
        <v-btn v-if="nextChapter.id" text @click="goToChapter(nextChapter, 'first')">
          Next Chapter &gt;&gt;
        </v-btn>
      </v-row>

      <div>
        <div class="display-1">{{video.name}}</div>
        <MarkdownDisplay :markdown="video.description" />
      </div>

      <div class="text-center pt-4">
        <div class="display-1">What do others think?</div>
        <TestimonialsRow :testimonialIds="randomTestimonialIds" />
        <v-btn color="green accent-3" to="/#pricing">Take your career to the next level</v-btn>
      </div>

      <VideoWatchCompleteModal :isOpen="endingScreenOpen" 
                              :close="function(){endingScreenOpen = false}"
                              :nextVideo="nextVideo"
                              :markPlayed="markPlayed"
                              :nextChapter="nextChapter"
                              :goToNextChapter="goToChapter" />


    </v-container>
  </div>
</template>

<script>
import VideoByline from '@/components/VideoByline';
import VideoWatch from '@/components/VideoWatch';
import MarkdownDisplay from '@/components/MarkdownDisplay';
import UserAuthModal from '@/components/UserAuthModal.vue';
import VideoWatchCompleteModal from '@/components/VideoWatchCompleteModal.vue';
import UserAuthTogglableForm from '@/components/UserAuthTogglableForm.vue';
import TestimonialsRow from '@/components/TestimonialsRow.vue';
import {courseDecorator, sortCourse, percentVideosComplete } from '../../utils/course-decorator';
import socialProofJson from '@/utils/social-proof-data.json';


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
    UserAuthModal,
    VideoWatchCompleteModal,
    UserAuthTogglableForm,
    TestimonialsRow
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

    percentVideosComplete(){ return percentVideosComplete(this.course.videos, this.$store) },

    randomTestimonialIds(){
      let allTestimonials = socialProofJson.testimonials;

      return [
          Math.floor(Math.random() * allTestimonials.length),
          Math.floor(Math.random() * allTestimonials.length),
          Math.floor(Math.random() * allTestimonials.length),
          Math.floor(Math.random() * allTestimonials.length),
        ]
    },
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
        {hid: 'description', property: 'description', content: this.video.description},
        {hid: 'og-description', property: 'og:description', content: this.video.description},
        {hid: 'twitter-description', property: 'twitter:description', content: this.video.description},
        {hid: 'og-title', property: 'og:title', content: title},
        {hid: 'twitter-title', property: 'twitter:title', content: title},
        {hid: 'og-type', property: 'og:type', content: 'video.other'},
        {hid: 'og-url', property: 'og:url', content: `https://www.vuescreencasts.com/watch/${this.video.id}`},
        {hid: 'og-site-name', property: 'og:site_name', content: "VueScreencasts.com"},
        {property: 'og:video:url', content: video},
        {property: 'og:video:secure_url', content: video},
        {property: 'og:video:type', content: 'text/html'},
        {property: 'og:video:width', content: 1280},
        {property: 'og:video:height', content: 720},
        {hid: 'og-image', property: 'og:image', content: thumbnail},
        {hid: 'og-image-url', property: 'og:image:url', content: thumbnail},
        {hid: 'og-image-width', property: 'og:image:width', content: 1280},
        {hid: 'og-image-height', property: 'og:image:height', content: 720},
        {hid: 'og-image-type', property: 'og:image:type', content: "image/jpeg"},
        {hid: 'twitter-img-src', name: 'twitter:image:src', property: 'twitter:image:src', content: thumbnail},
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