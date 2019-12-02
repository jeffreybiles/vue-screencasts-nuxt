<template>
  <div>
    <h1>{{course.name}}</h1>
    <v-row>
      <v-col cols="0" sm="4">
        <v-img :src="course.image_url || ''" class="thumbnail-image" />
      </v-col>
      <v-col cols="12" sm="8">
        <v-btn :to="`/admin/courses/${course.id}/edit`">Edit</v-btn><br>
        type: {{ course.series_type }}<br>

        {{ course.numChapters}} chapters,
        {{ course.numVideos }} videos,
        <duration-display :duration="course.duration" /> total runtime<br>
        <hr>
        <markdown-display :markdown="course.description" />
      </v-col>
    </v-row>

    <CourseContentTable :course="course" :isAdminScreen="true" />
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import MarkdownDisplay from '@/components/MarkdownDisplay.vue';
  import DurationDisplay from '@/components/DurationDisplay.vue';
  import decorateCourse from '@/utils/course-decorator';
  import CourseContentTable from '@/components/CourseContentTable.vue';

  export default {
    components: {
      MarkdownDisplay,
      DurationDisplay,
      CourseContentTable
    },
    computed: {
      ...mapGetters({
        getCourse: 'courses/get'
      }),
      course(){
        let course = this.getCourse(this.$route.params.id)
        return decorateCourse(course, this.$store)
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>