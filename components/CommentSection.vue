<template>
  <div v-if="hasComments">
    <h1 class="display-1">Comments</h1>

    <CommentDisplay v-for="comment in comments" :key="comment.id" :comment="comment" />

    <MarkdownEditor :markdown="newComment">
      <v-textarea v-model="newComment"
                  label="Add your voice!"
                  rows="9" />
    </MarkdownEditor>
  </div>
  <div v-else>
    <h1 class="display-1">Comment on this video</h1>

    <MarkdownEditor :markdown="newComment">
      <v-textarea v-model="newComment"
                  label="Add your voice!"
                  rows="9" />
    </MarkdownEditor>
  </div>
</template>

<script>
  import MarkdownEditor from '@/components/MarkdownEditor.vue';
  import CommentDisplay from '@/components/CommentDisplay.vue';

  export default {
    data(){
      return {
        newComment: '',
        comments: []
      }
    },
    components: {
      MarkdownEditor,
      CommentDisplay
    },
    mounted(){
      this.fetchComments()
    },
    computed: {
      hasComments(){
        return this.video.comment_ids.length > 0
      }
    },
    methods: {
      async fetchComments(){
        let response = await this.$axios.get(`/videos/${this.video.id}/comments`)
        let comments = response.data.data;
        this.comments = comments.map(c => {return {...c.attributes, id: c.id}})
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