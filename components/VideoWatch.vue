<template>
  <div style="width:100%; padding-top:56.25%; position: relative; background-color: black;"
       v-shortkey="['space']"
       @shortkey="playPause">
    <div style="position: absolute; top: 0; left: 0; bottom: 0; right: 0;">
      <div class="video-player-box"
           v-video-player:videoPlayer="playerOptions"
           @ended="ended">
      </div>
    </div>
  </div>
</template>

<script>
  import 'video.js/dist/video-js.css'
  import Vue from 'vue';

  if (process.browser) {
    const VueVideoPlayer = require('vue-video-player/dist/ssr')
    Vue.use(VueVideoPlayer)
  }

  import {getThumbnail} from '@/utils/video-decorator';

  export default {
    data(){
      return {playing: true}
    },
    computed: {
      thumbnail(){
        return getThumbnail(this.video, this.$store)
      },
      playerOptions(){
        return {
          language: 'en',
          playbackRates: [0.7, 1.0, 1.5, 2.0, 2.5, 3.0],
          sources: [{
            type: "video/mp4",
            src: this.video.videoUrl
          }],
          poster: this.thumbnail,
          fluid: true,
          autoplay: this.autoplay
        }
      }
    },
    methods: {
      playPause(){
        if(this.playing) {
          this.videoPlayer.pause();
          this.playing = false;
        } else {
          this.videoPlayer.play();
          this.playing = true;
        }
      }
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
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>