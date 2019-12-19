<template>
  <v-dialog
    v-model="open"
    @click:outside="close"
    width="650"
  >
    <v-card min-height="200px">
      <div class="pa-4">
        <div v-if="$auth.loggedIn">
          Next video starting in {{ count }}
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
  export default {
    components: {
      UserAuthTogglableForm
    },
    created () {
      this.$timer.start('countdown');
    },
    data(){
      return {
        count: 9
      }
    },
    computed: {
      open(){
        return this.isOpen;
      }
    },
    timers: {
      countdown: {
        time: 1000, repeat: true
      }
    },
    methods: {
      goToNextVideo(){
        this.$timer.stop('countdown');
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
      countdown(){
        this.count = this.count - 1
        if(this.count <= 0) {
          this.goToNextVideo()
        }
      }
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