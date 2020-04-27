<template>
  <v-dialog :value="true" width="600" persistent>
    <v-card>
      <v-card-title class="headline">
        This video will be released on&nbsp;<DateDisplay :date="releaseDate" />
      </v-card-title>

      <v-card-text v-if="!$auth.loggedIn">
        <UserAuthTogglableForm registerPhrase="Sign up and never miss an episode"
                               startingScreen="register" />
      </v-card-text>
      <v-card-text v-else>
        <!-- TODO: have this check automatically -->
        <h3>If you're signed up for daily updates, we'll let you know as soon as it's released.</h3>
        <h3>Not sure? <nuxt-link to="/account/email-preferences">Check here</nuxt-link></h3>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green accent-3">
          Go back
        </v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import DateDisplay from "~/components/DateDisplay";
  import UserAuthTogglableForm from '@/components/UserAuthTogglableForm.vue';
  export default {
    name: "AvailableSoonModal",
    components: {
      DateDisplay, 
      UserAuthTogglableForm
    },
    props: {
      releaseDate: {
        type: Date,
        default: new Date
      }
    },
  }
</script>

<style scoped>

</style>
