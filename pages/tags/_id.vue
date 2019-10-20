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
import VideoListVideo from '@/components/VideoListVideo'
  export default {
    components: {
      VideoListVideo
    },
    async asyncData({$axios, params}) {
      let response = await $axios.get(`/tags/${params.id}`)
      let tag = response.data.data
      tag.attributes.id = tag.id

      let videos = response.data.included.filter(i => i.type === 'video' || i.type === 'videos')
      videos.forEach(v => {
        v.attributes.tag_ids = v.relationships.tags.data.map(t => t.id);
      });
      let videoIdsOnTag = response.data.data.relationships.videos.data.map(v => v.id);
      let videosOnTag = videoIdsOnTag.map( v_id => videos.find(v => v.id == v_id))

      let tags = response.data.included.filter(i => i.type === 'tag' || i.type === 'tags')
      tags.forEach(t => {
        t.attributes.id = t.id
      })

      return {
        tag: tag.attributes,
        videosOnTag: videosOnTag.map(v => v.attributes),
        tags: tags.map(t => t.attributes)
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>