<template>
  <div>
    <h1>{{course.name}}</h1>
    <v-row>
      <v-col cols="0" sm="4">
        <v-img :src="course.image_url || ''" class="thumbnail-image" />
      </v-col>
      <v-col cols="12" sm="8">
        type: {{ course.series_type }}<br>

        {{ course.numChapters}} chapters,
        {{ course.numVideos }} videos,
        <duration-display :duration="course.duration" /> total runtime<br>

        <markdown-display :markdown="course.description" />
      </v-col>
    </v-row>

    <!-- TODO: Display chapters and videos here -->
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import MarkdownDisplay from '@/components/MarkdownDisplay.vue';
  import DurationDisplay from '@/components/DurationDisplay.vue';
  import decorateCourse from '@/utils/course-decorator';

  export default {
    components: {
      MarkdownDisplay,
      DurationDisplay
    },
    computed: {
      ...mapGetters({
        getCourse: 'courses/get'
      }),
      course(){
        let course = this.getCourse(this.$route.params.id)
        return decorateCourse(course, this.$store)
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>