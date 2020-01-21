<template>
  <v-container>
    <h1>Register</h1>

    <UserAuthForm buttonText="Register" :submitForm="registerUser" :hasName="true" />
  </v-container>
</template>

<script>
  import UserAuthForm from '@/components/UserAuthForm'
  
  export default {
    components: {
      UserAuthForm
    },
    methods: {
      async registerUser(registrationInfo){
        try {
          await this.$axios.post('/users', registrationInfo)

          await this.$auth.loginWith('local', {
            data: registrationInfo
          })
          this.$store.dispatch('snackbar/create', {text: `Thanks for signing up, ${this.$auth.user.name}`})
          this.$router.push('/')
        } catch {
          this.$store.dispatch('snackbar/create', {color: 'red', text: 'There was an issue signing up.  Please try again.'})
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>