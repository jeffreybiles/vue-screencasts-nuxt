<template>
  <div v-if="isPublished || isAdminScreen">
    <v-row :class="['course-content-video', 'ma-0', 'pl-2', isHighlighted ? 'green lighten-4': '']">
      <v-col sm="6" cols="11" @click="clickAction(video)" class="clickable pa-1">
        {{video.name}}
      </v-col>
      <v-col sm="1" cols="0" class="pa-1 text-center">
        <v-btn x-small v-if="isAdminScreen" @click="detachVideo" class="clickable">
          Detach
        </v-btn>
      </v-col>
      <v-col sm="1" cols="3" class="pa-1 text-center">
        <div v-if="isAdminScreen">
          <font-awesome-icon icon="arrow-up" @click="moveEarlier" class="clickable" />
          <font-awesome-icon icon="arrow-down" @click="moveLater" class="clickable" />
          {{video.order}}
        </div>
        <div v-else>
          <ProMarker :isFree="!video.pro" :video="video" />
          <span class="green--text" v-if="isPlayed(video.id)">
            <font-awesome-icon icon="check" />
          </span>

        </div>
      </v-col>
      <v-col v-if="!compact" sm="2" class="text-center"><DurationDisplay :duration="video.duration" /></v-col>
      <v-col v-if="!compact" sm="2" class="text-center"><DateDisplay :date="video.published_at" /></v-col>
      <v-col v-if="compact" sm="4" cols="9" class="text-center pa-1">
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
      ProMarker,
    },
    computed: {
      ...mapGetters({
        isPlayed: 'user/videoIsPlayed'
      }),
      isHighlighted(){
        return this.highlightedVideo && this.video.id == this.highlightedVideo.id;
      },
      isPublished(){
        return this.video.published_at < Date.now()
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

  .course-content-video {
    border-top: 1px solid #AAA;

    display: flex;
    align-items: center;
  }

</style>