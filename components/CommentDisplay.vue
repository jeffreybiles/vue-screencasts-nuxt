<template>
  <div>
    <div v-if="isEditing">
      <CommentEdit :comment="comment" 
                   @endEditing="isEditing = false" />
    </div>
    <div v-else class="comment mt-2">
      <div class="content px-2 pt-2">
        <MarkdownDisplay :markdown="comment.content" />
      </div>
      <div class="byline px-2 pb-2">
        Written by {{comment.username}} on <DateDisplay :date="new Date(comment.created_at)" />
        <span v-if="comment.user_id == $auth.user.id">
          <br>
          <!-- TODO: make these links work -->
          <span @click="isEditing = true" class="clickable">Edit</span>
          <span>Delete</span>
        </span>
      </div>
    </div>
    <comment-display v-for="comment_id in comment.comment_ids"
                    :key="comment_id"
                    :comment="comments.find(c => c.id == comment_id)" 
                    :comments="comments"
                    class="pl-6" />
  </div>
</template>

<script>
  import DateDisplay from '@/components/DateDisplay.vue';
  import MarkdownDisplay from '@/components/MarkdownDisplay.vue';
  import CommentDisplay from '@/components/CommentDisplay.vue';
  import CommentEdit from '@/components/CommentEdit.vue';
  export default {
    name: 'comment-display',
    data(){
      return {
        isEditing: false
      }
    },
    components: {
      DateDisplay,
      MarkdownDisplay,
      'comment-display': CommentDisplay,
      CommentEdit
    },
    props: {
      comment: {
        type: Object,
        required: true
      },
      comments: {
        type: Array,
        required: true
      }
    }
  }
</script>

<style lang="scss" scoped>
  .comment {
    border: 1px solid;
  }

  .content {
  }

  .byline {
    font-size: 0.8em;
  }
</style>