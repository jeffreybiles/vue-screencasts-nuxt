<template>
  <div>
    <nuxt-child :video="video" />
  </div>
</template>

<script>
  export default {
    async asyncData({$axios, params}) {
      let response = await $axios.get(`/videos/${params.id}`)
      let video = response.data.data;
      return {
        video: {id: video.id, ...video.attributes}
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>