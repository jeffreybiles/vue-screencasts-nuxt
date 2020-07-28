<template>
  <div>
    <div class="course-content-table">
      <v-expansion-panels accordion multiple>
        <v-expansion-panel v-for="courseItem in sortedCourse.sortedItems" :key="courseItem.name">
          <span v-if="courseItem && courseItem.chapter_ids">
            <CourseContentChapterRow :chapter="courseItem" 
                                     :isAdminScreen="isAdminScreen" 
                                     :course="sortedCourse" 
                                     :videoClickAction="clickAction" 
                                     :highlightedVideo="highlightedVideo" />
          </span>
          <span v-else>
            <CourseContentVideoRow :video="courseItem" 
                                   :isAdminScreen="isAdminScreen" 
                                   :course="sortedCourse" 
                                   :clickAction="clickAction" 
                                   :highlightedVideo="highlightedVideo"
                                   :compact="compact" />
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
        <div v-else-if="isAddingChapter">
          <v-autocomplete :items="addableChapters"
                          v-model="chapterToAdd"
                          item-text="name"
                          return-object
                          @change="attachChapter"
                          label="Chapter to Add" />
          <v-btn :disabled="!chapterToAdd" @click="attachChapter">Attach to course</v-btn>
        </div>
        <div v-else>
          <v-btn @click="isAddingVideo = true">+ Video</v-btn>
          <span v-if="course.series_type == 'course'">
            <v-btn @click="isAddingChapter = true">+ Chapter</v-btn>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import CourseContentChapterRow from '@/components/CourseContentChapterRow.vue';
  import CourseContentVideoRow from '@/components/CourseContentVideoRow.vue';
  import { mapGetters, mapState } from 'vuex';
  import _ from 'lodash';
  import { sortCourse } from '@/utils/course-decorator.js';
  
  export default {
    data(){
      return {
        isAddingVideo: false,
        isAddingChapter: false,
        chapterToAdd: null,
        videoToAdd: null,
      }
    },
    components: {
      CourseContentChapterRow,
      CourseContentVideoRow
    },
    computed: {
      ...mapState({
        videos: state => state.videos.videos,
        courses: state => state.courses.courses
      }),
      sortedCourse() {
        return sortCourse(this.course, this.$store)
      },
      addableVideos(){
        return _.filter(this.videos, v => !v.course_id)
      },
      addableChapters(){
        return _.filter(this.courses, c => (c.series_type !== 'course' && !c.parent_id))
      }
    },
    methods: {
      async attachVideo(){
        let {video, course} = await this.$store.dispatch('courses/attachVideo', {video: this.videoToAdd, course: this.course})
        this.isAddingVideo = false
        this.videoToAdd = null
      },
      async attachChapter(){
        await this.$store.dispatch('courses/attachChapter', {chapter: this.chapterToAdd, course: this.course})
        this.isAddingChapter = false
        this.chapterToAdd = null
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
      },
      clickAction: {
        type: Function,
        default: function(video) {
          this.$router.push(`/watch/${video.id}`);
        }
      },
      highlightedVideo: {
        type: Object
      },
      compact: {
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