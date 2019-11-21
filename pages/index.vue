<template>
  <div class="home">
    <div class="display-4 ma-4 d-flex justify-center">
      All Videos
    </div>
    
    <v-data-table :items="mungedVideos"
                  :headers="headers"
                  sort-by="sortable_published_at"
                  :sort-desc="true">
      <template #item.duration="{value}">
        <DurationDisplay :duration="value" />
      </template>
      <template #item.sortable_published_at="{item}">
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
        {text: 'Date', value: 'sortable_published_at'},
        {text: 'Duration', value: 'duration'}
      ]
    },
    ...mapState({
      tags: state => state.tags.tags,
      videos: state => state.videos.videos
    }),
    mungedVideos(){
      return this.videos.map((v)=>{
        return {
          ...v,
          sortable_published_at: v.published_at && v.published_at.toISOString()
        }
      })
    }
  }
}
</script>

<style>
</style>
