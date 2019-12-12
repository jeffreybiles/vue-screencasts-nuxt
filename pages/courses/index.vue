<template>
  <v-container class="d-flex flex-wrap">
    <div v-for="course in courses" :key="course.id">
      <CourseRow :course="course" />
    </div>
  </v-container>
</template>

<script>
  import axios from 'axios';
  import { mapGetters } from 'vuex';
  import CourseRow from '@/components/CourseRow.vue';

  export default {
    components: {
      CourseRow
    },
    computed: {
      ...mapGetters({
        courses: 'courses/topLevel'
      }),
    }
  }
</script>

<style lang="scss" scoped>

</style>