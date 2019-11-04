<template>
  <em>
    <DurationDisplay :duration="video.duration" />
    &nbsp; | &nbsp;
    <span v-if="publishedAt">
      Published on {{publishedAt.getMonth() + 1}}/{{publishedAt.getDate()}}/{{publishedAt.getFullYear()}}
    </span>
    <span v-else>
      This video is not yet published
    </span>
  </em>
</template>

<script>
  import DurationDisplay from '@/components/DurationDisplay'
  
  export default {
    components: {
      DurationDisplay
    },
    computed: {
      publishedAt(){
        return this.video.published_at
      },
    },
    props: ['video'],
  }
</script>

<style lang="scss" scoped>

</style>