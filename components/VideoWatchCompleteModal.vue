<template>
  <v-dialog
    v-model="open"
    @click:outside="close"
    width="650"
  >
    <v-card min-height="200px">
      <div class="pa-4">
        <div v-if="$auth.loggedIn">
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
    computed: {
      open(){
        return this.isOpen;
      }
    },
    methods: {
      async goToNextVideo(){
        await this.$router.push(`/watch/${this.nextVideo.id}`);
      },
      async skip(){
        // Maybe add feature where after clicking skip it doesn't 
        await this.goToNextVideo();
        this.close();
      },
      startCountdown(){
        
      },
      postAuthAction(){
        this.markPlayed();
        this.goToNextVideo();
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