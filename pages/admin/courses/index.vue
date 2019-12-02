<template>
  <div>
    <v-data-table :items="processedCourses"
                  :headers="headers">
      <template #item.duration="{item}">
        <DurationDisplay :duration="item.duration" />
      </template>
    </v-data-table>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import DurationDisplay from '@/components/DurationDisplay';
  import courseDecorator from '@/utils/course-decorator';


  export default {
    components: {
      DurationDisplay
    },
    computed: {
      ...mapState({
        courses: state => state.courses.courses
      }),
      processedCourses(){
        return this.courses.map(c => {
          return courseDecorator(c, this.$store)
        })
      },
      headers(){
        return [
          {text: 'Name', value: 'name'},
          {text: "Type", value: 'series_type'},
          {text: "# chapters", value: 'numChapters'},
          {text: "# videos", value: 'numVideos'},
          {text: "duration", value: 'duration'}
        ]
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>