<template>
  <div
    class="pro-time-left green--text text--accent-3"
    v-if="video.pro && inFreePeriod"
  >
    {{ timeLeft | formatTimeLeft }}
  </div>
</template>

<script>
  import {DAY, HOUR, MINUTE, SEVEN_DAYS} from "~/utils/consts";

    export default {
        name: "ProVideoFreePeriodCountdown",
        data(){
          return {
            timeUpdateIntervaL: null,
            currentTime: Date.now(),
          }
        },
        props: {
          video: {
            type: Object,
            default: () => ({})
          },
          selectedVideo: {
            type: Object,
            default: () => ({})
          }
        },
        mounted(){
          this.currentTime = Date.now()
          
          if(this.inFreePeriod) {
            this.timeUpdateIntervaL = setInterval(() => {
              this.currentTime = Date.now()

              let isSelectedVideo = this.video.id == this.selectedVideo.id
              if (isSelectedVideo && !this.userPro && !this.inFreePeriod) {
                window.location.reload()
              }
            }, MINUTE)
          }
        },
        beforeDestroy(){
          clearInterval(this.timeUpdateIntervaL)
        },
        filters: {
          formatTimeLeft(value) {
            const minutes = value / MINUTE
            const hours = minutes / 60
            const days = hours / 24
            if (value > DAY) {
              return `Free for ${parseInt(days)} more days`
            }
            if (value > HOUR) {
              return `Free for ${parseInt(hours)} more hours`
            }
            return `Free for ${parseInt(minutes)} more minutes`
          }
        },
        computed: {
          timeLeft() {
            return SEVEN_DAYS - (this.currentTime - this.video.published_at.getTime())
          },
          inFreePeriod(){
            return this.timeLeft > 0
          },
          userPro() {
            return this.$auth.user && this.$auth.user.pro
          }
        }
    }
</script>

<style scoped>

</style>
