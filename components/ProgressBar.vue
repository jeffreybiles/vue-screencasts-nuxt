<template>
  <v-progress-linear v-model="percentVideosComplete" color="green" height="25">
    <div v-if="percentVideosComplete == 0">
      Ready to Learn!
    </div>
    <div v-else-if="percentVideosComplete == 100">
      Great work!
    </div>
    <div v-else>
      {{percentVideosComplete}}% complete
    </div>
  </v-progress-linear>
</template>

<script>
  import { percentVideosComplete } from '@/utils/course-decorator';
  export default {
    computed: {
      percentVideosComplete(){
        return percentVideosComplete(this.videos, this.$store)
      }
    },
    props: {
      videos: {
        type: Array,
        required: true
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>