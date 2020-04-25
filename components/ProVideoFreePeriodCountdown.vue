<template>
  <div
    class="pro-time-left green--text text--accent-3"
  >
    {{ timeLeft | formatTimeLeft }}
  </div>
</template>

<script>
  import {DAY, HOUR, MINUTE, SEVEN_DAYS} from "~/utils/consts";

    export default {
        name: "ProVideoFreePeriodCountdown",
        props: {
          video: {
            type: Object,
            default: () => ({})
          },
          currentTime: {
            type: Number,
            default: Date.now()
          }
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
        }
    }
</script>

<style scoped>

</style>
