<template>
  <span v-if="isFree">
    <slot name="free"></slot>
  </span>
  <span v-else>
    <slot name="pro" :canAccess="canAccess">
      <span v-if="canAccess">
        <slot name="locked"><font-awesome-icon icon="lock" /></slot>
      </span>
      <span v-else>
        <slot name="unlocked"><font-awesome-icon icon="lock-open" /></slot>
      </span>
    </slot>
  </span>
</template>

<script>
  export default {
    computed: {
      canAccess(){
        let user = this.$auth.user
        return user && user.pro
      },

    },
    props: {
      isFree: {
        type: Boolean,
        required: true
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>