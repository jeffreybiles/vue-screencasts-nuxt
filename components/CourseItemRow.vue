<template>
  <div>
    <span v-if="courseItem.type == 'course'">
      <h1>{{courseItem.name}}</h1>

      <CourseInfo :course="courseItem" v-slot="{videos, duration}">
        <div v-for="video in videos" :key="video.id">
          <course-item-row :courseItem="video" :indent="true" />
        </div>
      </CourseInfo>
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
  import CourseInfo from '@/components/CourseInfo';
  import CourseItemRow from '@/components/CourseItemRow';

  export default {
    name: 'course-item-row',
    components: {
      CourseInfo,
      CourseItemRow
    },
    props: {
      courseItem: {
        type: Object,
        required: true
      },
      indent: Boolean
    }  
  }
</script>

<style lang="scss" scoped>

</style>