<template>
  <div>
    <nuxt-child />
    <h1>Videos</h1>
    <div v-for="video in videos" :key="video.id">
      <nuxt-link :to="`/videos/${video.id}`">{{ video.name }}</nuxt-link>
    </div>
  </div>
</template>

<script>
  export default {
    async asyncData({$axios}) {
      let response = await $axios.get('/videos')
      let videos = response.data.data.map(v => {
        return {...v.attributes, id: v.id}
      });

      return {
        videos
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>