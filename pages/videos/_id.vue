<template>
  <div>
    <nuxt-child :video="video" />
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
    computed: {
      video() {
        return this.videos.find(v => v.id == this.$route.params.id)
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>