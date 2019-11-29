<template>
  <div>
    <div class="display-1 pt-3">{{video.name}}</div>
    <VideoByline :video="video" />
    
    <v-row>
      <v-col cols="12" sm="6" md="8">
        <MarkdownDisplay :markdown="video.description" />
        <h3>Code Summary</h3>
        <MarkdownDisplay :markdown="video.code_summary" />
      </v-col>
      <v-col cols="12" sm="6" md="4">
        <VideoWatch :video="video" />
      </v-col>
    </v-row>
   
    <TagAutocomplete :video="video" />

    <v-btn :to="`/admin/videos/${video.id}/edit`">Edit</v-btn>
    <v-btn :to="`/watch/${video.id}`">Watch</v-btn>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import _ from 'lodash';
  import VideoByline from '@/components/VideoByline';
  import MarkdownDisplay from '@/components/MarkdownDisplay';
  import VideoWatch from '@/components/VideoWatch';
  import TagAutocomplete from '@/components/TagAutocomplete';

  export default {
    components: {
      VideoByline,
      MarkdownDisplay,
      VideoWatch,
      TagAutocomplete
    },
    computed: {
      ...mapState({
        videos: state => state.videos.videos,
      }),
      video(){
        return this.videos.find(v => v.id == this.$route.params.id) || {};
      },
    }
  }
</script>

<style lang="scss" scoped>

</style>