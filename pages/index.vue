<template>
  <v-container>
    <div class="display-4 ma-4 d-flex justify-center">
      All Videos
    </div>

    <VideoTable :videos="videos" :headers="headers" :clickAction="visitVideo" />
  </v-container>
</template>

<script>
import { mapState } from 'vuex';
import VideoTable from '@/components/VideoTable';

export default {
  components: {
    VideoTable
  },
  computed: {
    ...mapState({
      tags: state => state.tags.tags,
      videos: state => state.videos.videos,
    }),
    headers() {
      return [
        {text: "Played", value: "played", width: "70px", sortable: false},
        {text: 'Name', value: 'name'},
        {text: 'Length', value: 'duration'},
        {text: "Release Date", value: 'sortable_publish_date'},
        {text: "Tags", value: "tags", sortable: false},
      ]
    },
  },
  methods: {
    visitVideo(video) {
      this.$router.push(`/watch/${video.id}`)
    }
  }
}
</script>

<style>
</style>
