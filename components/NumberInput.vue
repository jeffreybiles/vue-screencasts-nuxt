<template>
  <v-text-field
    :value="value"
    @input="$emit('input', $event)"
    type="number"
    :min="min || null"
    :max="max || null"
    :label="label"
    append-outer-icon="mdi-plus-box"
    @click:append-outer="increment"
    prepend-icon="mdi-minus-box"
    @click:prepend="decrement"
  />
</template>

<script>
    export default {
        name: "NumberInput",
        props: {
          value: {
            type: Number,
            required: true
          },
          min: {
            type: Number,
            default: null
          },
          max: {
            type: Number,
            default: null
          }
        },
        methods: {
          increment() {
            const newValue = this.value + 1
            if (this.max && newValue > this.max) {
              return
            }
            this.$emit('input', newValue)
          },
          decrement() {
            const newValue = this.value - 1
            if (this.min && newValue < this.min) {
              return
            }
            this.$emit('input', newValue)
          }
        }
    }
</script>

<style scoped>

</style>
