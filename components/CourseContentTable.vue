<template>
  <div>
    <div class="course-content-table">
      <v-expansion-panels accordion multiple>
        <v-expansion-panel v-for="courseItem in courseItems" :key="courseItem.name">
          <span v-if="courseItem && courseItem.chapter_ids">
            <CourseContentChapterRow :chapter="courseItem" :isAdminScreen="isAdminScreen" />
          </span>
          <span v-else>
            <CourseContentVideoRow :video="courseItem" :isAdminScreen="isAdminScreen" :course="course" />
          </span>
        </v-expansion-panel>
      </v-expansion-panels>

      <div v-if="isAdminScreen">
        <div v-if="isAddingVideo">
          <v-autocomplete :items="addableVideos"
                          v-model="videoToAdd"
                          item-text="name"
                          return-object
                          @change="attachVideo"
                          label="Video to Add" />
        </div>
        <div v-else>
          <v-btn @click="isAddingVideo = true">+ Video</v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import CourseContentChapterRow from '@/components/CourseContentChapterRow.vue';
  import CourseContentVideoRow from '@/components/CourseContentVideoRow.vue';
  import { mapGetters, mapState } from 'vuex';
  import _ from 'lodash'
  
  export default {
    data(){
      return {
        isAddingVideo: false,
        videoToAdd: null,
      }
    },
    components: {
      CourseContentChapterRow,
      CourseContentVideoRow
    },
    computed: {
      ...mapGetters({
        getCourse: 'courses/get',
        getVideo: 'videos/get'
      }),
      ...mapState({
        videos: state => state.videos.videos,
      }),
      courseItems(){
        let videos = this.course.video_ids.map(v => this.getVideo(v))
        let courses = this.course.chapter_ids.map(c => this.getCourse(c)).map(c => { return {...c, type: 'course'}})
        let allItems = videos.concat(courses)
        return allItems.sort((i, j) => {
          return (Number(i.order) > Number(j.order)) ? 1 : -1
        })
      },
      addableVideos(){
        return _.filter(this.videos, v => !v.course_id)
      },
      }
    },
    methods: {
      async attachVideo(){
        let {video, course} = await this.$store.dispatch('courses/attachVideo', {video: this.videoToAdd, course: this.course})
        this.isAddingVideo = false
        this.videoToAdd = null
      },
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