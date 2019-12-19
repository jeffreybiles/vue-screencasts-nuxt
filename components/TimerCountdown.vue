<template>
  <span>
    {{ count }}
  </span>
</template>

<script>
  export default {
    data(){
      return {
        count: this.countLength
      }
    },
    mounted(){
      this.$timer.start('countdown');
    },
    timers: {
      countdown: {
        time: 1000, repeat: true
      }
    },
    methods: {
      countdown(){
        this.count = this.count - 1
        if(this.count <= 0) {
          this.$timer.stop('countdown');
          this.endCallback()
        }
      }
    },
    props: {
      countLength: {
        type: Number,
        default: 5
      },
      endCallback: {
        type: Function
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>