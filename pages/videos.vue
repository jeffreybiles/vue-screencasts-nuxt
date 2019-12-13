<template>
  <div>
    <VideoTable :videos="publishedVideos" :headers="headers" :itemsPerPage="1000" />
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import VideoTable from '@/components/VideoTable.vue';
  export default {
    data(){
      return {
        headers: [
          {text: 'Played', value: 'played', sortable: false, width: "70px"},
          {text: 'Name', value: 'name'},
          {text: 'Date', value: 'sortable_published_at'},
          {text: 'Duration', value: 'duration'},
          {text: 'Course', value: 'course'},
        ]
      }
    },
    components: {
      VideoTable
    },
    computed: {
      ...mapState({
        allVideos: state => state.videos.videos
      }),
      publishedVideos(){
        return this.allVideos.filter(v => v.published_at < Date.now())
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>