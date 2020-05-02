<template>
  <div>
    <v-container>
      <VideoGrid :videos="videoList" />
    </v-container>
  </div>
</template>

<script>
  import {mapGetters, mapState} from 'vuex'
  import VideoTableWithSearch from '@/components/VideoTableWithSearch.vue';
  import VideoGrid from "~/components/VideoGrid";

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
      VideoGrid,
      VideoTableWithSearch
    },
    computed: {
      ...mapState({
        allVideos: state => state.videos.videos,
      }),
      ...mapGetters({
        getCourse: 'courses/get'
      }),
      isMobile() {
        return this.$vuetify.breakpoint.xsOnly
      },
      videoList () {
        return this.allVideos.filter(v => v.published_at < Date.now()).map((v)=>{
          let course = this.getCourse(v.course_id)
          let courseName = course && course.name
          courseName = courseName && courseName.length > 33  ? `${courseName.slice(0, 30)}...` : courseName
          return {
            ...v,
            sortable_published_at: v.published_at && v.published_at.toISOString(),
            courseName,
            courseVideoNumber: course.video_ids.findIndex( i => parseInt(i) === v.id) + 1
          }
        })
      },
    }
  }
</script>

<style lang="scss" scoped>

</style>
