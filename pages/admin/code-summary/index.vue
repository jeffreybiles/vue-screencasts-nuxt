<template>
  <div>
    <v-btn @click="filterState = 'ready'">
      Ready ({{this.videos.filter(v => v.code_summary_state == 'ready').length}})
    </v-btn>
    <v-btn @click="filterState = 'started'">
      Started ({{this.videos.filter(v => v.code_summary_state == 'started').length}})
    </v-btn>
    <v-btn @click="filterState = 'not_ready'">
      Not Ready ({{this.videos.filter(v => v.code_summary_state == 'not_ready').length}})
    </v-btn>
    <v-btn @click="filterState = 'finished'">
      Finished ({{this.videos.filter(v => v.code_summary_state == 'finished').length}})
    </v-btn>

    <h1>Videos whose code_summary state is: {{filterState}}</h1>

    <VideoTableWithSearch :videos="filteredVideos" 
                          :headers="headers" 
                          :sortDesc="false"
                          :customClickAction="goToVideoShow"
                          :dense="true"
                          :itemsPerPage="10" />
  </div>
</template>

<script>
  import VideoTableWithSearch from '@/components/VideoTableWithSearch'
  import { mapState } from 'vuex';

  export default {
    data(){
      return {
        filterState: 'ready'
      }
    },
    components: {
      VideoTableWithSearch
    },
    computed: {
      ...mapState({
        videos: state => state.videos.videos
      }),
      filteredVideos(){
        return this.videos.filter(v => {
          return v.code_summary_state == this.filterState
        })
      },
      headers(){
        return [
          {text: 'Name', value: 'name'},
          {text: 'Pro', value: 'pro', width: '70px'},
          {text: 'Date', value: 'sortable_published_at'},
          {text: 'Duration', value: 'duration'},
          {text: 'Course', value: 'courseName'}
        ]
      },
    },
    methods: {
      goToVideoShow(video) {
        this.$router.push(`/admin/code-summary/${video.id}`)
      },
    },
  }
</script>

<style lang="scss" scoped>

</style>