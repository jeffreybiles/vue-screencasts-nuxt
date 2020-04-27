<template>
  <v-dialog :value="true" width="600" persistent>
    <v-card>
      <div class="text-center pt-4">
        <div class="display-3">
          This is a Pro video.
        </div>
        <div class="headline">
          Study Vue <font-awesome-icon icon="laptop-code" />.
          Level Up <font-awesome-icon icon="arrow-up" />.
          Leap Forward <font-awesome-icon icon="dollar-sign" />.
        </div>
      </div>
      
      <v-card-text>
        <div v-if="$auth.loggedIn">
          <v-btn to="/order?plan=8" color="green darken-2 grey--text text--lighten-4" class="ma-5" x-large>Go Pro</v-btn>
          <!-- TODO: replace the link with an action that actually lets them sign up on-page -->
          <!-- Then have a smaller "see more details" link below, which goes to the /pro page -->
        </div>
        <div v-else class="ma-4">
          <v-container style="max-width: 450px;">
            <UserAuthTogglableForm />
          </v-container>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
  import UserAuthTogglableForm from '@/components/UserAuthTogglableForm.vue';

  export default {
    components: {
      UserAuthTogglableForm,
    }  
  }
</script>

<style lang="scss" scoped>

</style>