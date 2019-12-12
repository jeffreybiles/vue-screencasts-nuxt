<template>
  <v-row>
    <v-col cols="3">
      <v-img :src="course.image_url || ''" />
    </v-col>
    <v-col cols="9">
      <h3>{{ course.name }}</h3>

      <MarkdownDisplay :markdown="course.description" />
    </v-col>
  </v-row>
</template>

<script>
  import ProgressBar from '@/components/ProgressBar.vue';
  import MarkdownDisplay from '@/components/MarkdownDisplay.vue';

  export default {
    components: {
      ProgressBar,
      MarkdownDisplay
    },

    computed: {
      decoratedCourse(){
        return courseDecorator(this.course, this.$store)
      },
    },
    props: {
      course: {
        type: Object,
        required: true
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>