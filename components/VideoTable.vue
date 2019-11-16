<template>
  <v-data-table :headers="headers"
                sort-by="sortable_publish_date"
                :sort-desc="true"
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
  </v-data-table>
</template>

<script>
  import DurationDisplay from '@/components/DurationDisplay'
  import DateDisplay from '@/components/DateDisplay'
  import { mapGetters } from 'vuex'

  export default {
    components: {
      DurationDisplay,
      DateDisplay
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
          {text: 'Name', value: 'name'},
          {text: 'Length', value: 'duration'},
          {text: "Release Date", value: 'sortable_publish_date'},
          {text: "Tags", value: "tags", sortable: false}
        ]
      },
    },
    methods: {
      ...mapGetters({
        getTag: 'tags/get'
      })
    },
    props: ['videos']
  }
</script>

<style lang="scss" scoped>

</style>