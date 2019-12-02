<template>
  <v-container>
    <h1>{{ course.name }}</h1>
    <v-img :src="course.image_url || ''" class="thumbnail-image" />
    <br>
    <div>{{course.numVideos}} videos</div>
    <div>Total length: <DurationDisplay :duration="course.duration" /></div>

    <CourseContentTable :course="course" />
  </v-container>
</template>

<script>
  import { mapGetters } from 'vuex';
  import DurationDisplay from '@/components/DurationDisplay'
  import CourseContentTable from '@/components/CourseContentTable'
  import courseDecorator from '../../utils/course-decorator';

  export default {
    components: {
      DurationDisplay,
      CourseContentTable
    },
    computed: {
      ...mapGetters({
        getCourse: 'courses/get',
      }),
      course(){
        let course = this.getCourse(this.$route.params.id)
        return courseDecorator(course, this.$store);
      },
    }
  }
</script>

<style lang="scss" scoped>
  .thumbnail-image {
    max-width: 500px;
    margin: auto;
  }
</style>