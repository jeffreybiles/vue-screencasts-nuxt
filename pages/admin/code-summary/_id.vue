<template>
  <div>
    <MarkdownEditor :markdown="video.description">
      <v-textarea v-model="video.description" 
                  label="Description" 
                  counter=true
                  rows="9" />
    </MarkdownEditor>

    <VideoWatch :video="video" />

    <MarkdownEditor :markdown="video.code_summary">
      <template #default>
        <v-textarea v-model="video.code_summary"
                    label="Code Summary" 
                    rows="30" />
      </template>
    </MarkdownEditor>

    <div v-if="customState">
      <v-select v-model="video.code_summary_state" label="State" :items="['not_ready', 'ready', 'started', 'finished']" />
      <v-btn @click="save(video)">Save</v-btn>
    </div>
    <div v-else>
      <span v-if="video.code_summary_state == 'finished'">
        <v-btn @click="save(video)">Save</v-btn>
      </span>
      <span v-else>
        <v-btn @click="saveAndStay">Save Draft</v-btn>
        <v-btn @click="saveAndContinue">Finish</v-btn>
      </span>
      <v-btn @click="customState = true">Switch to custom state</v-btn>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';

  import MarkdownEditor from '@/components/MarkdownEditor.vue';
  import VideoWatch from '@/components/VideoWatch.vue';

  export default {
    data(){
      return {
        customState: false
      }
    },
    components: {
      MarkdownEditor,
      VideoWatch
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
      async save(video){
        video = await this.$store.dispatch('videos/edit', video);
        this.$store.dispatch('snackbar/setSnackbar', {text: `You have successfully edited your video, ${video.name}.`});
        this.$router.push(`/admin/code-summary`);
      },
      saveAndStay(){
        let video = this.video;
        if(video.code_summary_state == 'ready') {
          video.code_summary_state = 'started';
        }
        this.save(video)
      },
      saveAndContinue(){
        let video = this.video;
        let state = video.code_summary_state;
        if(state == 'not_ready') {
          video.code_summary_state = 'ready'
        } else if (state == 'ready' || state == 'started') {
          video.code_summary_state = 'finished'
        }
        this.save(video)
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>