<template>
  <v-container>
    <v-tabs>
      <v-tab to="/admin/videos">Videos</v-tab>
      <v-tab to="/admin/tags">Tags</v-tab>
    </v-tabs>
    <router-view></router-view>
  </v-container>
</template>

<script>
  export default {
    middleware: ['auth-admin']
  }
</script>

<style lang="scss" scoped>

</style>