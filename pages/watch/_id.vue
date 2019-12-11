<template>
  <v-container>
    <v-row>
      <v-col md="9" cols="12">
        <VideoWatch :video="video" />
        <v-row class="ma-2">
          <v-btn text @click="goToPreviousVideo">
            < Previous
          </v-btn>
          <v-spacer />
          <v-btn text @click="goToNextVideo">
            Next >
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
      <h3>More in this course</h3>
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
    nearbyVideos(){
      let videos = _.sortBy(this.course.videos, 'order')
      let currentIndex = videos.indexOf(this.video);
      let previousVideo = videos[currentIndex - 1];
      let nextVideo = videos[currentIndex + 1];
      
      return {
        nextVideo,
        previousVideo
      }
    }
  },
  methods: {
    getTag(tagId) {
      return this.tags.find(t => t.id == tagId);
    },
    markPlayed(){
      this.$store.dispatch('user/markVideoPlayed', this.video.id)
    },
    goToNextVideo(){
      this.$router.push(`/watch/${this.nearbyVideos.nextVideo.id}`)
    },
    goToPreviousVideo(){
      this.$router.push(`/watch/${this.nearbyVideos.previousVideo.id}`)
    }
  }
}
</script>

<style>
</style>