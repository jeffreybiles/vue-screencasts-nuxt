<template>
  <em>
    <DurationDisplay :duration="video.duration" />
    &nbsp; | &nbsp;
    <span v-if="publishedAt">
      Published on <DateDisplay :date="publishedAt" />
    </span>
    <span v-else>
      This video is not yet published
    </span>
    <span v-if="$slots.default">
      &nbsp; |  &nbsp; <slot />
    </span>
  </em>
</template>

<script>
  import DurationDisplay from '@/components/DurationDisplay'
  import DateDisplay from '@/components/DateDisplay'
  import { mapGetters } from 'vuex'
  import { sortCourse } from '@/utils/course-decorator.js';

  export default {
    components: {
      DurationDisplay,
      DateDisplay
    },
    computed: {
      ...mapGetters({
        getCourse: 'courses/get'
      }),
      publishedAt(){
        return this.video.published_at
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