<template>
  <span>
    <!-- TODO: Make these look nicer -->
    <!-- Maybe do the vertical bars, and then for "beginner to advanced", make the first green, the second blue, and the third purple-->
    <span v-if="difficulty == 'beginner'">
      <font-awesome-icon icon="minus" :color="color" />
    </span>
    <span v-if="difficulty == 'intermediate'">
      <font-awesome-icon icon="grip-lines" :color="color" />
    </span>
    <span v-if="difficulty == 'advanced'">
      <font-awesome-icon icon="bars" :color="color" />
    </span>

    <span v-if="verbosity != 'low'">
      {{ difficulty[0].toUpperCase() + difficulty.slice(1) }} 
      <span v-if="verbosity == 'high'">Difficulty</span>
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
      verbosity: {
        type: String,
        default: 'low'
      },
      color: {
        type: String,
        default: 'green'
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>