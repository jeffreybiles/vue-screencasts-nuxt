<template>
  <div v-shortkey="{playPause: ['space'], faster: ['d'], slower: ['s']}"
      @shortkey="shortkeyAction">
    <div class="video-player-box"
        v-video-player:videoPlayer="playerOptions"
        @ended="videoEnded"
        @timeupdate="timeUpdate">
    </div>
  </div>
</template>

<script>
  import 'video.js/dist/video-js.css'
  import Vue from 'vue';
  import {getThumbnail} from '@/utils/video-decorator';

  if (process.browser) {
    const VueVideoPlayer = require('vue-video-player/dist/ssr')
    Vue.use(VueVideoPlayer)
  }

  export default {
    data(){
      return {
        playing: true,
        playbackRates: [0.7, 1.0, 1.5, 2.0, 2.5, 3.0]
      }
    },
    mounted() {
      const SAVED_PLAYBACK_RATE = localStorage.getItem('savedPlaybackRate')
      if (SAVED_PLAYBACK_RATE) {
        this.videoPlayer.playbackRate(SAVED_PLAYBACK_RATE)
      }

      let currentTime = localStorage.getItem(this.currentTimeKey)
      this.videoPlayer.currentTime(currentTime)
    },
    beforeDestroy(){
      this.videoPlayer.pause();
    },
    computed: {
      thumbnail(){
        return getThumbnail(this.video, this.$store)
      },
      playerOptions(){
        return {
          language: 'en',
          playbackRates: this.playbackRates,
          sources: [{
            type: "video/mp4",
            src: this.video.videoUrl
          }],
          poster: this.thumbnail,
          fluid: true,
          autoplay: this.autoplay
        }
      },
      currentTimeKey(){
        return `video-${this.video.id}-current-time`
      }
    },
    methods: {
      shortkeyAction(event){
        if(event.srcKey == 'playPause') {
          this.playPause();
        } else {
          let increaseSpeed = event.srcKey == 'faster'
          this.changeSpeed(increaseSpeed)
        }
      },
      playPause(){
        if(this.playing) {
          this.videoPlayer.pause();
          this.playing = false;
        } else {
          this.videoPlayer.play();
          this.playing = true;
        }
      },
      changeSpeed(increaseSpeed = true) {
        let speed = this.videoPlayer.playbackRate()
        if(increaseSpeed) {
          speed += 0.25
          if(speed > 4) speed = 4
        } else {
          speed -= 0.25
          if(speed < 0.5) speed = 0.5
        }
        const PLAYBACK_RATE = Math.round(speed * 100)/100
        localStorage.setItem('savedPlaybackRate', PLAYBACK_RATE)
        this.videoPlayer.playbackRate(PLAYBACK_RATE)
      },
      timeUpdate(){
        localStorage.setItem(this.currentTimeKey, this.videoPlayer.currentTime())
      },
      videoEnded(){
        localStorage.setItem(this.currentTimeKey, 0)

        this.ended()
      }
    },
    props: {
      video: {
        type: Object,
        required: true
      },
      autoplay: {
        type: Boolean
      },
      ended: {
        type: Function
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>