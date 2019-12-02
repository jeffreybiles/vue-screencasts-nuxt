<template>
  <div>
    <span v-if="isCourse">
      <h1>{{courseItem.name}}</h1>

      <div v-for="video in decoratedCourse.videos" :key="video.id">
        <course-item-row :courseItem="video" :indent="true" />
      </div>
    </span>
    <span v-else>
      <h2>
        <span v-if="indent">&nbsp; &nbsp;</span>
        {{courseItem.name}}
      </h2>
    </span>
  </div>
</template>

<script>
  import CourseItemRow from '@/components/CourseItemRow';
  import courseDecorator from '@/utils/course-decorator';

  export default {
    name: 'course-item-row',
    components: {
      CourseItemRow
    },
    computed: {
      isCourse() { return !!this.courseItem.chapter_ids },
      decoratedCourse() { return courseDecorator(this.courseItem, this.$store)}
    },
    props: {
      courseItem: {
        type: Object,
        required: true
      },
      indent: Boolean
    },
  }
</script>

<style lang="scss" scoped>

</style>