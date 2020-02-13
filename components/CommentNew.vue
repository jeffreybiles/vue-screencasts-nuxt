<template>
  <div>
    <MarkdownEditor :markdown="newComment">
      <v-textarea v-model="newComment"
                  label="Leave comment here"
                  rows="9" />

      <template #footer>
        You can use Markdown, including code samples, in your comment.
        Both the 4-space indentation and triple-backslash methods of creating code blocks work.
      </template>
    </MarkdownEditor>
    <v-btn color="green" @click="leaveComment()">Leave Comment</v-btn>
  </div>
</template>

<script>
  import MarkdownEditor from '@/components/MarkdownEditor.vue';

  export default {
    data(){
      return {
        newComment: ''
      }
    },
    components: {
      MarkdownEditor
    },
    methods: {
      async leaveComment(){
        let response = await this.$axios.post(`/comments`, {
          video_id: this.video.id,
          content: this.newComment 
        })
        let comment = response.data.data;
        comment = {...comment.attributes, id: comment.id}
        this.$emit('addComment', comment);
        this.newComment = ''
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