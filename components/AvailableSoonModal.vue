<template>
  <v-dialog
    :value="true"
    width="600"
    :persistent="true"
  >
    <v-card>
      <v-card-title
        class="headline"
      >
        This video will be released on&nbsp;<DateDisplay :date="releaseDate" />
      </v-card-title>

      <v-card-text v-if="!$auth.loggedIn || emailSettings.microCasts" >
        <template v-if="!$auth.loggedIn">
          <h1 style="margin-top: 10px;">Sign up and never miss an episode</h1>
          <UserAuthForm buttonText="Register"
                        :submitForm="registerUser"
                        :hasName="true"
                        :registrationCheckboxes="true" />
        </template>
        <h3 v-else-if="emailSettings.microCasts">
          We'll let you know as soon as it's released.
        </h3>
      </v-card-text>

      <v-card-actions v-if="!emailSettings.microCasts && $auth.loggedIn">
        <v-spacer></v-spacer>
        <v-btn
          color="green accent-3"
        >
          Send me update emails
        </v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import DateDisplay from "~/components/DateDisplay";
  import UserAuthForm from '@/components/UserAuthForm.vue';
  export default {
    name: "AvailableSoonModal",
    components: {DateDisplay, UserAuthForm},
    props: {
      releaseDate: {
        type: Date,
        default: new Date
      }
    },
    data() {
      return {
        emailSettings: {}
      }
    },
    created() {
      if (this.$auth.loggedIn) {
        this.checkEmailSettings()
      }
    },
    methods: {
      async checkEmailSettings() {
        const settings = await this.$axios.$get('/email_preferences/status')
        this.emailSettings = settings
      },
      async registerUser(registrationInfo){
        try {
          await this.$axios.post('/users', registrationInfo)

          await this.$auth.loginWith('local', {
            data: registrationInfo
          })
          this.$store.dispatch('snackbar/setSnackbar', {text: `Thanks for signing up, ${this.$auth.user.name}`})

          this.checkEmailSettings()
        } catch {
          this.$store.dispatch('snackbar/setSnackbar', {color: 'red', text: 'There was an issue signing up.  Please try again.'})
        }
      }
    }
  }
</script>

<style scoped>

</style>
