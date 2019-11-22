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
      <template #item.tags="{item}">
        <td @click.stop class="non-clickable">
          <span v-for="tag_id in item.tag_ids" :key="tag_id">
            <v-btn color="green lighten-2"
                    :to="`/tags/${tag_id}`"
                    x-small
                    class="mr-1">
              {{ getTag(tag_id).name }}
            </v-btn>
          </span>
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
    methods: {
      goToVideo(item){
        this.$router.push(`/watch/${item.id}`)
      },
      filter(value, search, item) {
        let inName = RegExp(search, 'i').test(item.name)

        
        let tagMatches = item.tag_ids.map(id => {
          let tag = this.getTag(id)
          return RegExp(search, 'i').test(tag.name)
        })
        let inTags = _.some(tagMatches)
 
        return inName || inTags
      }
    },
    props: ['videos']
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