<template>
  <v-container>
    <h1>Video List</h1>
    <v-btn text to="/admin/videos/new">Add Video</v-btn>

    <VideoTable :videos="videos" 
                :headers="headers" 
                :customClickAction="goToVideoShow"
                :dense="true"
                :itemsPerPage="20" />
  </v-container>
</template>

<script>
  import VideoTable from '@/components/VideoTable'
  import { mapState } from 'vuex';
  export default {
    components: {
      VideoTable
    },
    computed: {
      ...mapState({
        videos: state => state.videos.videos
      }),
      headers(){
        return [
          {text: 'Name', value: 'name'},
          {text: 'Date', value: 'sortable_published_at'},
          {text: 'Duration', value: 'duration'},
          {text: 'Actions', value: 'actions', sortable: false, width: "300px"},
        ]
      },
    },
    methods: {
      goToVideoShow(video) {
        this.$router.push(`/admin/videos/${video.id}`)
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>