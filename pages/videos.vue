<template>
  <div>
    <VideoTable
      :videos="publishedVideos"
      :headers="isMobile ? mobileHeaders : headers"
      :show-expand="!isMobile"
      :itemsPerPage="1000"
    />
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
      isMobile() {
        return this.$vuetify.breakpoint.xsOnly
      },
      publishedVideos(){
        return this.allVideos.filter(v => v.published_at < Date.now())
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
