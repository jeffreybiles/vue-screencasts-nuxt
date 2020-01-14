<template>
  <v-dialog
    v-model="open"
    @click:outside="close"
    width="650"
  >
    <v-card class="pa-4">
      <div v-if="$auth.loggedIn">
        <div v-if="!nextVideo">
          <div v-if="nextChapter && nextChapter.name">
            <v-card-text>
              <div class="display-2">
                You're done with this chapter.  Congrats!
              </div>
              <br>
              <div class="headline">The next chapter is <strong>{{nextChapter.name}}</strong>.</div>
            </v-card-text>
            <v-card-actions>
              <v-btn color="secondary" @click="goToNextChapter(nextChapter, 'first')">Watch Now</v-btn>
            </v-card-actions>
          </div>
          <div v-else>
            <v-card-text>
              <span class="display-2">
                You're done with this course.  Congrats!
              </span>
            </v-card-text>
            <v-card-actions>
              <v-btn color="secondary" :to="`/courses/`">Find More Courses</v-btn>
              <!-- TODO: "Tell my friends" button -->
            </v-card-actions>
          </div>
        </div>
        <div v-else>
          <v-card-title>
            <h2>Up next: {{nextVideo.name}}</h2>
          </v-card-title>
          <v-card-text>
            <span class="display-1">Starting in</span>
            &nbsp;
            <span class="display-2"><TimerCountdown :endCallback="doCallback" /></span>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="secondary" @click="close">Stay in this video</v-btn>
            <v-btn color="green" @click="goToNextVideo">Go now</v-btn>
          </v-card-actions>
        </div>
      </div>
      <div v-else>
        <UserAuthTogglableForm registerPhrase="Keep track of the videos you've watched"
                                :postRegisterAction="postAuthAction"
                                :postLoginAction="postAuthAction"/>
        <a @click="skip">Skip for now</a>
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
      },
      markPlayed: {
        type: Function,
        required: true
      },
      nextChapter: {
        type: Object,
        required: false
      },
      goToNextChapter: {
        type: Function
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>