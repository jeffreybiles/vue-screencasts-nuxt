<template>
  <v-container>

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
    middleware: 'load-videos-and-courses',
    components: {
      DurationDisplay,
      CourseContentTable,
      MarkdownDisplay,
      DifficultyBars
    },
    created(){
      this.$router.replace(`/watch/${ this.firstUnplayedVideo.id }`);
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
    head(){
      let title = `${this.course.name} - VueScreencasts Course`

      return {
        title: title,
        meta: [
          {hid: 'description', property: 'description', content: this.course.description},
          {hid: 'twitter-description', property: 'twitter:description', content: this.course.description},
          {hid: 'og-title', property: 'og:title', content: title},
          {hid: 'og-type', property: 'og:type', content: 'website'},
          {hid: 'og-url', property: 'og:url', content: `https://www.vuescreencasts.com/courses/${this.course.id}`},
          {hid: 'og-site-name', property: 'og:site_name', content: "VueScreencasts.com"},
          {hid: 'og-image', property: 'og:image', content: this.thumbnail},
          {hid: 'og-image-url', property: 'og:image:url', content: this.thumbnail},
          {hid: 'og-image-width', property: 'og:image:width', content: 1280},
          {hid: 'og-image-height', property: 'og:image:height', content: 720},
          {hid: 'og-image-type', property: 'og:image:type', content: "image/jpeg"},
          {hid: 'twitter-img-src', name: 'twitter:image:src', property: 'twitter:image:src', content: this.thumbnail},
          {hid: 'twitter-title', property: 'twitter:title', content: title},
          {hid: 'og-description', property: 'og:description', content: this.course.description},
        ]
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