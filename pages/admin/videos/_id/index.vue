<template>
  <div>
    <div class="display-1 pt-3">{{video.name}}</div>
    <VideoByline :video="video" />
    
    <v-row>
      <v-col cols="12" sm="6" md="8">
        <MarkdownDisplay :markdown="video.description" />
        <v-autocomplete :items="courses"
                        item-text="name"
                        v-model="courseAssignment"
                        label="Assigned to Course..."
                        return-object />
      </v-col>
      <v-col cols="12" sm="6" md="4">
        <VideoWatch :video="video" />
      </v-col>
    </v-row>
   
    <v-btn :to="`/admin/videos/${video.id}/edit`">Edit</v-btn>
    <v-btn :to="`/watch/${video.id}`">Watch</v-btn>
    <v-btn v-if="courseAssignment" :to="`/admin/courses/${courseAssignment.id}`">Go To Course</v-btn>

    <hr class="mt-4">

    <h3 class="mt-3">Code Summary</h3>
    <MarkdownDisplay :markdown="video.code_summary" />
  </div>
</template>

<script>
  import { mapState, mapGetters } from 'vuex';
  import _ from 'lodash';
  import VideoByline from '@/components/VideoByline';
  import MarkdownDisplay from '@/components/MarkdownDisplay';
  import VideoWatch from '@/components/VideoWatch';
  import { orderValueOfLastItem } from '@/utils/course-decorator';

  export default {
    components: {
      VideoByline,
      MarkdownDisplay,
      VideoWatch,
    },
    computed: {
      ...mapState({
        videos: state => state.videos.videos,
        courses: state => state.courses.courses
      }),
      ...mapGetters({
        getCourse: 'courses/get'
      }),
      video(){
        return this.videos.find(v => v.id == this.$route.params.id) || {};
      },
      courseAssignment: {
        get(){
          return this.getCourse(this.video.course_id);
        },
        async set(newCourse) {
          this.video.course_id = newCourse.id
          this.video.order = orderValueOfLastItem(newCourse, this.$store) + 1
          this.$store.dispatch('videos/edit', this.video)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>