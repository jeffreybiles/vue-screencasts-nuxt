<template>
  <v-container>
    <h1>Login</h1>
    <UserAuthForm :submitForm="loginUser" buttonText="Login" />
  </v-container>
</template>

<script>
  import UserAuthForm from "@/components/UserAuthForm";

  export default {
    components: {
      UserAuthForm
    },
    methods: {
      async loginUser(loginInfo) {
        try {          
          await this.$auth.loginWith('local', {
            data: loginInfo
          })
          if(this.$auth.loggedIn) {
            this.$store.dispatch('snackbar/setSnackbar', {text: 'Thank you for signing in, ' + this.$auth.user.name});
            if(this.$auth.user.admin){
              this.$router.push('/admin/videos');
            } else {
              this.$router.push('/');
            } 
          }  
        } catch {
          this.$store.dispatch('snackbar/setSnackbar', {color: 'error', text: 'There was an error logging in.  Please try again.'});
        }
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>