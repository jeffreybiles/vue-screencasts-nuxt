<template>
  <v-tooltip bottom content-class="full-testimonial">
    <template #activator="{on}">
      <v-img v-on="on" :src="img_src" />
    </template>

    <div>
      <h3>{{ testimonial.name }}</h3>
      <p>{{ testimonial.message }}</p>
    </div>

  </v-tooltip>
</template>

<script>
  export default {
    computed: {
      img_src(){
        let bucket = "https://vue-screencasts-uploads.s3-us-west-2.amazonaws.com"
        let folder = "social-proof-portraits"
        return `${bucket}/${folder}/${this.testimonial.img_url}`
      }
    },
    props: {
      testimonial: {
        type: Object,
        required: true
      }
    }
  }
</script>

<style lang="scss" scoped>
  .full-testimonial {
    max-width: 300px;
    opacity: 0;
    background-color: black;
  }
</style>