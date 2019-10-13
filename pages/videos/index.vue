<template>
  <div>
    <nuxt-child />
    <h1>Videos</h1>
    <div v-for="video in videos" :key="video.id">
      {{ video.name }}
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        videos: [{
          id: '16',
          name: 'Intro to NuxtJS'
        }, {
          id: '1',
          name: 'Intro to VueJS'
        }, {
          id: '71',
          name: 'Advanced Techniques for Library X'
        }]
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>