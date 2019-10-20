<template>
  <v-card width="340px" 
          hover 
          class="ma-2"
          >
    <nuxt-link :to="{ path: `/watch/${video.id}`}">
      <v-img :src="video.thumbnail" />
      <v-card-title>{{ video.name }}</v-card-title>
      <v-card-text>
        <!-- <div class="green--text" v-if="isPlayed(video.id)">
          <font-awesome-icon icon="check" /> Played
        </div> -->
      </v-card-text>
    </nuxt-link>

    <v-card-actions>
      <span v-for="tag_id in video.tag_ids" :key="`${video.id}-${tag_id}`">
        <v-btn color="green lighten-2" 
               class="mr-2"
               small
               @mousedown.stop
               :to="`/tags/${tag_id}`">
          {{ getTag(tag_id).name }}
        </v-btn>
      </span>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  methods: {
    getTag(tagId) {
      return this.tags.find(t => t.id == tagId);
    }
  },
  props: ['video', 'tags'],  
}
</script>

<style scoped lang="scss">
  a {
    text-decoration: none;
    color:black;
  }
</style>