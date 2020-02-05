<template>
  <span>
    <font-awesome-icon :icon="icon" />
  </span>
</template>

<script>
  export default {
    computed: {
      icon(){
        let icons = {
          Lesson: 'desktop',
          Exercise: 'keyboard',
          Answer: 'lightbulb',
          Challenge: 'graduation-cap',
        }
        return icons[this.video.lesson_type || 'Lesson']
      }
    },
    props: {
      video: {
        type: Object,
        required: true
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>