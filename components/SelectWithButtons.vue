<template>
  <div class="select-buttons">
    <p class="select-buttons__title" v-if="title.length > 0">{{ title }}</p>
    <v-btn-toggle
      :value="value"
      @change="$emit('change', $event)"
      :color="color"
      mandatory
      borderless
    >
      <slot />
    </v-btn-toggle>
  </div>
</template>

<script>
    export default {
        name: "SelectWithButtons",
        props: {
          title: {
            type: String,
            default: ''
          },
          value: {
            type: [Number, String, Object],
            default: null
          },
          color: {
            type: String,
            default: 'green'
          }
        }
    }
</script>

<style lang="sass" scoped>
.select-buttons
  margin: 10px 0
  &__title
    margin: 0
</style>
