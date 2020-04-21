<template>
  <v-container>
    <v-sheet color="green lighten-2" class="text-center" v-if="$route.query.redirect">
      You must be logged in to access {{$route.query.redirect}}.
    </v-sheet>
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
          this.$store.dispatch('snackbar/setSnackbar', {text: `Thanks for signing in, ${this.$auth.user.name}`})

          let redirect_url = this.$route.query.redirect || '/'
          this.$router.push(redirect_url)
        } catch {
          this.$store.dispatch('snackbar/setSnackbar', {color: 'red', text: 'There was an issue signing in.  Please try again.'})
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>