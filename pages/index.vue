<template>
  <div class="home">
    <div class="display-4 ma-4 d-flex justify-center">
      All Videos
    </div>

    <div class="d-flex flex-wrap">
      <div v-for="video in videos" :key="video.name">
        <VideoListVideo :video="video" :tags="tags"></VideoListVideo>
      </div>
    </div>
  </div>
</template>

<script>
import VideoListVideo from '../components/VideoListVideo'
export default {
  components: {
    VideoListVideo
  },
  async asyncData({$axios}) {
    let response = await $axios.get('/videos')
    let videos = response.data.data;

    videos.forEach(v => {
      v.attributes.tag_ids = v.relationships.tags.data.map(t => t.id);
    });

    let tags = response.data.included;
    tags.forEach(t => {
      t.attributes.id = t.id;
    })

    return {
      videos: videos.map(v => v.attributes),
      tags: tags.map(t => t.attributes)
    }
  },
}
</script>

<style>
</style>
