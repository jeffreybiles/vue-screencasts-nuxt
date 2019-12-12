<template>
  <v-app-bar app color="green">
    <v-btn text to="/">Vue Screencasts</v-btn>
    <v-btn text to="/videos">Videos</v-btn>
    <v-btn text to="/tags">Tags</v-btn>
    <v-btn text to="/courses">Courses</v-btn>
    <v-btn text to="/admin/videos" v-if="$auth.user && $auth.user.admin">
      Admin
    </v-btn>

    <v-spacer />
    
    <div v-if="$auth.loggedIn">
      <v-btn text to="/user">{{ $auth.user.email }}</v-btn>
      <v-btn text @click="$auth.logout()">Logout</v-btn>
    </div>
    <div v-else>
      <v-btn text to="/login">Login</v-btn>
      <v-btn text to="/register">Register</v-btn>
    </div>
  </v-app-bar>
</template>

<script>
  export default {
    
  }
</script>

<style lang="scss" scoped>

</style>