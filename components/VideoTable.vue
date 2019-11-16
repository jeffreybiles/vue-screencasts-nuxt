<template>
  <v-data-table :headers="headers"
                sort-by="sortable_publish_date"
                sort-desc="true"
                :items="mungedVideos">
    <template #item.duration="{item}">
      <DurationDisplay :duration="item.duration" />
    </template>
    <template #item.sortable_publish_date="{item}">
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
          {text: "Release Date", value: 'sortable_publish_date'}
        ]
      },
    },
    props: ['videos']
  }
</script>

<style lang="scss" scoped>

</style>