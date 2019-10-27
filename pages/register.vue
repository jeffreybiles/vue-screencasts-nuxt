<template>
  <v-container>
    <h1>Register</h1>

    <UserAuthForm buttonText="Register" :submitForm="registerUser" hasName="true" />
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
        await this.$axios.post('/users', registrationInfo)
        this.$auth.loginWith('local', {
          data: registrationInfo
        })
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>