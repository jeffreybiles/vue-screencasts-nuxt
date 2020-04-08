<template>
  <div>
    <v-container>
      <v-text-field
        v-model="search"
        single-line
        hide-details>
        <template #label>
          &nbsp; Search in all {{publishedVideos.length}} videos
        </template>
      </v-text-field>
      <div class="search-result-tables">
        <div class="headline">
          {{ search.length > 0 ? `Videos with '${search}' in the title or description` : 'Recent videos'}}:
        </div>
        <VideoTable
          :videos="itemsFilteredByTitleOrDescription"
          :headers="isMobile ? mobileHeaders : headers"
          :show-expand="!isMobile"
          :itemsPerPage="1000"
        />
        <template v-if="isSecondTableAvailable">
          <div class="headline">
            {{ `Videos with '${search}' in the code summary or transcription` }}
          </div>
          <VideoTable
            :videos="itemsFilteredBySummary"
            :headers="isMobile ? mobileHeaders : headers"
            :show-expand="!isMobile"
            :itemsPerPage="1000"
          />
        </template>
      </div>
    </v-container>
  </div>
</template>

<script>
  import {mapGetters, mapState} from 'vuex'
  import VideoTable from '@/components/VideoTable.vue';
  import _ from 'lodash'

  export default {
    middleware: 'load-videos-and-courses',

    data(){
      return {
        search: '',
        headers: [
          {text: 'Played', value: 'played', sortable: false, width: "65px"},
          {text: 'Status', value: 'pro', sortable: false, width: "75px"},
          {text: 'Name', value: 'name'},
          {text: 'Date', value: 'sortable_published_at'},
          {text: 'Duration', value: 'duration'},
          {text: 'Course', value: 'courseName'},
        ],
        mobileHeaders: [
          {text: 'Name', value: 'name'},
          {text: 'Date', value: 'sortable_published_at'},
          {text: 'Duration', value: 'duration'},
        ]
      }
    },
    components: {
      VideoTable
    },
    computed: {
      ...mapState({
        allVideos: state => state.videos.videos,
      }),
      ...mapGetters({
        getCourse: 'courses/get'
      }),
      isMobile() {
        return this.$vuetify.breakpoint.xsOnly
      },
      publishedVideos(){
        return this.allVideos.filter(v => v.published_at < Date.now())
      },
      isSecondTableAvailable() {
        return this.search.length > 0 && this.itemsFilteredBySummary.length > 0
      },
      mungedVideos(){
        return this.publishedVideos.map((v)=>{
          let course = this.getCourse(v.course_id)
          let courseName = course && course.name
          courseName = courseName && courseName.length > 33  ? `${courseName.slice(0, 30)}...` : courseName
          return {
            ...v,
            sortable_published_at: v.published_at && v.published_at.toISOString(),
            courseName,
          }
        })
      },
      itemsFilteredByTitleOrDescription() {
        if(this.search.length === 0) { return this.mungedVideos }

        let isInName = (item) => RegExp(this.search, 'i').test(item.name)
        let isInDescription = (item) => RegExp(this.search, 'i').test(item.description)

        return this.mungedVideos.filter(item => isInName(item) || isInDescription(item))
      },
      itemsFilteredBySummary() {
        let isSearchTermInItemCodeSummary = (item) => RegExp(this.search, 'i').test(item.code_summary)
        return this.mungedVideos.filter(item => isSearchTermInItemCodeSummary(item));
      },
    }
  }
</script>

<style lang="scss" scoped>

</style>
