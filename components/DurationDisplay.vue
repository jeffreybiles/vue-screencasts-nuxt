<template>
  <span>
    <span v-if="hours">{{hours}}:</span>{{ minutes }}:{{ seconds }}
  </span>
</template>

<script>
  export default {
    computed: {
      hours(){
        return Math.floor(this.duration / 3600)
      },
      minutes(){
        let minutes = Math.floor((this.duration % 3600) / 60);
        let isSingleDigit = minutes.toString().length == 1
        if(isSingleDigit && this.useHours){
          minutes = `0${minutes}`
        }
        return minutes
      },
      seconds(){
        let seconds = this.duration % 60
        let isSingleDigit = seconds.toString().length == 1
        if(isSingleDigit){
          seconds = `0${seconds}`
        }
        return seconds
      },
      useHours(){
        return this.duration > 60 * 60
      }
    },
    props: {
      duration: {
        type: Number
      },
    }
  }
</script>

<style lang="scss" scoped>

</style>