<template>
  <v-container>
    <h1>Video Create Page</h1>
    <VideoEditForm :video="video" :saveVideo="createVideo" buttonText="Create Video" />
  </v-container>
</template>

<script>
  import VideoEditForm from '@/components/VideoEditForm.vue';

  export default {
    data() {
      return {
        video: {}
      }
    },
    components: {
      VideoEditForm,
    },
    methods: {
      async createVideo(newVideo) {
        let video = await this.$store.dispatch('videos/create', newVideo);
        this.$store.dispatch('snackbar/setSnackbar', {text: `You have successfully created a new video, ${video.name}.`});
        this.$router.push(`/admin/videos/${video.id}`);
      }
    },
  }
</script>

<style lang="scss" scoped>  
</style>