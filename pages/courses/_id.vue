<template>
  <v-container>
    <h1>{{ course.name }}</h1>
    <v-img :src="course.image_url || ''" class="thumbnail-image" />
    
  </v-container>
</template>

<script>
  import { mapState } from 'vuex';

  export default {
    computed: {
      ...mapState({
        courses: state => state.courses.courses
      }),
      course(){
        return this.courses.find(c => c.id == this.$route.params.id)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .thumbnail-image {
    max-width: 500px;
    margin: auto;
  }
</style>