<template>
  <div>
    <h1 class="display-3 ma-4 d-flex justify-center">
      Videos with Tag "{{ tag.name }}"
    </h1>

    <div class="d-flex flex-wrap">
      <div v-for="video in videosOnTag" :key="video.id">
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
      },
      videosOnTag(){
        return this.videos.filter(v => {
          return this.tag.video_ids.includes(v.id.toString())
        })
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>