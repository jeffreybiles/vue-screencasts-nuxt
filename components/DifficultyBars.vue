<template>
  <span>
    <!-- TODO: Make these look nicer -->
    <span v-if="difficulty == 'beginner'">
      <font-awesome-icon icon="minus" color="green" />
    </span>
    <span v-if="difficulty == 'intermediate'">
      <font-awesome-icon icon="grip-lines" color="blue" />
    </span>
    <span v-if="difficulty == 'advanced'">
      <font-awesome-icon icon="bars" color="purple" />
    </span>

    <span v-if="verbose">
      {{ difficulty[0].toUpperCase() + difficulty.slice(1) }} Difficulty
    </span>
  </span>
</template>

<script>
  export default {
    props: {
      difficulty: {
        type: String,
        required: true
      },
      verbose: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>