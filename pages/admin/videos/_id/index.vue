<template>
  <div>
    <div class="display-1 pt-3">{{video.name}}</div>
    <VideoByline :video="video" />
    <MarkdownDisplay :markdown="video.description" />
    <h3>Code Summary</h3>
    <MarkdownDisplay :markdown="video.code_summary" />

    <v-combobox :items="tags"
                    item-text="name"
                    v-model="videoTags"
                    multiple
                    chips
                    deletable-chips
                    hide-selected
                    return-object>
    </v-combobox>
  </div>
</template>

<script>
  import { mapState, mapGetters } from 'vuex';
  import _ from 'lodash';
  import VideoByline from '@/components/VideoByline';
  import MarkdownDisplay from '@/components/MarkdownDisplay';

  export default {
    components: {
      VideoByline,
      MarkdownDisplay
    },
    computed: {
      ...mapState({
        videos: state => state.videos.videos,
        tags: state => state.tags.tags
      }),
      ...mapGetters({
        getTag: 'tags/get'
      }),
      video(){
        return this.videos.find(v => v.id == this.$route.params.id) || {};
      },
      videoTags: {
        get(){
          let tagIds = this.video.tag_ids;
          return tagIds && tagIds.map(id => this.getTag(id));
        },
        async set(newTags) {
          let createdTag = newTags.find(t => typeof t == 'string')
          if(createdTag){
            createdTag = await this.$store.dispatch('tags/create', {name: createdTag});
            this.$store.dispatch('tags/connectToVideo', {tag: createdTag, video: this.video})
          } else {
            let addedTags = _.differenceBy(newTags, this.videoTags, 'id');
            let removedTags = _.differenceBy(this.videoTags, newTags, 'id');

            if(addedTags.length > 0) {
              this.$store.dispatch('tags/connectToVideo', {tag: addedTags[0], video: this.video})
            }
            if(removedTags.length > 0) {
              this.$store.dispatch('tags/disconnectTagFromVideo', {tag: removedTags[0], video: this.video})
            }
          }
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>