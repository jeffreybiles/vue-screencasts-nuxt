<template>
  <div class="video-player-box"
       v-video-player:videoPlayer="playerOptions">
                <!-- @ended="markPlayed" -->
  </div>
</template>

<script>
  import 'video.js/dist/video-js.css'
  import Vue from 'vue';

  if (process.browser) {
    const VueVideoPlayer = require('vue-video-player/dist/ssr')
    Vue.use(VueVideoPlayer)
  }

  export default {
    computed: {
      playerOptions(){
        return {
          language: 'en',
          playbackRates: [0.7, 1.0, 1.5, 2.0, 2.5, 3.0],
          sources: [{
            type: "video/mp4",
            src: this.video.videoUrl
          }],
          poster: this.video.thumbnail,
          fluid: true
        }
      }
    },
    props: ['video']
  }
</script>

<style lang="scss" scoped>

</style>