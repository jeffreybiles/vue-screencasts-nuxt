<template>
  <div>
    <div class="display-1 pt-3">{{video.name}}</div>
    <VideoByline :video="video" />
    
    <v-row>
      <v-col cols="12" sm="6" md="8">
        <MarkdownDisplay :markdown="video.description" />
        <h3>Code Summary</h3>
        <MarkdownDisplay :markdown="video.code_summary" />
      </v-col>
      <v-col cols="12" sm="6" md="4">
        <VideoWatch :video="video" />
      </v-col>
    </v-row>
   

    <v-combobox :items="tags"
                    item-text="name"
                    v-model="videoTags"
                    multiple
                    chips
                    deletable-chips
                    hide-selected
                    return-object>
    </v-combobox>

    <v-btn :to="`/admin/videos/${video.id}/edit`">Edit</v-btn>
    <v-btn :to="`/watch/${video.id}`">Watch</v-btn>
  </div>
</template>

<script>
  import { mapState, mapGetters } from 'vuex';
  import _ from 'lodash';
  import VideoByline from '@/components/VideoByline';
  import MarkdownDisplay from '@/components/MarkdownDisplay';
  import VideoWatch from '@/components/VideoWatch';

  export default {
    components: {
      VideoByline,
      MarkdownDisplay,
      VideoWatch
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
              this.$store.dispatch('tags/disconnectFromVideo', {tag: removedTags[0], video: this.video})
            }
          }
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>