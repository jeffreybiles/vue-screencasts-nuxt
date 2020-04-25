<template>
  <div v-if="showSidebar">
    <div v-if="($vuetify.breakpoint && $vuetify.breakpoint.smAndDown)">
      <div style="width:100%; position: relative; background-color: black;"
            id="video-player-with-sidenav">
        <div>
          <VideoPlayer :video="video" :autoplay="autoplay" :ended="ended" />
        </div>
      </div>
      <div>
        <CourseContentVideoNavSide :selectedVideo="video" :sortedVideos="sortedVideos" :clickAction="() => {}" />
      </div>
    </div>
    <div v-else>
      <div style="width:100%; padding-top:43%; position: relative; background-color: black;"
            id="video-player-with-sidenav">
        <div style="position: absolute; top: 0; left: 0; bottom: 0; right: 0;">
          <v-row>
            <v-col cols="9" class="pa-0 my-0">
              <VideoPlayer :video="video" :autoplay="autoplay" :ended="ended" />
            </v-col>
            <v-col cols="3" class="pa-0 ma-0">
              <CourseContentVideoNavSide :selectedVideo="video" :sortedVideos="sortedVideos" :clickAction="() => {}" />
            </v-col>
          </v-row>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <div style="width:100%; padding-top:56.25%; position: relative; background-color: black;"
          id="video-player">
      <div style="position: absolute; top: 0; left: 0; bottom: 0; right: 0;">
        <VideoPlayer :video="video" :autoplay="autoplay" :ended="ended" />
      </div>
    </div>
  </div>
</template>

<script>
  import CourseContentVideoNavSide from '@/components/CourseContentVideoNavSide.vue';
  import VideoPlayer from '@/components/VideoPlayer.vue';

  export default {
    components: {
      CourseContentVideoNavSide,
      VideoPlayer
    },
    props: {
      video: {
        type: Object,
        required: true
      },
      autoplay: {
        type: Boolean,
        default: false
      },
      ended: {
        type: Function,
        default: () => {}
      },
      sortedVideos: {
        type: Array
      },
      showSidebar: {
        type: Boolean
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
