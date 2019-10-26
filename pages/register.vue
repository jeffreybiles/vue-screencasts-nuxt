<template>
  <v-container>
    <h1>Register</h1>
    <UserAuthForm :submitForm="registerUser" buttonText="Register" hasName=true />
  </v-container>
</template>

<script>
  import UserAuthForm from '@/components/UserAuthForm.vue';
  export default {
    components: {
      UserAuthForm
    },
    methods: {
      async registerUser(registrationInfo){
        try {
          await this.$axios.post('/users', registrationInfo);
          await this.$auth.loginWith('local', {
            data: registrationInfo
          })
          this.$store.dispatch('snackbar/setSnackbar', {text: 'Welcome to our app, ' + this.$auth.user.name});
          this.$router.push("/");
        } catch {
          this.$store.dispatch('snackbar/setSnackbar', {color: 'error', text: response.error});
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>