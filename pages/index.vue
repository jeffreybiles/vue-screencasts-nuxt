<template>
  <div class="home">
    <div class="display-4 ma-4 d-flex justify-center">
      All Videos
    </div>

    <v-data-table :headers="headers"
                  :items="videos"
                  :items-per-page="20">
      <template #item.duration="{item}">
        <DurationDisplay :duration="item.duration" />
      </template>
    </v-data-table>
    <div class="d-flex flex-wrap">

      <div v-for="video in videos" :key="video.name">
        <VideoListVideo :video="video" :tags="tags"></VideoListVideo>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import VideoListVideo from '../components/VideoListVideo'
import DurationDisplay from '@/components/DurationDisplay'
export default {
  components: {
    VideoListVideo,
    DurationDisplay
  },
  computed: {
    ...mapState({
      tags: state => state.tags.tags,
      videos: state => state.videos.videos,
      headers() {
        return [
          {text: 'Name', value: 'name'},
          {text: 'Length', value: 'duration'}
        ]
      }
    }),
  }
}
</script>

<style>
</style>
