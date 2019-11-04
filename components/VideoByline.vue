<template>
  <em>
    <DurationDisplay :duration="video.duration" />
    &nbsp; | &nbsp;
    Published on {{publishedAt.getMonth() + 1}}/{{publishedAt.getDate()}}/{{publishedAt.getFullYear()}}
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
        return new Date();
      },
    },
    props: ['video'],
  }
</script>

<style lang="scss" scoped>

</style>