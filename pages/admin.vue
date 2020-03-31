<template>
  <v-container>
    <v-tabs>
      <v-tab to="/admin/videos">Videos</v-tab>
      <v-tab to="/admin/courses">Courses</v-tab>
      <v-tab to="/admin/code-summary">Code Summary</v-tab>
    </v-tabs>
    <router-view></router-view>
  </v-container>
</template>

<script>
  export default {
    middleware: ['auth-admin', 'load-videos-and-courses']
  }
</script>

<style lang="scss" scoped>

</style>