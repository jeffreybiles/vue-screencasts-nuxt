<template>
  <div>
    <v-btn :to="`/admin/courses/new`" class="mt-2">Create Course</v-btn>
    <v-text-field
      v-model="search"
      single-line
      hide-details>
      <template #label>
        &nbsp; Search titles of all {{courses.length}} courses
      </template>
    </v-text-field>
    <v-data-table :items="processedCourses"
                  :headers="headers"
                  :search="search"
                  :custom-filter="filter"
                  @click:row="goToCourse">
      <template #item.duration="{item}">
        <DurationDisplay :duration="item.duration" />
      </template>
      <template #item.actions="{item}">
        <td @click.stop class="non-clickable">
          <v-btn small :to="`/courses/${item.id}`">View</v-btn>
          <v-btn small :to="`/admin/courses/${item.id}/edit`">Edit</v-btn>
          <v-btn small @click="deleteCourse(item)">Delete</v-btn>
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
    data(){
      return {
        search: ''
      }
    },
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
          {text: "Difficulty", value: 'difficulty'},
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
      },
      deleteCourse(course) {
        let isConfirmed = confirm(`Are you sure you want to delete ${course.name}?  This cannot be undone.`)
        if(isConfirmed){
          this.$store.dispatch('courses/delete', course)
        }
      },
      filter(value, search, item) {
        console.log("search", value, search)
        let inName = RegExp(search, 'i').test(item.name)
  
        return inName;
      },
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