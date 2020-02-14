<template>
  <div>
    <div v-if="isEditing">
      <CommentEdit :comment="comment" 
                   @endEditing="isEditing = false" />
    </div>
    <div v-else :class="['comment', 'mt-2', comment.deleted ? 'deleted' : '']">
      <div class="content px-2 pt-2">
        <div v-if="comment.deleted">
          This comment has been deleted by the author.
          <button v-if="isAuthor" @click="restoreComment()">
            Restore
          </button>
        </div>
        <div v-else>
          <MarkdownDisplay :markdown="comment.content" />
        </div>
      </div>
      <div class="byline px-2 pb-2">
        Written by {{comment.username}} on <DateDisplay :date="new Date(comment.created_at)" />
        <br>
        <span @click="isReplying = true" class="clickable">Reply</span>
        <span v-if="isAuthor">
          <span @click="isEditing = true" class="clickable">Edit</span>
          <span @click="deleteComment()" class="clickable">Delete</span>
        </span>
      </div>
    </div>
    <div v-if="isReplying" class="ml-6">
      <CommentNew  :video="video" :parentId="comment.id" @addComment="addComment($event)" @cancel="isReplying = false" />
    </div>
    <comment-display v-for="comment_id in comment.comment_ids"
                    :key="comment_id"
                    :comment="comments.find(c => c.id == comment_id)" 
                    :comments="comments"
                    :video="video"
                    class="pl-6" />
  </div>
</template>

<script>
  import DateDisplay from '@/components/DateDisplay.vue';
  import MarkdownDisplay from '@/components/MarkdownDisplay.vue';
  import CommentNew from '@/components/CommentNew.vue';
  import CommentDisplay from '@/components/CommentDisplay.vue';
  import CommentEdit from '@/components/CommentEdit.vue';
  export default {
    name: 'comment-display',
    data(){
      return {
        isEditing: false,
        isReplying: false
      }
    },
    components: {
      DateDisplay,
      MarkdownDisplay,
      'comment-display': CommentDisplay,
      CommentEdit,
      CommentNew
    },
    methods: {
      deleteComment(){
        this.$axios.put(`/comments/${this.comment.id}`, {
          deleted: true
        })
        this.comment.deleted = true
      },
      restoreComment(){
        this.$axios.put(`/comments/${this.comment.id}`, {
          deleted: false
        })
        this.comment.deleted = false
      },
      addComment(newComment) {
        this.isReplying = false;
        this.comments.push(newComment);
        this.comment.comment_ids.push(newComment.id);
      }
    },
    computed: {
      isAuthor(){
        return this.$auth.user && this.$auth.user.id == this.comment.user_id;
      }
    },
    props: {
      comment: {
        type: Object,
        required: true
      },
      comments: {
        type: Array,
        required: true
      },
      video: {
        type: Object,
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

  .deleted {
    opacity: 0.5;
  }
</style>