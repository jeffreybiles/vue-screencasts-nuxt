<template>
  <v-dialog :value="true" width="600" persistent>
    <v-card>
      <v-card-title>
        <h1 class="headline">This video will be released on&nbsp;<DateDisplay :date="releaseDate" /></h1>
        <a @click="goToPrevious()">
          <small>Go To Previous Video</small>
        </a>
      </v-card-title>

      <v-card-text>
        <UserAuthTogglableForm v-if="!$auth.loggedIn"
                               registerPhrase="Sign up and never miss an episode"
                               startingScreen="register" />
        <span v-else>
          <!-- TODO: have this check automatically -->
          <h3>If you're signed up for daily updates, we'll let you know as soon as it's released.</h3>
          <h3>Not sure? <nuxt-link to="/account/email-preferences">Check here</nuxt-link></h3>
        </span>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
  import DateDisplay from "~/components/DateDisplay";
  import UserAuthTogglableForm from '@/components/UserAuthTogglableForm.vue';
  export default {
    name: "VideoBlockModalUpcoming",
    components: {
      DateDisplay, 
      UserAuthTogglableForm
    },
    props: {
      releaseDate: {
        type: Date,
        default: new Date
      },
      goToPrevious: {
        type: Function,
        required: true
      }
    },
  }
</script>

<style scoped>

</style>
