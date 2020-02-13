<template>
  <div>
    <div class="comment mt-2">
      <div class="content px-2 pt-2">
        <MarkdownDisplay :markdown="comment.content" />
      </div>
      <div class="byline px-2 pb-2">
        Written by {{comment.username}} on <DateDisplay :date="new Date(comment.created_at)" />
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
  export default {
    name: 'comment-display',
    components: {
      DateDisplay,
      MarkdownDisplay,
      'comment-display': CommentDisplay
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