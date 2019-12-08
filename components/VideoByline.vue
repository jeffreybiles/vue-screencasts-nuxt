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
    <span v-if="video.course_id">
      &nbsp; | &nbsp;
      Part {{ partNumber }} of {{ course.name }}
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
      },
      course(){
        return this.getCourse(this.video.course_id)
      },
      partNumber(){
        let sortedCourse = sortCourse(this.course, this.$store);
        let index = sortedCourse.sortedItems.indexOf(this.video)
        return index + 1
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