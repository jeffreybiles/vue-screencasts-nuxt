<template>
  <v-container>
    <CourseInfo :course="course" v-slot="{duration, numVideos}">
      <h1>{{ course.name }}</h1>
      <v-img :src="course.image_url || ''" class="thumbnail-image" />
      <br>
      <div>{{numVideos}} videos</div>
      <div>Total length: <DurationDisplay :duration="duration" /></div>

      <div v-for="courseItem in courseItems" :key="courseItem.name">
        <CourseItemRow :courseItem="courseItem" />
      </div>
    </CourseInfo>
  </v-container>
</template>

<script>
  import { mapGetters } from 'vuex';
  import CourseInfo from '@/components/CourseInfo'
  import DurationDisplay from '@/components/DurationDisplay'
  import CourseItemRow from '@/components/CourseItemRow'

  export default {
    components: {
      CourseInfo,
      DurationDisplay,
      CourseItemRow
    },
    computed: {
      ...mapGetters({
        getCourse: 'courses/get',
        getVideo: 'videos/get'
      }),
      course(){
        return this.getCourse(this.$route.params.id)
      },
      courseItems(){
        let videos = this.course.video_ids.map(v => this.getVideo(v))
        let courses = this.course.chapter_ids.map(c => this.getCourse(c)).map(c => { return {...c, type: 'course'}})
        return videos.concat(courses) //TODO: sort once ordering is in
      }
    }
  }
</script>

<style lang="scss" scoped>
  .thumbnail-image {
    max-width: 500px;
    margin: auto;
  }
</style>