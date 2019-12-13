<template>
  <v-container class="home">
    <!-- TODO: style this better so it takes up less room -->
    <h1>Don't Be Basic</h1>
    <p>There are dozens of great resources for getting started with VueJS...</p>
    <p>But what comes next?</p>
    <p>There are only so many times you can go over the basics before you're just wasting your time.</p>
    <h1>Advanced Vue for Pro Developers</h1>
    <p>Don't get the wrong idea... I'll still make some entry-level videos.</p>
    <p>But my goal isn't to compete with all the other educators out there on who can explain v-bind the best.</p>
    <p>Instead, I want to tackle meaty problems that Vue developers will encounter in the real world.</p>
    
    <h2>Near-daily releases start sometime in January</h2>


    <!-- TODO: put in 6 courses -->
    <hr>
    <h1>Thousands have already learned from VueScreencasts</h1>
    <SocialProofGrid />

    <h1>Check out our newest videos</h1>
    <VideoTable :videos="videos" :headers="headers" />
  </v-container>
</template>

<script>
import { mapState } from 'vuex';
import VideoTable from '@/components/VideoTable'
import SocialProofGrid from '@/components/SocialProofGrid.vue';

export default {
  components: {
    VideoTable,
    SocialProofGrid
  },
  computed: {
    ...mapState({
      videos: state => state.videos.videos
    }),
    headers(){
      return [
        {text: 'Played', value: 'played', sortable: false, width: "70px"},
        {text: 'Name', value: 'name'},
        {text: 'Date', value: 'sortable_published_at'},
        {text: 'Duration', value: 'duration'},
        {text: 'Course', value: 'courseName'},
      ]
    },
  }
}
</script>

<style>
</style>
