<template>
  <v-hover
    v-slot:default="{ hover }">
    <v-card :elevation="hover ? 16 : 2" class="video-grid__list-item pa-3">
      <img :src="thumbnail" :alt="video.name" />
      <div class="video-grid__list-item-info">
        <div class="title" v-html="highlightSearchTerm(video.name)" />
        <div class="my-2">
          <v-chip
            v-html="getCourseNameHtml(video.courseName)"
          />
          <v-chip
            color="red"
            text-color="white"
          >
            Video {{ video.courseVideoNumber }}
          </v-chip>
        </div>
        <div class="subtitle" v-html="highlightSearchTerm(video.description)" />
      </div>
    </v-card>
  </v-hover>
</template>

<script>
  import {getThumbnail} from "~/utils/video-decorator";

  export default {
    name: "VideoGridItem",
    props: {
      video: {
        type: Object,
        required: true
      },
      highlightedTerm: {
        type: String,
        default: null
      }
    },
    computed: {
      thumbnail() {
        return getThumbnail(this.video, this.$store)
      },
    },
    methods: {
      getCourseNameHtml(courseName) {
        /* Hack for buggy whitespace display in v-chip */
        return `<div>${this.highlightSearchTerm(courseName)}</div>`
      },
      highlightSearchTerm(text) {
        if (!this.highlightedTerm || !text) {
          return text
        }
        const toReplace = new RegExp("(" + this.highlightedTerm + ")", 'ig')
        return text.replace(toReplace, '<div class="video-grid__list-item-highlight green--text">$1</div>')
      }
    }
  }
</script>

<style lang="sass" scoped>
  ::v-deep .video-grid__list-item-highlight
    font-weight: bold
    display: inline
    border-bottom: 1px solid #4CAF50
  .video-grid__list-item
    cursor: pointer
    min-height: 165px
    width: 100%
    display: grid
    grid-template-columns: 250px 1fr
    gap: 15px
    @media (max-width: 768px)
      grid-template-columns: 1fr
    img
        height: auto
        width: 100%
</style>
