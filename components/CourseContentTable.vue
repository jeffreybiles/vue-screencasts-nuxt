<template>
  <div>
    <div class="course-content-table">
      <v-expansion-panels accordion multiple>
        <v-expansion-panel v-for="courseItem in courseItems" :key="courseItem.name">
          <CourseContentTableRow :courseItem="courseItem" :isAdminScreen="isAdminScreen" />
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
  </div>
</template>

<script>
  import CourseContentTableRow from '@/components/CourseContentTableRow.vue';
  import { mapGetters } from 'vuex';
  import _ from 'lodash'
  
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
        let allItems = videos.concat(courses)
        return _.sortBy(allItems, 'order')
      }
    },
    props: {
      course: {
        type: Object,
        required: true
      },
      isAdminScreen: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style lang="scss" scoped>
  ::v-deep .course-content-chapter {
    border: solid 1px black;
    padding: 10px;
  }
</style>