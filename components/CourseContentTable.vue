<template>
  <div>
    <div class="course-content-table">
      <v-expansion-panels accordion multiple>
        <v-expansion-panel v-for="courseItem in courseItems" :key="courseItem.name">
          <CourseContentTableRow :courseItem="courseItem" />
        </v-expansion-panel>
      </v-expansion-panels>
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
  ::v-deep .course-content-chapter {
    border: solid 1px black;
    padding: 20px;
  }
</style>