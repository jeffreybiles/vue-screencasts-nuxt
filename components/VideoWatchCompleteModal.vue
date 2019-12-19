<template>
  <v-dialog
    v-model="open"
    @click:outside="close"
    width="650"
  >
    <v-card>
      <div class="pa-4">
        <div v-if="$auth.loggedIn">
          <v-card-title>
            <h3>Next video starting in</h3> 
            &nbsp;
            <h1><TimerCountdown :endCallback="doCallback" /></h1>
          </v-card-title>
          <v-card-actions>
            <v-btn @click="close">Stay in this video</v-btn>
            <v-spacer />
            <v-btn color="primary" @click="goToNextVideo">Go now</v-btn>
          </v-card-actions>
        </div>
        <div v-else>
          <UserAuthTogglableForm registerPhrase="Keep track of the videos you've watched"
                                 :postRegisterAction="postAuthAction"
                                 :postLoginAction="postAuthAction"/>
          <a @click="skip">Skip for now</a>
        </div>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
  import UserAuthTogglableForm from '@/components/UserAuthTogglableForm.vue';
  import TimerCountdown from '@/components/TimerCountdown.vue';
  export default {
    components: {
      UserAuthTogglableForm,
      TimerCountdown
    },
    computed: {
      open(){
        return this.isOpen;
      }
    },
    methods: {
      doCallback(){
        if(this.isOpen) {
          this.goToNextVideo()
        }
      },
      goToNextVideo(){
        this.$router.push(`/watch/${this.nextVideo.id}`);
        this.close()
      },
      skip(){
        // Maybe add feature where after clicking skip it doesn't 
        this.goToNextVideo();
      },
      postAuthAction(){
        this.markPlayed();
        this.goToNextVideo();
      },
    },
    props: {
      isOpen: {
        type: Boolean,
        default: true // change to false once I'm done developing
      },
      close: {
        type: Function,
        required: true
      },
      nextVideo: {
        type: Object,
        required: true
      },
      markPlayed: {
        type: Function,
        required: true
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>