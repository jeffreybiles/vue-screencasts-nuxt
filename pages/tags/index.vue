<template>
  <div>
    <h1>What would you like to learn about?</h1>

    <v-data-table :items="mungedTags"
                  :headers="headers"
                  sort-by="mostRecentUpdateSortable"
                  :sort-desc="true">
      <template #item.vidLength="{value}">
        <DurationDisplay :duration="value" />
      </template>
      <template #item.mostRecentUpdateSortable="{item}">
        <DateDisplay :date="item.mostRecentUpdate" />
      </template>
    </v-data-table>
  </div>
</template>

<script>
  import { mapState, mapGetters } from 'vuex'
  import _ from 'lodash'
  import DurationDisplay from '@/components/DurationDisplay'
  import DateDisplay from '@/components/DateDisplay'

  export default {
    components: {
      DurationDisplay,
      DateDisplay
    },
    data(){
      return {
        headers: [
          {text: "Name", value: 'name'},
          {text: "# Videos", value: 'vidCount'},
          {text: "Time", value: "vidLength"},
          {text: "Last Updated", value: "mostRecentUpdateSortable"}
        ]
      }
    },
    computed: {
      ...mapState({
        tags: state => state.tags.tags,
        videos: state => state.videos.videos
      }),
      ...mapGetters({
        getVideo: 'videos/get'
      }),
      mungedTags(){
        return this.tags.map(t => {
          let vids = t.video_ids.map(v_id => this.getVideo(v_id))
          let mostRecentUpdate = _.max(vids.map(v => v.published_at))
          return {
            ...t,
            vidCount: vids.length,
            vidLength: _.sum(vids.map(v => v.duration)),
            mostRecentUpdate: mostRecentUpdate,
            mostRecentUpdateSortable: mostRecentUpdate && mostRecentUpdate.toISOString()
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>