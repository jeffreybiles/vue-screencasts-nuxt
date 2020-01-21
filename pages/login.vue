<template>
  <v-container>
    <h1>Login</h1>

    <UserAuthForm buttonText="Login" :submitForm="loginUser" />
  </v-container>
</template>

<script>
  import UserAuthForm from '@/components/UserAuthForm'
  
  export default {
    components: {
      UserAuthForm
    },
    methods: {
      async loginUser(loginInfo){
        try {
          await this.$auth.loginWith('local', {
            data: loginInfo
          })
          this.$store.dispatch('snackbar/create', {text: `Thanks for signing in, ${this.$auth.user.name}`})
          this.$router.push('/')
        } catch {
          this.$store.dispatch('snackbar/create', {color: 'red', text: 'There was an issue signing in.  Please try again.'})
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>