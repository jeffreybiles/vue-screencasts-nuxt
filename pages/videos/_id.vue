<template>
  <div>
    <nuxt-child :video="video" />
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  export default {
    head() {
      return {
        title: '',
        titleTemplate: `%s ${this.video.name} - Vue Screencasts`
      }
    },
    async fetch({$axios, params, store}) {
      let response = await $axios.get(`/videos/${params.id}`)
      let video = response.data.data;
      video = {...video.attributes, id: video.id}
      
      store.commit('SET_CURRENT_VIDEO', video);
    },
    computed: {
      ...mapState({
        video: 'currentVideo'
      })
    }
  }
</script>

<style lang="scss" scoped>

</style>