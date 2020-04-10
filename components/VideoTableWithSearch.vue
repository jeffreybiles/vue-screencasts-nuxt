<template>
  <div>
    <v-text-field
      v-model="search"
      @input="handleQueryChange"
      single-line
      hide-details>
      <template #label>
        &nbsp; Search in all {{videos.length}} videos
      </template>
    </v-text-field>
    <div class="search-result-tables">
      <div class="headline">
        {{ search.length > 0 ? `Videos with '${search}' in the title or description` : 'Recent videos'}}:
      </div>
      <VideoTable
        :videos="itemsFilteredByTitleOrDescription"
        :headers="headers"
        :showExpand="showExpand"
        :customClickAction="customClickAction"
        :dense="dense"
        :itemsPerPage="itemsPerPage"
        :sortDesc="sortDesc"
      />
      <template v-if="isSecondTableAvailable">
        <div class="headline">
          {{ `Videos with '${search}' in the code summary or transcription` }}
        </div>
        <VideoTable
          :videos="itemsFilteredBySummary"
          :headers="headers"
          :showExpand="showExpand"
          :customClickAction="customClickAction"
          :dense="dense"
          :itemsPerPage="itemsPerPage"
          :sortDesc="sortDesc"
        />
      </template>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  import VideoTable from '@/components/VideoTable.vue';

  export default {
    components: {
      VideoTable
    },
    data(){
      return {
        search: '',
      }
    },

    mounted() {
      if (this.routeHasSearchQuery) {
        this.search = this.$route.query.q
      }
    },
    computed: {
      ...mapGetters({
        getCourse: 'courses/get'
      }),
      mungedVideos(){
        return this.videos.map((v)=>{
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
      isSecondTableAvailable() {
        return this.search.length > 0 && this.itemsFilteredBySummary.length > 0
      },
      itemsFilteredByTitleOrDescription() {
        if(this.search.length === 0) { return this.mungedVideos }

        let isInName = (item) => RegExp(this.search, 'i').test(item.name)
        let isInDescription = (item) => RegExp(this.search, 'i').test(item.description)

        return this.mungedVideos.filter(item => isInName(item) || isInDescription(item))
      },
      itemsFilteredBySummary() {
        let isInCodeSummary = (item) => RegExp(this.search, 'i').test(item.code_summary)

        return this.mungedVideos.filter(item => isInCodeSummary(item));
      },
      routeHasSearchQuery() {
        return this.$route.query.q && this.$route.query.q.length > 0
      },
    },

    methods: {
      handleQueryChange(query) {
        this.$router.replace({path: this.$route.path, query: {q: query}})
      }
    },
    props: {
      videos: {
        type: Array,
        required: true
      },
      headers: {
        type: Array,
        required: true
      },
      showExpand: Boolean,
      customClickAction: Function,
      dense: Boolean,
      itemsPerPage: Number,
      sortDesc: {
        type: Boolean,
        default: true
      }
    }
  }
</script>

<style lang="scss" scoped>
  .search-result-tables .headline {
    margin: 15px 0;
  }
</style>