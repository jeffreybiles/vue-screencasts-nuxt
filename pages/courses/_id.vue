<template>
  <v-container>
    <v-row>
      <v-col cols="0" sm="4">
        <v-img :src="course.image_url || ''" class="thumbnail-image" />
      </v-col>
      <v-col cols="12" sm="8">
        <h1>{{ course.name }}</h1>
        {{ course.numChapters}} chapters,
        {{ course.numVideos }} videos,
        <duration-display :duration="course.duration" /> total runtime<br>
        <hr>
        <MarkdownDisplay :markdown="course.description" />
      </v-col>
    </v-row>
    <CourseContentTable :course="course" />
  </v-container>
</template>

<script>
  import { mapGetters } from 'vuex';
  import DurationDisplay from '@/components/DurationDisplay'
  import CourseContentTable from '@/components/CourseContentTable'
  import courseDecorator from '../../utils/course-decorator';
  import MarkdownDisplay from '@/components/MarkdownDisplay.vue';

  export default {
    components: {
      DurationDisplay,
      CourseContentTable,
      MarkdownDisplay
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