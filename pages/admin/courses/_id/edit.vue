<template>
  <div>
    <h1>Edit Course</h1>

    <CourseEditForm :course="course" 
                    :saveCourse="saveCourse" />
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import CourseEditForm from '@/components/CourseEditForm'

  export default {
    components: {
      CourseEditForm
    },
    computed: {
      ...mapGetters({
        getCourse: 'courses/get'
      }),
      course(){
        return this.getCourse(this.$route.params.id)
      }
    },
    methods: {
      async saveCourse(){
        await this.$store.dispatch('courses/update', this.course)
        this.$router.push(`/admin/courses/${this.course.id}`)
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>