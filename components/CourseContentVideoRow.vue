<template>
  <div>
    <v-row class="course-content-video">
      <v-col cols="8">&nbsp; {{video.name}}</v-col>
      <v-col cols="1">
        <div v-if="isAdminScreen">
          <!--TODO have up or down arrows -->
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
    props: {
      video: {
        type: Object,
        required: true
      },
      isAdminScreen: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>