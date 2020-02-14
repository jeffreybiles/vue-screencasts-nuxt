<template>
  <div v-if="$auth.user">
    <MarkdownEditor :markdown="newComment">
      <v-textarea v-model="newComment"
                  label="Leave comment here"
                  rows="9" />

      <template #footer>
        You can use Markdown, including code samples, in your comment.
        Both the 4-space indentation and triple-backslash methods of creating code blocks work.
      </template>
    </MarkdownEditor>
    <v-btn color="grey" @click="cancel()">Cancel</v-btn>
    <v-btn color="green" @click="leaveComment()">Leave Comment</v-btn>
  </div>
  <div v-else>
    You must be logged in to leave a comment.

    <UserAuthTogglableForm />
  </div>
</template>

<script>
  import MarkdownEditor from '@/components/MarkdownEditor.vue';
  import UserAuthTogglableForm from '@/components/UserAuthTogglableForm.vue';

  export default {
    data(){
      return {
        newComment: ''
      }
    },
    components: {
      MarkdownEditor,
      UserAuthTogglableForm
    },
    methods: {
      async leaveComment(){
        let response = await this.$axios.post(`/comments`, {
          video_id: this.video.id,
          content: this.newComment,
          parent_id: this.parentId
        })
        let comment = response.data.data;
        comment = {...comment.attributes, id: comment.id}
        this.$emit('addComment', comment);
        this.newComment = ''
      },
      cancel(){
        this.newComment = ''
        this.$emit('cancel')
      }
    },
    props: {
      video: {
        type: Object,
        required: true
      },
      parentId: {
        type: [Number, String]
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>