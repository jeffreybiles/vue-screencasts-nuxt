<template>
  <div>
    <v-row :class="['course-content-video', isHighlighted ? 'green lighten-4': '']">
      <v-col cols="7" @click="clickAction(video)" class="clickable">
        &nbsp; {{video.name}}
      </v-col>
      <v-col cols="1">
        <v-btn small v-if="isAdminScreen" @click="detachVideo" class="clickable">
          Detach
        </v-btn>
      </v-col>
      <v-col cols="1">
        <div v-if="isAdminScreen">
          <font-awesome-icon icon="arrow-up" @click="moveEarlier" class="clickable" />
          <font-awesome-icon icon="arrow-down" @click="moveLater" class="clickable" />
          {{video.order}}
        </div>
        <div v-else>
          <v-row>
            <v-col cols="6" class="pt-0 pb-0">
              <span class="green--text" v-if="isPlayed(video.id)">
                <font-awesome-icon icon="check" />
              </span>
            </v-col>
            <v-col cols="6" class="pt-0 pb-0">
              <ProMarker :isFree="!video.pro" />
            </v-col>
          </v-row>
        </div>
      </v-col>
      <v-col v-if="!compact" cols="1"><DurationDisplay :duration="video.duration" /></v-col>
      <v-col v-if="!compact" cols="2"><DateDisplay :date="video.published_at" /></v-col>
      <v-col v-if="compact" cols="3" class="text-center pt-1 pb-1">
        <DurationDisplay :duration="video.duration" class="medium" /><br>
        <DateDisplay :date="video.published_at" class="small" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
  import DurationDisplay from '@/components/DurationDisplay.vue';
  import DateDisplay from '@/components/DateDisplay.vue';
  import ProMarker from '@/components/ProMarker.vue';
  import { mapGetters } from 'vuex';
  import _ from 'lodash';

  export default {
    components: {
      DurationDisplay,
      DateDisplay,
      ProMarker
    },
    computed: {
      ...mapGetters({
        isPlayed: 'user/videoIsPlayed'
      }),
      isHighlighted(){
        return this.highlightedVideo && this.video.id == this.highlightedVideo.id;
      }
    },
    methods: {
      async detachVideo(){
        this.$store.dispatch('courses/detachVideo', {video: this.video, course: this.course})
      },
      moveEarlier(){
        this.updateOrder(-1, 0)
      },
      moveLater(){
        this.updateOrder(1, this.course.sortedItems.length - 1)
      },
      // intDirection must be 1 or -1
      updateOrder(intDirection, edge){
        this.$store.dispatch('courses/updateOrder', {item: this.video, intDirection, edge, course: this.course, itemPath: 'videos'})
      }
    },
    props: {
      video: {
        type: Object,
        required: true
      },
      isAdminScreen: {
        type: Boolean,
        default: false
      },
      course: {
        type: Object,
        required: false
      },
      clickAction: {
        type: Function,
        required: true
      },
      highlightedVideo: {
        type: Object
      },
      compact: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style lang="scss" scoped>
  .medium {
    font-size: 14px;
  }
  .small {
    font-size: 12px;
  }
</style>