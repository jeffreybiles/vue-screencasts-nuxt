<template>
  <v-container>
    <v-sheet v-if="$route.query.redirect" color="green lighten-3" class="text-center">
      Log in or register to access {{$route.query.redirect}}.
    </v-sheet>
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
