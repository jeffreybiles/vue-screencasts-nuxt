<template>
  <div>
    <v-text-field
      v-model="search"
      label="Search"
      single-line
      hide-details
    />
    <v-data-table :items="mungedVideos"
                  :headers="headers"
                  show-expand
                  sort-by="sortable_published_at"
                  :search="search"
                  :custom-filter="filter"
                  :dense="dense"
                  :items-per-page="itemsPerPage || 10"
                  @click:row="goToVideo"
                  :sort-desc="true">
      <template #item.duration="{value, item}">
        <DurationDisplay :duration="value" />
      </template>
      <template #item.sortable_published_at="{item}">
        <DateDisplay :date="item.published_at" />
      </template>
      <template #item.played="{item}">
        <div class="green--text" v-if="isPlayed(item.id)">
          <font-awesome-icon icon="check" /> 
        </div>
      </template>
      <template #item.actions="{item}">
        <td @click.stop class="non-clickable">
          <v-btn small :to="`/watch/${item.id}`">Watch</v-btn>
          <v-btn small :to="`/admin/videos/${item.id}/edit`">Edit</v-btn>
          <v-btn small @click="deleteVideo(item)">Delete</v-btn>
        </td>
      </template>
      <template #expanded-item="{headers,item}">
        <td :colspan="headers.length">
          <v-row>
            <v-col cols="12" md="4">
              <VideoWatch :video="item" />
            </v-col>
            <v-col cols="12" md="8">
              <h1>{{item.name}}</h1>
              <MarkdownDisplay :markdown="item.description" />
            </v-col>
          </v-row>
        </td>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import DurationDisplay from '@/components/DurationDisplay'
import DateDisplay from '@/components/DateDisplay'
import { mapGetters } from 'vuex';
import VideoWatch from '@/components/VideoWatch'
import MarkdownDisplay from '@/components/MarkdownDisplay'
import _ from 'lodash'

  export default {
    components: {
      DurationDisplay,
      DateDisplay,
      VideoWatch,
      MarkdownDisplay
    },
    data(){
      return {
        search: ''
      }
    },
    computed: {
      ...mapGetters({
        isPlayed: 'user/videoIsPlayed',
      }),
      mungedVideos(){
        return this.videos.map((v)=>{
          return {
            ...v,
            sortable_published_at: v.published_at && v.published_at.toISOString()
          }
        })
      }
    },
    methods: {
      goToVideo(item){
        if(this.customClickAction){
          this.customClickAction(item)
        } else {
          this.$router.push(`/watch/${item.id}`)
        }
      },
      filter(value, search, item) {
        let inName = RegExp(search, 'i').test(item.name)

        return inName
      },
      deleteVideo(video) {
        let response = confirm(`Are you sure you want to delete ${video.name}`)
        if(response){
          this.$store.dispatch('videos/delete', video);
          this.$store.dispatch('snackbar/setSnackbar', {text: `You have successfully deleted your video, ${video.name}.`});
        }
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
      customClickAction: {
        type: Function,
        required: false
      },
      dense: Boolean,
      itemsPerPage: Number
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