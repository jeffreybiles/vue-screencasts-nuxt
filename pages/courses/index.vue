<template>
  <div class="course-index">
    <v-container>
      <div>
        <span>Difficulty</span>
        <v-btn-toggle v-model="difficulty" color="green darken-3">
          <v-btn v-for="dif in difficulties" :key="dif" :value="dif" small>
            {{dif}}
          </v-btn>
        </v-btn-toggle>
      </div>
      <div class="pt-3">
        <span>Progress</span>
        <v-btn-toggle v-model="completion" color="green darken-3">
          <v-btn v-for="prog in progress" :key="prog" :value="prog" small>
            {{prog}}
          </v-btn>
        </v-btn-toggle>
      </div>
      <div class="pt-3 pb-2">
        <span>Category</span>
        <v-btn-toggle v-model="category" color="green darken-3">
          <v-btn v-for="cat in categories" :key="cat" :value="cat" small>
            {{cat}}
          </v-btn>
        </v-btn-toggle>
      </div>

      <p><strong>{{sortedCourses.length}} course{{sortedCourses.length == 1 ? '' : 's'}}</strong> fit your criteria</p>
      <v-row>
        <v-col v-for="course in sortedCourses" 
              :key="course.id"
              cols="12" sm="6" lg="4">
          <CourseCard :course="course" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
  import axios from 'axios';
  import { mapGetters } from 'vuex';
  import CourseCard from '@/components/CourseCard';
  import _ from 'lodash';
  import { courseDecorator, percentVideosComplete } from '@/utils/course-decorator';

  export default {
    data(){
      return {
        difficulty: this.$route.query.difficulty || 'all',
        difficulties: [
          'all',
          'beginner',
          'intermediate',
          'advanced',
        ],
        completion: this.$route.query.completion || 'All',
        progress: [
          'All',
          'Fresh',
          'In Progress',
          'Completed'
        ],
        category: this.$route.query.category || 'all',
        categories: [
          'all',
          'Watch Me Code',
          'Interactive',
        ]
      }
    },
    components: {
      CourseCard
    },
    computed: {
      ...mapGetters({
        courses: 'courses/topLevel'
      }),
      sortedCourses(){
        return _.sortBy(this.filteredCourses, 'mostRecentVideo.published_at').reverse()
      },
      filteredCourses(){
        return this.courses.map(c => courseDecorator(c, this.$store)).filter(course => {
          let isReleased = course.published_at && course.published_at < Date.now()
          let percentComplete = percentVideosComplete(course.videos, this.$store)
          let progress = percentComplete == 0 ? 'Fresh' : percentComplete == 100 ? 'Completed' : 'In Progress'

          let progressTrue = this.completion == 'All' || this.completion == progress
          let difficultyTrue = this.difficulty == 'all' || course.difficulty == 'beginner to advanced' || this.difficulty == course.difficulty
          let categoryTrue = this.category == 'all' || this.category == course.category
          return progressTrue && difficultyTrue && isReleased && categoryTrue
        })
      }
    },
    watch: {
      difficulty: function(newValue) { this.replaceQueryParams() },
      completion: function(newValue) { this.replaceQueryParams() },
      category: function(newValue) { this.replaceQueryParams() }
    },
    methods: {
      replaceQueryParams(){
        this.$router.replace({
          query: {
            difficulty: this.difficulty,
            completion: this.completion,
            category: this.category,
          }
        })
      }
    },
    head(){
      let title = `VueScreencasts - ${this.courses.length} courses available`
      let description = "Come browse our ever-growing library of Vue-related video courses"
      return {
        title: title,
        meta: [
          {hid: 'description', property: 'description', content: description},
          {hid: 'og-description', property: 'og:description', content: description},
          {hid: 'twitter-description', property: 'twitter:description', content: description},
          {hid: 'og-title', property: 'og:title', content: title},
          {hid: 'twitter-title', property: 'twitter:title', content: title},
        ]
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>