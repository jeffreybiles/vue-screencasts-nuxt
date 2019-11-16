<template>
  <em>
    <DurationDisplay :duration="video.duration" />
    &nbsp; | &nbsp;
    <span v-if="publishedAt">
      Published on <DateDisplay :date="publishedAt" />
    </span>
    <span v-else>
      This video is not yet published
    </span>
  </em>
</template>

<script>
  import DurationDisplay from '@/components/DurationDisplay'
  import DateDisplay from '@/components/DateDisplay'
  
  export default {
    components: {
      DurationDisplay,
      DateDisplay,
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