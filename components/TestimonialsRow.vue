<template>
  <v-row>
    <v-col v-for="testimonial in testimonials" 
           :key="testimonial.id"
           cols="6"
           sm="3"
           class="text-center testimonial">
      <img :src="testimonial.img_src" />
      <div class="testimonial-text text-center pa-2">
        <div class="subtitle-1">"{{testimonial.message}}"</div>
        <div>&mdash;{{testimonial.name}}</div>
      </div>
    </v-col>
  </v-row>
</template>

<script>
  import socialProofJson from '@/utils/social-proof-data.json';
  import _ from 'lodash';

  export default {
    data(){
      return {
        testimonials: this.testimonialIds.map(t_id => {
          return socialProofJson.testimonials.find(t => t.id == t_id)
        }).map(t => {
          let bucket = "https://vue-screencasts-uploads.s3-us-west-2.amazonaws.com"
          let folder = "social-proof-portraits"
          t.img_src = `${bucket}/${folder}/${t.img_url}`
          return t
        })
      }
    },
    props: {
      testimonialIds: {
        type: Array,
        required: true
      }
    }
  }
</script>

<style lang="scss" scoped>
  .v-image, img {
    border-radius: 50% !important;
    width: 80px;
    display: inline-block;
  }

  .testimonial {
    display: flex;
    justify-content: center; /* align horizontal */
    align-items: center;
    padding-left: 6px;
    padding-right: 6px;
  }

  .testimonial-text {
    display: inline-block;
    text-align: center;
    vertical-align: top;
    font-size: 16px;
  }
</style>