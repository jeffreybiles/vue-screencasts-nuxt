<template>
  <div>
    <h1>Create New Course</h1>
    <CourseEditForm :course="course" :saveCourse="createCourse" />
  </div>
</template>

<script>
  import CourseEditForm from '@/components/CourseEditForm.vue';
  export default {
    data(){
      return {
        course: {}
      }
    },
    components: {
      CourseEditForm
    },
    methods: {
      async createCourse(){
        let newCourse = await this.$store.dispatch('courses/create', this.course)
        this.$router.push(`/admin/courses/${newCourse.id}`)
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>