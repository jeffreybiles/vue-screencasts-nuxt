<template>
  <div>
    <VideoTable :videos="publishedVideos" :headers="headers" :itemsPerPage="1000" class="hidden-xs-only" />
    <VideoTable :videos="publishedVideos" :headers="mobileHeaders" :itemsPerPage="1000" :showExpand="false" class="hidden-sm-and-up" />
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import VideoTable from '@/components/VideoTable.vue';
  export default {
    middleware: 'load-videos-and-courses',

    data(){
      return {
        headers: [
          {text: 'Played', value: 'played', sortable: false, width: "65px"},
          {text: 'Status', value: 'pro', sortable: false, width: "75px"},
          {text: 'Name', value: 'name'},
          {text: 'Date', value: 'sortable_published_at'},
          {text: 'Duration', value: 'duration'},
          {text: 'Course', value: 'courseName'},
        ],
        mobileHeaders: [
          {text: 'Name', value: 'name'},
          {text: 'Date', value: 'sortable_published_at'},
          {text: 'Duration', value: 'duration'},
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