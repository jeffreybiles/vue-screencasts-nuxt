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
        <div v-if="['standalone_chapter', 'chapter'].includes(course.series_type)">
          <v-autocomplete label="Chapter is part of..."
                          :items="topLevelCourses"
                          item-text="name"
                          return-object
                          v-model="parentCourse" />
        </div>
      </v-col>
    </v-row>

    <CourseContentTable :course="course" :isAdminScreen="true" />
  </div>
</template>

<script>
  import {mapGetters, mapState} from 'vuex';
  import MarkdownDisplay from '@/components/MarkdownDisplay.vue';
  import DurationDisplay from '@/components/DurationDisplay.vue';
  import decorateCourse from '@/utils/course-decorator';
  import CourseContentTable from '@/components/CourseContentTable.vue';
  import { orderValueOfLastItem } from '@/utils/course-decorator';


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
      ...mapState({
        courses: state => state.courses.courses
      }),
      course(){
        let course = this.getCourse(this.$route.params.id)
        return decorateCourse(course, this.$store)
      },
      parentCourse: {
        get(){
          return this.getCourse(this.course.parent_id)
        },
        set(newParentCourse) {
          this.course.parent_id = newParentCourse.id
          this.course.order = orderValueOfLastItem(newParentCourse, this.$store) + 1
          this.$store.dispatch('courses/update', this.course)
        }
      },
      topLevelCourses(){
        return this.courses.filter(c => c.series_type == 'course')
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>