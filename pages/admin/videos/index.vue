<template>
  <v-container>
    <h1>Video List</h1>
    <v-btn text to="/admin/videos/new">Add Video</v-btn>

    <VideoTable :videos="videos" 
                :headers="headers" 
                :clickAction="showVideo" 
                :itemsPerPage="20" 
                :dense="true"/>
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
        videos: state => state.videos.videos
      }),
      headers(){
        return [
          {text: 'Name', value: 'name'},
          {text: 'Length', value: 'duration'},
          {text: "Release Date", value: 'sortable_publish_date'},
          {text: "Tags", value: "tags", sortable: false},
          {text: "Actions", value: "admin_actions", sortable: false, width: "250px"}
        ]
      }
    },
    filters: {
      abbreviate(text) {
        if(text){
          text = text.replace('<p>', '');
          return text.slice(0, 50);
        }
      }
    },
    methods: {
      deleteVideo(video) {
        let response = confirm(`Are you sure you want to delete ${video.name}`)
        if(response){
          this.$store.dispatch('videos/delete', video);
          this.$store.dispatch('snackbar/setSnackbar', {text: `You have successfully deleted your video, ${video.name}.`});
        }
      },
      showVideo(video) {
        this.$router.push(`/admin/videos/${video.id}`)
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>