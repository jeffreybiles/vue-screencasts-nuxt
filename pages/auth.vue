<template>
  <v-container>
    <UserAuthTogglableForm loginPhrase="Login"
                           registerPhrase="Register"
                           :postLoginAction="redirect"
                           :postRegisterAction="redirect" />
  </v-container>
</template>

<script>
  import UserAuthTogglableForm from '@/components/UserAuthTogglableForm'

  export default {
    components: {
      UserAuthTogglableForm
    },
    methods: {
      redirect(){
        const REDIRECT_URI = this.$route.query.redirect || '/'
        this.$router.push(REDIRECT_URI)
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
