<template>
  <v-container>
    <VideoEditForm :video="video" :saveVideo="saveVideo" buttonText="Save Video" />
  </v-container>
</template>

<script>
  import { mapGetters } from 'vuex';
  import VideoEditForm from '@/components/VideoEditForm.vue';

  export default {
    components: {
      VideoEditForm,
    },
    computed: {
      ...mapGetters({
        getVideo: 'videos/get'
      }),
      video(){
        return this.getVideo(this.$route.params.id);
      }
    },
    methods: {
      async saveVideo() {
        let video = await this.$store.dispatch('videos/edit', this.video);
        this.$store.dispatch('snackbar/setSnackbar', {text: `You have successfully edited your video, ${video.name}.`});
        this.$router.push(`/admin/videos/${video.id}`);
      },
    },
  }
</script>

<style lang="scss" scoped>

</style>