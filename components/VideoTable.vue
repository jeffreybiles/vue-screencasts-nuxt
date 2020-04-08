<template>
  <div>
    <v-data-table :items="videos"
                  :headers="headers"
                  :show-expand="showExpand"
                  sort-by="sortable_published_at"
                  :dense="dense"
                  :items-per-page="itemsPerPage || 10"
                  @click:row="goToVideo"
                  :mobile-breakpoint="0"
                  :page="Number($route.query.pageNumber) || 1"
                  @update:page="changePageNumber"
                  :sort-desc="sortDesc"
                  height="500px"
    >
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
      <template #item.pro="{item}">
        <ProMarker :isFree="!item.pro" :video="item" />
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
import ProMarker from '@/components/ProMarker.vue';

  export default {
    components: {
      DurationDisplay,
      DateDisplay,
      VideoWatch,
      MarkdownDisplay,
      ProMarker,
    },
    computed: {
      ...mapGetters({
        isPlayed: 'user/videoIsPlayed'
      }),
    },
    methods: {
      goToVideo(item){
        if(this.customClickAction){
          this.customClickAction(item)
        } else {
          this.$router.push(`/watch/${item.id}`)
        }
      },
      deleteVideo(video) {
        let response = confirm(`Are you sure you want to delete ${video.name}`)
        if(response){
          this.$store.dispatch('videos/delete', video);
          this.$store.dispatch('snackbar/setSnackbar', {text: `You have successfully deleted your video, ${video.name}.`});
        }
      },
      changePageNumber(newPageNumber) {
        this.$router.push({path: this.$route.path, query: { pageNumber: newPageNumber}})
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
      customClickAction: Function,
      dense: Boolean,
      itemsPerPage: Number,
      showExpand: {
        type: Boolean,
        default: true
      },
      sortDesc: {
        type: Boolean,
        default: true
      }
    }
  }
</script>

<style lang="scss" scoped>
  .search-result-tables .headline {
    margin: 15px 0;
  }
  ::v-deep tbody tr {
    cursor: pointer;
  }
  ::v-deep tbody tr td.non-clickable{
    cursor: auto;
  }
</style>
