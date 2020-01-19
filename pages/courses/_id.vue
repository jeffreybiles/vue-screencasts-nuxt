<template>
  <v-container>
    <v-row>
      <v-col cols="0" sm="4">
        <v-img :src="thumbnail || ''" class="thumbnail-image mb-2" />

        <v-row class="ma-0">
          <DifficultyBars :difficulty="course.difficulty" :verbose="true" />
          
          <v-spacer />

          <v-btn :to="`/watch/${firstUnplayedVideo.id}`" class="green accent-3">
            <span v-if="isComplete">Restart</span>
            <span v-else-if="hasPlayedVideos">Continue</span>
            <span v-else>Start</span>
          </v-btn>
        </v-row>

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
  import courseDecorator, { sortCourse, percentVideosComplete } from '../../utils/course-decorator';
  import MarkdownDisplay from '@/components/MarkdownDisplay.vue';
  import DifficultyBars from '@/components/DifficultyBars.vue';
  import {getCourseThumbnail} from '@/utils/video-decorator';

  export default {
    components: {
      DurationDisplay,
      CourseContentTable,
      MarkdownDisplay,
      DifficultyBars
    },
    computed: {
      ...mapGetters({
        getCourse: 'courses/get',
      }),
      course(){
        let course = this.getCourse(this.$route.params.id)
        return courseDecorator(course, this.$store);
      },
      sortedVideos(){
        let getVideo = this.$store.getters['videos/get']

        let course = sortCourse(this.course, this.$store)

        // this is a candidate for a utility (deep-sort?)
        return course.sortedItems.map(i => {
          if(i.video_ids) {
            return i.video_ids.map(id => {
              let video = getVideo(id)
              return {...video, order: Number(i.order) * 100 + Number(video.order)}
            })
          } else {
            return {...i, order: Number(i.order) * 100}
          }
        }).flat().sort((i, j) => {
          return (i.order > j.order) ? 1 : -1
        })
      },
      percentComplete(){
        return percentVideosComplete(this.sortedVideos, this.$store);
      },
      hasPlayedVideos(){
        return this.percentComplete > 0
      },
      isComplete(){
        return this.percentComplete == 100
      },
      firstUnplayedVideo(){
        let isPlayed = this.$store.getters['user/videoIsPlayed']

        if(this.isComplete) {
          return this.sortedVideos[0]
        } else if(this.hasPlayedVideos) {
          return this.sortedVideos.filter(v => !isPlayed(v.id))[0]
        } else {
          return this.sortedVideos[0]
        }
      },
      thumbnail(){
        return getCourseThumbnail(this.course.id, this.$store).split(' ').join('+');
      }
    },
  }
</script>

<style lang="scss" scoped>
  .thumbnail-image {
    max-width: 500px;
    margin: auto;
  }
</style>