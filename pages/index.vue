<template>
  <div class="home">
    <div class="display-4 ma-4 d-flex justify-center">
      All Videos
    </div>
    
    <VideoTable :videos="videos" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import VideoTable from '@/components/VideoTable'

export default {
  components: {
    VideoTable
  },
  computed: {
    ...mapState({
      videos: state => state.videos.videos
    }),
  }
}
</script>

<style>
</style>
