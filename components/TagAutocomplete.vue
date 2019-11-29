<template>
  <v-autocomplete :items="tags"
                  item-text="name"
                  v-model="videoTags"
                  multiple
                  chips
                  deletable-chips
                  hide-selected
                  return-object>
  </v-autocomplete>
</template>

<script>
  import { mapGetters, mapState } from 'vuex';

  export default {
    computed: {
      ...mapGetters({
        getTag: 'tags/get'
      }),
      ...mapState({
        tags: state => state.tags.tags
      }),
      videoTags: {
        get(){
          let tagIds = this.video.tag_ids;
          return tagIds && tagIds.map(id => this.getTag(id));
        },
        async set(newTags) {
          // We changed back from v-combobox to v-autocomplete because v-combobox is broken
          // https://github.com/vuetifyjs/vuetify/issues/8841
          // When it's fixed, we can go to v-combobox again.  Look in git history for the code we deleted

          let addedTags = _.differenceBy(newTags, this.videoTags, 'id');
          let removedTags = _.differenceBy(this.videoTags, newTags, 'id');

          if(addedTags.length > 0) {
            this.$store.dispatch('tags/connectToVideo', {tag: addedTags[0], video: this.video})
          }
          if(removedTags.length > 0) {
            this.$store.dispatch('tags/disconnectFromVideo', {tag: removedTags[0], video: this.video})
          }
        }
      }
    },
    props: {
      video: {
        type: Object,
        required: true
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>