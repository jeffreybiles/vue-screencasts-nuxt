<template>
  <div>
    <slot :numVideos="numVideos"
          :duration="duration"
          :videos="videos" />
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import _ from 'lodash'

  export default {
    computed: {
      ...mapGetters({
        getCourse: 'courses/get',
        getVideo: 'videos/get',
      }),
      videos(){
        let chapters = this.course.chapter_ids.map(c_id => this.getCourse(c_id))
        let video_ids = this.course.video_ids.concat(chapters.flatMap(c => c.video_ids))
        return video_ids.map(v_id => this.getVideo(v_id))
      },
      numVideos(){
        return this.videos.length
      },
      duration(){
        return _.sum(this.videos.map(v => v.duration))
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

</style>