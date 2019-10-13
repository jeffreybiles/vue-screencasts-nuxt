<template>
  <div>
    <nuxt-child :video="video" />
  </div>
</template>

<script>
  export default {
    head() {
      return {
        title: '',
        titleTemplate: `%s ${this.video.name} - Vue Screencasts`
      }
    },
    async asyncData({$axios, params}) {
      let response = await $axios.get(`/videos/${params.id}`)
      let video = response.data.data.attributes;
      return {
        video
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>