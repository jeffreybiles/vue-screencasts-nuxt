<template>
  <div class="home">
    <div class="display-4 ma-4 d-flex justify-center">
      All Videos
    </div>

    <v-data-table :headers="headers"
                  :items="videos">
      <template #item.duration="{item}">
        <DurationDisplay :duration="item.duration" />
      </template>
      <template #item.published_at="{item}">
        <DateDisplay :date="item.published_at" />
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import DurationDisplay from '@/components/DurationDisplay'
import DateDisplay from '@/components/DateDisplay'
export default {
  components: {
    DurationDisplay,
    DateDisplay
  },
  computed: {
    ...mapState({
      tags: state => state.tags.tags,
      videos: state => state.videos.videos,
      headers() {
        return [
          {text: 'Name', value: 'name'},
          {text: 'Length', value: 'duration'},
          {text: "Release Date", value: 'published_at'}
        ]
      },
    }),
  }
}
</script>

<style>
</style>
