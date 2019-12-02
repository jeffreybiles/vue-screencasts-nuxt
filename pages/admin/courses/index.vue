<template>
  <div>
    <v-data-table :items="processedCourses"
                  :headers="headers"
                  @click:row="goToCourse">
      <template #item.duration="{item}">
        <DurationDisplay :duration="item.duration" />
      </template>
      <template #item.actions="{item}">
        <td @click.stop class="non-clickable">
          <v-btn small :to="`/courses/${item.id}`">View</v-btn>
          <v-btn small :to="`/admin/courses/${item.id}/edit`">Edit</v-btn>
          <!-- <v-btn small @click="deleteCourse(item)">Delete</v-btn> -->
        </td>
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
          {text: "Duration", value: 'duration'},
          {text: "Actions", value: 'actions', sortable: false, width: "300px"}
        ]
      }
    },
    methods: {
      goToCourse(course) {
        this.$router.push(`/admin/courses/${course.id}`)
      }
    }
  }
</script>

<style lang="scss" scoped>
  ::v-deep tbody tr {
    cursor: pointer;
  }

  ::v-deep tbody tr td.non-clickable{
    cursor: auto;
  }
</style>