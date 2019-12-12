<template>
  <v-container>
    <h2>Editing email options for {{ user.email }}</h2>
    <UserEmailOptionsUpdate :user="user" :updateMethod="(user) => this.$store.dispatch('user/updateEmail', {user, token})" />
  </v-container>
</template>

<script>
  import UserEmailOptionsUpdate from '@/components/UserEmailOptionsUpdate.vue';

  export default {
    async asyncData({store, params}){
      let id = params.id
      let token = params.email_subscription_token
      let user = await store.dispatch('user/loadByIdAndToken', {id, token});

      return {
        user,
        token
      }
    },
    components: {
      UserEmailOptionsUpdate
    }
  }
</script>

<style lang="scss" scoped>

</style>