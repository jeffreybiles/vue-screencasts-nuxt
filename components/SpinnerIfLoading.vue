<template>
  <div>
    <div v-if="loading">
      <spinner size="large" class="mt-4" />
    </div>
    <div v-else>
      <slot />
    </div>
  </div>
</template>

<script>
  import Spinner from 'vue-simple-spinner/src/components/Spinner.vue'

  export default {
    components: {
      Spinner
    },
    props: {
      loading: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>