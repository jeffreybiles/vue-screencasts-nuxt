<template>
  <div>
    <h1>Editing {{ video.name }} </h1>
    <nuxt-link :to="`/videos/${video.id}`">
      <button>Go back to show</button>
    </nuxt-link>
  </div>
</template>

<script>
  export default {
    props: ['video'],
    head: {
      title: "Edit"
    }
  }
</script>

<style lang="scss" scoped>

</style>