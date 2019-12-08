<template>
  <div>
    <v-row class="course-content-video">
      <v-col cols="7">&nbsp; {{video.name}}</v-col>
      <v-col cols="1">
        <v-btn small v-if="isAdminScreen" @click="detachVideo">
          Detach
        </v-btn>
      </v-col>
      <v-col cols="1">
        <div v-if="isAdminScreen">
          <!--TODO have up or down arrows -->
          <font-awesome-icon icon="arrow-up" @click="moveEarlier" />
          <font-awesome-icon icon="arrow-down" @click="moveLater" />
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
        this.moveVideo(-1)
      },
      moveLater(){
        this.moveVideo(1);
      },
      moveVideo(intDirection){
        let allItems = this.course.sortedItems
        let currentIndex = allItems.indexOf(this.video)
        let nextIndex = currentIndex + intDirection
        let nextNextIndex = nextIndex + intDirection

        let isOnEdge = nextIndex == allItems.length
        if(isOnEdge) { return null}

        let next = allItems[nextIndex]
        let movingToEdge = nextNextIndex == allItems.length
        if(movingToEdge) { 
          this.video.order = Number(next.order) + intDirection
          this.$store.dispatch('courses/updateOrder', {course: this.course})
          return null
        }

        let nextNext = allItems[nextNextIndex]
        this.video.order = (Number(next.order) + Number(nextNext.order)) / 2
        this.$store.dispatch('courses/updateOrder', {course: this.course})
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
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>