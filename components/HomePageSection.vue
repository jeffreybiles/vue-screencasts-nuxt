<template>
  <section :class="`section ${classes}`" :id="sectionId">
    <div class="paper-container-large">
      <div class="row vertical-align-items">
        <slot />
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    props: {
      classes: {
        type: String,
        required: false
      },
      sectionId: {
        type: String,
        required: false
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>