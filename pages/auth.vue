<template>
  <v-container>
    <v-sheet color="green lighten-2" class="text-center" v-if="$route.query.redirect">
      You must be logged in to access {{$route.query.redirect}}.
    </v-sheet>

    <UserAuthTogglableForm :postLoginAction="redirect"
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
        let redirect_url = this.$route.query.redirect || '/'
        this.$router.push(redirect_url)
        
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>