<template>
  <div ref="scrollBox" class="scroll-box" :style="`height: ${height}px;`">
    <div v-for="video in sortedVideos"
         :ref="`video-${video.id}`"
         :key="video.id"
         :class="['pa-3', 'video-row', 'white-text', video.id == selectedVideo.id ? 'active' : '']"
         @click="goToVideo(video)">
      <v-row class="pa-0 ma-0">
        <v-col cols="12" md="8" class="py-0">
          <div class="subheader video-title">{{video.name}}</div>
          <ProVideoFreePeriodCountdown v-if="video.pro && proVideoInFreePeriod(video) && userNotPro" :video="video" :current-time="currentTime" />
        </v-col>
        <v-col cols="12" md="4" class="py-0">
          <div>
            <span class="icon-column"><ProMarker :isFree="!video.pro" :video="video" /></span>
            <span class="icon-column"><font-awesome-icon icon="check" v-if="isPlayed(video.id)" /></span>
            <DurationDisplay :duration="video.duration" />
          </div>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import ProMarker from '@/components/ProMarker.vue';
  import DurationDisplay from '@/components/DurationDisplay.vue';
  import { MINUTE, SEVEN_DAYS } from "~/utils/consts";
  import ProVideoFreePeriodCountdown from "~/components/ProVideoFreePeriodCountdown";
  export default {
    data(){
      return {
        timeUpdateIntervaL: null,
        currentTime: Date.now(),
        height: 100
      }
    },
    components: {
      ProVideoFreePeriodCountdown,
      ProMarker,
      DurationDisplay
    },
    props: {
      sortedVideos: {
        type: Array,
        required: true
      },
      selectedVideo: {
        type: Object,
        required: true
      },
      clickAction: {
        type: Function,
        required: true
      },
    },
    mounted(){
      this.calculateHeight();
      window.addEventListener("resize", this.calculateHeight);
      this.scrollToCurrentVideo();
      this.timeUpdateIntervaL = setInterval(() => {
        this.currentTime = Date.now()
        if (this.userNotPro && this.selectedVideo.pro && !this.proVideoInFreePeriod(this.selectedVideo)) {
          window.location.reload()
        }
      }, MINUTE)
    },
    destroyed(){
      window.removeEventListener("resize", this.calculateHeight);
      clearInterval(this.timeUpdateIntervaL)
    },
    methods: {
      proVideoInFreePeriod(video) {
        return SEVEN_DAYS - (this.currentTime - video.published_at.getTime()) > 0
      },
      scrollToCurrentVideo() {
        const selectedVideoTopOffset = this.$refs[`video-${this.selectedVideo.id}`][0].offsetTop
        const currentScrollPosition = this.$refs.scrollBox.scrollTop
        const videoListItemHeight = 72
        if (selectedVideoTopOffset > this.height + currentScrollPosition) {
          this.$refs.scrollBox.scrollTop = selectedVideoTopOffset - (this.height / 2) + videoListItemHeight
        }
      },
      calculateHeight(){
        this.height = document.getElementById('video-player-with-sidenav').clientHeight
      },
      goToVideo(video){
        this.$router.push(`/watch/${video.id}`)
      }
    },
    computed: {
      ...mapGetters({
        isPlayed: 'user/videoIsPlayed',
      }),
      userNotPro() {
        return !this.$auth.user || !this.$auth.user.pro
      }
    }
  }
</script>

<style lang="scss" scoped>
  .pro-time-left {
    font-size: 0.8em;
  }
  .video-row:hover, .video-row.active {
    .pro-time-left {
      color: #fff !important;
    }
  }
  .scroll-box {
    overflow-y: auto;
    background-color: #111;
  }
  .icon-column {
    width: 20px;
    display: inline-block;
  }
  .white-text {
    color: #EEE;
  }
  .video-row {
    cursor: pointer;

    &:nth-of-type(2n) {
      background-color: #222;
    }

    &.active, &:hover {
      color: black !important;
      background-color: #4BAF51;
    }
  }
</style>
