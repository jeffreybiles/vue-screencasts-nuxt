<template>
  <div>
    <h1 class="display-3 ma-4 d-flex justify-center">
      Videos with Tag "{{ tag.name }}"
    </h1>

    <div class="d-flex flex-wrap">
      <div v-for="video in videos" :key="video.id">
        <VideoListVideo :video="video" :tags="tags" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import VideoListVideo from '@/components/VideoListVideo'
  export default {
    components: {
      VideoListVideo
    },
    computed: {
      ...mapState(['tags', 'videos']),
      tag(){
        return this.tags.find(t => t.id == this.$route.params.id)
      }
    },
    async fetch({store, params}) {
      await store.dispatch('loadTagAndRelationships', {tagId: params.id})
    },
  }
</script>

<style lang="scss" scoped>

</style>