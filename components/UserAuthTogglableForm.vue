<template>
  <div>
    <div v-if="isLogin">
      <h1>{{ loginPhrase }}</h1>
      <p>New User? <a @click="changeScreen">Click here to register.</a></p>
      <UserAuthForm buttonText="Login" :submitForm="loginUser" />
    </div>
    <div v-else>
      <h1>{{ registerPhrase }}</h1>
      <p>Existing User? <a @click="changeScreen">Click here to login.</a></p>
      <UserAuthForm buttonText="Register" 
          :submitForm="registerUser" 
          :hasName="true" 
          :registrationCheckboxes="true" />
    </div>
  </div>
</template>

<script>
  import UserAuthForm from '@/components/UserAuthForm.vue';

  export default {
    data(){
      let isLogin = this.$route.query.isLogin || false
      return {
        isLogin
      }
    },
    components: {
      UserAuthForm
    },
    methods: {
      async loginUser(loginInfo){
        try {
          await this.$auth.loginWith('local', {
            data: loginInfo
          })
          this.$store.dispatch('snackbar/setSnackbar', {text: `Thanks for signing in, ${this.$auth.user.name}`})

          this.postLoginAction()
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

          this.postRegisterAction();
        } catch {
          this.$store.dispatch('snackbar/setSnackbar', {color: 'red', text: 'There was an issue signing up.  Please try again.'})
        }
      },
      changeScreen(){
        this.isLogin = !this.isLogin

        this.$router.replace({
          query: {
            ...this.$route.query,
            isLogin: this.isLogin,
          }
        })
      }
    },
    props: {
      registerPhrase: {
        type: String,
        default: "Register"
      },
      loginPhrase: {
        type: String,
        default: "Login"
      },
      postRegisterAction: {
        type: Function,
        default: () => {}
      },
      postLoginAction: {
        type: Function,
        default: () => {}
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>