<template>
  <v-container>
    <h1 class="display-3 ma-4 d-flex justify-center">
      Videos with Tag "{{ tag.name }}"
    </h1>

    <VideoTable :videos="videosOnTag" :headers="headers" />
  </v-container>
</template>

<script>
import { mapState } from 'vuex';
import VideoTable from '@/components/VideoTable'
  export default {
    components: {
      VideoTable
    },
    computed: {
      ...mapState({
        tags: state => state.tags.tags,
        videos: state => state.videos.videos
      }),
      videosOnTag(){
        return this.videos.filter(v => {
          return this.tag.video_ids.includes(v.id.toString())
        })
      },
      tag(){
        return this.tags.find(t => t.id == this.$route.params.id)
      },
      headers() {
        return [
          {text: "Played", value: "played", width: "70px", sortable: false},
          {text: 'Name', value: 'name'},
          {text: 'Length', value: 'duration'},
          {text: "Release Date", value: 'sortable_publish_date'},
          {text: "Tags", value: "tags", sortable: false},
        ]
      },
    }
  }
</script>

<style lang="scss" scoped>

</style>