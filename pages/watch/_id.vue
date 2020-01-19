<template>
  <v-container>
    <v-row>
      <v-col md="9" cols="12">
        <VideoWatch :video="video" />
      </v-col>
      <v-col md="3" cols="12">
        <div class="display-1">{{video.name}}</div>
        <VideoByline :video="video" />
        <div class="green--text" v-if="isPlayed(video.id)">
          <font-awesome-icon icon="check" /> 
          Played
        </div>
        <div v-else>
          <v-btn x-small @click="markPlayed" v-if="$auth.loggedIn">
            Mark Played
          </v-btn>
        </div>

        <MarkdownDisplay :markdown="video.description" />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <h1>Code Summary</h1>
        <MarkdownDisplay :markdown="video.code_summary" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import VideoByline from '@/components/VideoByline';
import VideoWatch from '@/components/VideoWatch';
import MarkdownDisplay from '@/components/MarkdownDisplay';

import { mapState, mapGetters } from 'vuex';

export default {
  components: {
    VideoByline,
    VideoWatch,
    MarkdownDisplay
  },
  computed: {
    ...mapGetters({
      isPlayed: 'user/videoIsPlayed'
    }),
    ...mapState({
      videos: state => state.videos.videos
    }),
    video(){
      return this.videos.find(v => v.id == this.$route.params.id)
    },
  },
  methods: {
    markPlayed(){
      this.$store.dispatch('user/markVideoPlayed', this.video.id)
    }
  }
}
</script>

<style>
</style>