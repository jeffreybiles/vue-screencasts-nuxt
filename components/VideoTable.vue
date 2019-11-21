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
  </v-data-table>
</template>

<script>
import DurationDisplay from '@/components/DurationDisplay'
import DateDisplay from '@/components/DateDisplay'
  export default {
    components: {
      DurationDisplay,
      DateDisplay
    },
    computed: {
      headers(){
        return [
          {text: 'Name', value: 'name'},
          {text: 'Date', value: 'sortable_published_at'},
          {text: 'Duration', value: 'duration'}
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