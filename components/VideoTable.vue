<template>
  <v-data-table :items="mungedVideos"
                :headers="headers"
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
      <div v-else>
        <v-btn x-small @click="markPlayed(item.id)" v-if="$auth.loggedIn">
          Mark Played
        </v-btn>
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
  </v-data-table>
</template>

<script>
import DurationDisplay from '@/components/DurationDisplay'
import DateDisplay from '@/components/DateDisplay'
import { mapGetters } from 'vuex';

  export default {
    components: {
      DurationDisplay,
      DateDisplay
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
      markPlayed(videoId){
        this.$store.dispatch('user/markVideoPlayed', videoId)
      }
    },
    props: ['videos']
  }
</script>

<style lang="scss" scoped>

</style>