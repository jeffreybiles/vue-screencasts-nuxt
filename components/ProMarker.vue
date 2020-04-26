<template>
  <span v-if="isFree">
    <slot name="free"></slot>
  </span>
  <span v-else>
    <slot name="pro">
      <span v-if="isPro">
        <slot name="unlocked"><font-awesome-icon icon="lock-open" /></slot>
      </span>
      <span>
        <slot name="locked"><font-awesome-icon icon="lock" /></slot>
      </span>
      
    </slot>
  </span>
</template>

<script>
  export default {
    computed: {
      isPro(){
        let user = this.$auth.user
        return user && user.pro
      },
    },
    props: {
      isFree: {
        type: Boolean,
        required: true
      },
      video: {
        type: Object,
        required: true
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>