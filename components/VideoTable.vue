<template>
  <v-data-table :items="mungedVideos"
                :headers="headers"
                show-expand
                sort-by="sortable_published_at"
                :sort-desc="true">
    <template #item.duration="{value}">
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
    <template #item.tags="{item}">
      <span v-for="tag_id in item.tag_ids" :key="tag_id">
        <v-btn color="green lighten-2"
                :to="`/tags/${tag_id}`"
                x-small
                class="mr-1">
          {{ getTag(tag_id).name }}
        </v-btn>
      </span>
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
</template>

<script>
import DurationDisplay from '@/components/DurationDisplay'
import DateDisplay from '@/components/DateDisplay'
import { mapGetters } from 'vuex';
import VideoWatch from '@/components/VideoWatch'
import MarkdownDisplay from '@/components/MarkdownDisplay'

  export default {
    components: {
      DurationDisplay,
      DateDisplay,
      VideoWatch,
      MarkdownDisplay
    },
    computed: {
      ...mapGetters({
        isPlayed: 'user/videoIsPlayed',
        getTag: 'tags/get',
      }),
      headers(){
        return [
          {text: 'Name', value: 'name'},
          {text: 'Date', value: 'sortable_published_at'},
          {text: 'Duration', value: 'duration'},
          {text: 'Played', value: 'played', sortable: false},
          {text: 'Tags', value: 'tags', sortable: false},
        ]
      },
      mungedVideos(){
        return this.videos.map((v)=>{
          return {
            ...v,
            sortable_published_at: v.published_at && v.published_at.toISOString()
          }
        })
      }
    },
    props: ['videos']
  }
</script>

<style lang="scss" scoped>

</style>