<template>
  <v-container>
    <h1>Settings</h1>

    Name: {{user.name}}<br>
    Email: {{user.email}}<br>
    Created account on: <DateDisplay :date="new Date(user.created_at)" /><br>
    The ability to edit name, email, and password are coming soon.  Thanks for your patience!
    <hr>

    <h3>Email Settings</h3>
    <UserEmailOptionsUpdate :user="user" />
  </v-container>
</template>

<script>
  import DateDisplay from '@/components/DateDisplay.vue';
  import UserEmailOptionsUpdate from '@/components/UserEmailOptionsUpdate.vue';
  export default {
    components: {
      DateDisplay,
      UserEmailOptionsUpdate
    },
    computed: {
      user(){
        return this.$auth.user;
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>