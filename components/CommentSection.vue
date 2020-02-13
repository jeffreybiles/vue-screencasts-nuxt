<template>
  <div>
    <h1 class="display-1">Comments</h1>

    <CommentDisplay v-for="comment in comments.filter(c => !c.parent_id)"
                    :key="comment.id"
                    :comment="comment"
                    :comments="comments" />
    <CommentNew :video="video" @addComment="comments.push($event)" />

  </div>
</template>

<script>
  import CommentDisplay from '@/components/CommentDisplay.vue';
  import CommentNew from '@/components/CommentNew.vue';
  import _ from 'lodash';

  export default {
    data(){
      return {
        comments: []
      }
    },
    components: {
      CommentDisplay,
      CommentNew
    },
    mounted(){
      this.fetchComments()
    },
    methods: {
      async fetchComments(){
        let response = await this.$axios.get(`/videos/${this.video.id}/comments`)
        let comments = response.data.data;
        comments = comments.map(c => {return {...c.attributes, id: c.id}})
        this.comments = _.sortBy(comments, 'created_at')
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