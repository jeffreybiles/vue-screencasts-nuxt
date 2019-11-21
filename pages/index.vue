<template>
  <div class="home">
    <div class="display-4 ma-4 d-flex justify-center">
      All Videos
    </div>
    
    <v-data-table :items="videos"
                  :headers="headers">
      <template #item.duration="{item}">
        <DurationDisplay :duration="item.duration" />
      </template>
      <template #item.published_at="{item}">
        <DateDisplay :date="item.published_at" />
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
import DateDisplay from '@/components/DateDisplay'

export default {
  components: {
    VideoListVideo,
    DurationDisplay,
    DateDisplay
  },
  computed: {
    headers(){
      return [
        {text: 'Name', value: 'name'},
        {text: 'Date', value: 'published_at'},
        {text: 'Duration', value: 'duration'}
      ]
    },
    ...mapState({
      tags: state => state.tags.tags,
      videos: state => state.videos.videos
    }),
  }
}
</script>

<style>
</style>
