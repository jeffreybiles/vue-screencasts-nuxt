<template>
  <v-data-table :headers="headers"
                sort-by="sortable_publish_date"
                :sort-desc="true"
                show-expand
                :items="mungedVideos">
    <template #item.duration="{item}">
      <DurationDisplay :duration="item.duration" />
    </template>
    <template #item.sortable_publish_date="{item}">
      <DateDisplay :date="item.published_at" />
    </template>
    <template #item.tags="{item}">
      <span v-for="tag_id in item.tag_ids" :key="tag_id">
        <v-btn color="green lighten-2" 
               class="mr-1"
               x-small
               :to="`/tags/${tag_id}`">
          {{ getTag()(tag_id).name }}
        </v-btn>
      </span>
    </template>
    <template #expanded-item="{ headers, item }">
      <td :colspan="headers.length">
        <v-row>
          <v-col cols="4">
            <VideoWatch :video="item" />
          </v-col>
          <v-col cols="8">
            <h1>{{item.name}}</h1>
            <MarkdownDisplay :markdown="item.description" />
          </v-col>
        </v-row>
      </td>
    </template>
    <template #item.played="{item}">
      <div class="green--text" v-if="isPlayed()(item.id)">
        <font-awesome-icon icon="check" />
      </div>
    </template>
  </v-data-table>
</template>

<script>
  import DurationDisplay from '@/components/DurationDisplay'
  import DateDisplay from '@/components/DateDisplay'
  import VideoWatch from '@/components/VideoWatch'
  import MarkdownDisplay from '@/components/MarkdownDisplay'

  import { mapGetters } from 'vuex'

  export default {
    components: {
      DurationDisplay,
      DateDisplay,
      VideoWatch,
      MarkdownDisplay
    },    
    computed: {
      mungedVideos(){
        return this.videos.map(v => {
          return {
            ...v,
            sortable_publish_date: v.published_at && v.published_at.toISOString()
          }
        })
      },
      headers() {
        return [
          {text: "Played", value: "played", width: "70px", sortable: false},
          {text: 'Name', value: 'name'},
          {text: 'Length', value: 'duration'},
          {text: "Release Date", value: 'sortable_publish_date'},
          {text: "Tags", value: "tags", sortable: false},
        ]
      },
    },
    methods: {
      ...mapGetters({
        getTag: 'tags/get',
        isPlayed: 'user/videoIsPlayed'
      })
    },
    props: ['videos']
  }
</script>

<style lang="scss" scoped>

</style>