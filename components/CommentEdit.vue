<template>
  <div>
    <MarkdownEditor :markdown="updatedComment">
      <v-textarea v-model="updatedComment"
                  label="Leave comment here"
                  rows="9" />

      <template #footer>
        You can use Markdown, including code samples, in your comment.
        Both the 4-space indentation and triple-backslash methods of creating code blocks work.
      </template>
    </MarkdownEditor>
    <v-btn color="grey" @click="cancel()">Cancel</v-btn>
    <v-btn color="green" @click="updateComment()">Update Comment</v-btn>    
  </div>
</template>

<script>
  import MarkdownEditor from '@/components/MarkdownEditor.vue';

  export default {
    data(){
      return {
        updatedComment: this.comment.content
      }
    },
    components: {
      MarkdownEditor
    },
    props: {
      comment: {
        type: Object,
        required: true
      }
    },
    methods: {
      cancel(){
        this.$emit('endEditing');
      },
      async updateComment(){
        let comment = await this.$axios.put(`/comments/${this.comment.id}`, {
          content: this.updatedComment
        })
        this.$emit('endEditing');
        this.comment.content = this.updatedComment
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>