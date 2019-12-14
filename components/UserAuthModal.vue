<template>
  <span>
    <slot :openModal="() => isOpen = true">
      <v-btn @click="isOpen = true">Open</v-btn>
    </slot>
    <v-dialog
      v-model="isOpen"
      width="500"
    >
      <v-card min-height="200px" min-width="300px">
        <div class="pa-3">
          <div v-if="isLogin">
            <h1>Login</h1>
            <p>New User? <a @click="isLogin = false">Click here to register.</a></p>
            <UserAuthForm buttonText="Login" :submitForm="loginUser" />
          </div>
          <div v-else>
            <h1>Register</h1>
            <p>Existing User? <a @click="isLogin = true">Click here to login.</a></p>
            <UserAuthForm buttonText="Register" 
                :submitForm="registerUser" 
                :hasName="true" 
                :registrationCheckboxes="true" />
          </div>
        </div>
      </v-card>
    </v-dialog>
  </span>
</template>

<script>
  import UserAuthForm from '@/components/UserAuthForm.vue';

  export default {
    components: {
      UserAuthForm
    },
    data(){
      return {
        isOpen: false,
        isLogin: false,
      }
    },
    methods: {
      async loginUser(loginInfo){
        try {
          await this.$auth.loginWith('local', {
            data: loginInfo
          })
          this.$store.dispatch('snackbar/setSnackbar', {text: `Thanks for signing in, ${this.$auth.user.name}`})
        } catch {
          this.$store.dispatch('snackbar/setSnackbar', {color: 'red', text: 'There was an issue signing in.  Please try again.'})
        }
      },
      async registerUser(registrationInfo){
        try {
          await this.$axios.post('/users', registrationInfo)

          await this.$auth.loginWith('local', {
            data: registrationInfo
          })
          this.$store.dispatch('snackbar/setSnackbar', {text: `Thanks for signing up, ${this.$auth.user.name}`})
        } catch {
          this.$store.dispatch('snackbar/setSnackbar', {color: 'red', text: 'There was an issue signing up.  Please try again.'})
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>