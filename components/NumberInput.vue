<template>
  <v-text-field
    class="number-input-field"
    :style="style"
    :value="value"
    @input="$emit('input', $event)"
    type="number"
    :min="min"
    :max="max"
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
      label: {
        type: String,
        default: null
      },
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
      },
      width: {
        type: [Number, String],
        default: null
      }
    },
    computed: {
      style() {
        return {
          width: this.width ? `${this.width}px` : 'unset'
        }
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

<style lang="sass">
  .number-input-field
    .v-input__slot
      input
        text-align: center
</style>
