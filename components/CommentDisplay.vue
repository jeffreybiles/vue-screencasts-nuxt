<template>
  <div>
    <div class="comment">
      <div class="content px-2 pt-2">
        <MarkdownDisplay :markdown="comment.content" />
      </div>
      <div class="byline px-2 pb-2">
        Written by {{comment.username}} on <DateDisplay :date="new Date(comment.created_at)" />
      </div>
    </div>
  </div>
</template>

<script>
  import DateDisplay from '@/components/DateDisplay.vue';
  import MarkdownDisplay from '@/components/MarkdownDisplay.vue';
  export default {
    components: {
      DateDisplay,
      MarkdownDisplay
    },
    props: {
      comment: {
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
</style>