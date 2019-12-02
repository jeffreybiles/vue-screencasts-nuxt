<template>
  <div>
    <span v-if="isCourse">
      <div class="course-content-chapter">
        <v-expansion-panel-header>
          <v-row>
            <v-col cols="9">
              <h1>{{decoratedCourse.name}}</h1>
            </v-col>
            <v-col cols="1">
              <DurationDisplay :duration="decoratedCourse.duration" />
            </v-col>
            <v-col cols="1">
              <!-- TODO: numCompletedVideos -->
              {{ decoratedCourse.numCompletedVideos }} / {{decoratedCourse.numVideos}}
            </v-col>
            <v-col cols="1">
              <!-- TODO: lastUpdatedAt -->
            </v-col>
          </v-row>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <div v-for="video in decoratedCourse.videos" :key="video.id">
            <course-content-table-row :courseItem="video" :indent="true" />
          </div>
        </v-expansion-panel-content>
      </div>
    </span>
    <span v-else>
      <v-row class="course-content-video">
        <v-col cols="1">
          <!-- IF in admin mode, have up or down arrows -->
          <!-- ELSE have played checkmark -->
        </v-col>
        <v-col cols="1"><DurationDisplay :duration="courseItem.duration" /></v-col>
        <v-col cols="10">
          {{courseItem.name}}
        </v-col>
      </v-row>
    </span>
  </div>
</template>

<script>
  import CourseContentTableRow from '@/components/CourseContentTableRow';
  import courseDecorator from '@/utils/course-decorator';
  import DurationDisplay from '@/components/DurationDisplay.vue';
  export default {
    name: 'course-content-table-row',
    components: {
      CourseContentTableRow,
      DurationDisplay
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