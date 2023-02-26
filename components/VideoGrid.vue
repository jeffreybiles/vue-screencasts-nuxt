<template>
  <div class="video-grid__wrapper">
    <v-text-field
      class="video-grid__search"
      :label="`Search in all ${videos.length} videos`"
      v-model="search"
      @input="handleQueryChange"
      single-line
      hide-details
      prepend-icon="mdi-magnify"
    />
    <div class="video-grid__list">
      <VideoGridItem
        v-for="video in paginatedVideos"
        :key="video.id"
        :video="video"
        :highlighted-term="search"
        @click.native="$router.push(`/watch/${video.id}`)"
      />
    </div>
    <div class="text-center mt-5">
      <v-pagination
        :key="search"
        color="green"
        v-model="page"
        :length="pagesCount"
        :total-visible="7"
      />
    </div>
  </div>
</template>

<script>
  import VideoGridItem from "~/components/VideoGridItem";

  const PAGE_SIZE = 25

  const isInName = (item, search) => RegExp(search, 'i').test(item.name)
  const isInDescription = (item, search) => RegExp(search, 'i').test(item.description)
  const isInCodeSummary = (item, search) => RegExp(search, 'i').test(item.code_summary)
  const isInCourseName = (item, search) => RegExp(search, 'i').test(item.courseName)

  export default {
    name: 'VideoGrid',
    components: {VideoGridItem},
    data(){
      return {
        search: '',
        page: 1
      }
    },

    mounted() {
      if (this.routeHasSearchQuery) {
        this.search = this.$route.query.q
      }
    },
    computed: {
      pagesCount() {
        return Math.ceil(this.sortedFilteredVideos.length / PAGE_SIZE)
      },
      filteredVideos() {
        if(this.search.length === 0) { return this.videos }
        return this.videos.filter(item => isInName(item, this.search) || isInDescription(item, this.search) || isInCodeSummary(item, this.search))
      },
      sortedFilteredVideos() {
        return this.filteredVideos.sort((a, b) => {
          let weightA = b.isNew ? 4.9 : 0
          let weightB = b.isNew <= 7 ? 4.9 : 0
          if (isInName(a, this.search)) weightA += 20
          if (isInName(b, this.search)) weightB += 20
          if (isInCourseName(a, this.search)) weightA += 15
          if (isInCourseName(b, this.search)) weightB += 15
          if (isInDescription(a, this.search)) weightA += 10
          if (isInDescription(b, this.search)) weightB += 10
          if (isInCodeSummary(a, this.search)) weightA += 5
          if (isInCodeSummary(b, this.search)) weightB += 5
          return weightA < weightB ? 1 : -1
        })
      },
      paginatedVideos() {
        const startIndex = PAGE_SIZE * (this.page - 1)
        const endIndex = PAGE_SIZE * this.page
        return this.sortedFilteredVideos.slice(startIndex, endIndex)
      },
      routeHasSearchQuery() {
        return this.$route.query.q && this.$route.query.q.length > 0
      },
    },

    methods: {
      handleQueryChange(query) {
        this.$router.replace({path: this.$route.path, query: {q: query}})
        this.page = 1
      }
    },
    props: {
      videos: {
        type: Array,
        required: true
      }
    }
  }
</script>

<style lang="sass" scoped>
  $video-grid-max-width: 1250px

  .video-grid
    &__list
      margin-top: 15px
      display: grid
      gap: 25px
      grid-template-columns: auto
      width: 100%
    &__wrapper
      display: flex
      flex-direction: column
      align-items: center
      max-width: $video-grid-max-width
      margin: 0 auto
    &__search
      position: sticky
      width: 100%
</style>
