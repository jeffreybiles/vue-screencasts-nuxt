<template>
  <div>
    <v-row class="course-content-video">
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
          <!--TODO have up or down arrows -->
          <font-awesome-icon icon="arrow-up" @click="moveEarlier" class="clickable" />
          <font-awesome-icon icon="arrow-down" @click="moveLater" class="clickable" />
          {{video.order}}
        </div>
        <div v-else>
          <div v-if="isPlayed(video.id)">
            <!-- TODO have played checkmark -->
            Played
          </div>
        </div>
      </v-col>
      <v-col cols="1"><DurationDisplay :duration="video.duration" /></v-col>
      <v-col cols="2"><DateDisplay :date="video.published_at" /></v-col>
    </v-row>
  </div>
</template>

<script>
  import DurationDisplay from '@/components/DurationDisplay.vue';
  import DateDisplay from '@/components/DateDisplay.vue';
  import { mapGetters } from 'vuex';
  import _ from 'lodash';

  export default {
    components: {
      DurationDisplay,
      DateDisplay
    },
    computed: {
      ...mapGetters({
        isPlayed: 'user/videoIsPlayed'
      }),
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
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>