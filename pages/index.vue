<template>
  <div class="home">
    <div class="display-4 ma-4 d-flex justify-center">
      All Videos
    </div>

    <div class="d-flex flex-wrap">
      <div v-for="video in videos" :key="video.name">
        <VideoListVideo :video="video" :tags="tags"></VideoListVideo>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import VideoListVideo from '../components/VideoListVideo'
export default {
  components: {
    VideoListVideo
  },
  computed: {
    ...mapState(['tags', 'videos'])
  }
}
</script>

<style>
</style>
