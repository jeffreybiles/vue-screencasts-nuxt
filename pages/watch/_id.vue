<template>
  <v-container>
    <v-row>
      <v-col md="9" cols="12">
        <VideoWatch :video="video" />
      </v-col>
      <v-col md="3" cols="12">
        <div class="display-1">{{video.name}}</div>
        <VideoByline :video="video" />
        <!-- <div class="green--text" v-if="isPlayed(video.id)">
          <font-awesome-icon icon="check" /> 
          Played
        </div>
        <div v-else>
          <v-btn x-small @click="markPlayed" v-if="currentUser.name">
            Mark Played
          </v-btn>
        </div> -->

        <MarkdownDisplay :markdown="video.description" />
        
        <span v-for="tag_id in video.tag_ids" :key="tag_id">
          <v-btn color="green lighten-2"
                 :to="`/tags/${tag_id}`"
                 class="mr-1 mb-2">
            {{ getTag(tag_id).name }}
          </v-btn>
        </span>
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

import { mapState } from 'vuex';

export default {
  components: {
    VideoByline,
    VideoWatch,
    MarkdownDisplay
  },
  computed: {
    // ...mapGetters({
    //   getTag: 'tags/get',
    //   isPlayed: 'users/videoIsPlayed'
    // }),
    ...mapState({
      tags: state => state.tags.tags,
      videos: state => state.videos.videos
    }),
    video(){
      return this.videos.find(v => v.id == this.$route.params.id)
    },
  },
  methods: {
    getTag(tagId) {
      return this.tags.find(t => t.id == tagId);
    }
    // markPlayed(){
    //   this.$store.dispatch('users/markVideoPlayed', this.video.id)
    // }
  }
}
</script>

<style>
</style>