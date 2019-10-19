<template>
  <v-container>
    <v-row>
      <v-col md="9" cols="12">
        <div class="video-player-box"
             v-video-player:videoPlayer="playerOptions">
                      <!-- @ended="markPlayed" -->
        </div>
      </v-col>
      <v-col md="3" cols="12">
        <div class="display-1">{{video.name}}</div>

        <!-- <div class="green--text" v-if="isPlayed(video.id)">
          <font-awesome-icon icon="check" /> 
          Played
        </div>
        <div v-else>
          <v-btn x-small @click="markPlayed" v-if="currentUser.name">
            Mark Played
          </v-btn>
        </div> -->

        <div v-html="video.description"></div>
        
        <span v-for="tag_id in video.tag_ids" :key="tag_id">
          <v-btn :to="{ name: 'tag', params: {id: tag_id}}"
                color="green lighten-2"
                class="mr-1 mb-2">
            {{ getTag(tag_id).name }}
          </v-btn>
        </span>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import 'video.js/dist/video-js.css'
import Vue from 'vue';

if (process.browser) {
  const VueVideoPlayer = require('vue-video-player/dist/ssr')
  Vue.use(VueVideoPlayer)
}

export default {
  async asyncData({$axios, params}) {
    let response = await $axios.get(`/videos/${params.id}`)
    let video = response.data.data;

    video.attributes.tag_ids = video.relationships.tags.data.map(t => t.id);

    let tags = response.data.included;
    tags.forEach(t => {
      t.attributes.id = t.id;
    })

    return {
      video: video.attributes,
      tags: tags.map(t => t.attributes)
    }
  },
  computed: {
    // ...mapGetters({
    //   getTag: 'tags/get',
    //   isPlayed: 'users/videoIsPlayed'
    // }),
    // ...mapState({
    //   videos: state => state.videos.videos,
    //   currentUser: state => state.users.currentUser
    // }),
    playerOptions(){
      return {
        language: 'en',
        playbackRates: [0.7, 1.0, 1.5, 2.0, 2.5, 3.0],
        sources: [{
          type: "video/mp4",
          src: this.video.videoUrl
        }],
        poster: this.video.thumbnail,
        fluid: true
      }
    }
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