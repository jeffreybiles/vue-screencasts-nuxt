<template>
  <div>
    <div v-for="courseItem in courseItems" :key="courseItem.name">
      <CourseContentTableRow :courseItem="courseItem" />
    </div>
  </div>
</template>

<script>
  import CourseContentTableRow from '@/components/CourseContentTableRow.vue';
  import { mapGetters } from 'vuex';
  
  export default {
    components: {
      CourseContentTableRow
    },
    computed: {
      ...mapGetters({
        getCourse: 'courses/get',
        getVideo: 'videos/get'
      }),
      courseItems(){
        let videos = this.course.video_ids.map(v => this.getVideo(v))
        let courses = this.course.chapter_ids.map(c => this.getCourse(c)).map(c => { return {...c, type: 'course'}})
        return videos.concat(courses) //TODO: sort once ordering is in
      }
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