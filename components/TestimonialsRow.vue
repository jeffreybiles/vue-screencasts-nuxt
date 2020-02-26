<template>
  <v-row class="mx-auto">
    <v-col v-for="testimonial in testimonials" 
           :key="testimonial.id"
           cols="6"
           sm="3"
           class="text-center testimonial">
      
      <v-img :src="testimonial.img_src" v-if="reloadHack" />
      <img :src="testimonial.img_src" v-else />
      
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
    computed: {
      testimonials(){
        let allTestimonials = socialProofJson.testimonials;
        return this.testimonialIds.map(t_id => {
          return allTestimonials.find(t => t && t.id == t_id)
        }).map(t => {
          let host = 'https://vue-screencasts-uploads.s3-us-west-2.amazonaws.com';
          let folder = 'social-proof-portraits'
          t.img_src = `${host}/${folder}/${t.img_url}`
          return t
        })
      }
    },
    props: {
      testimonialIds: {
        type: Array,
        required: true
      },
      reloadHack: {
        type: Boolean,
        default: false
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
    align-items: center;
    padding-left: 6px;
    padding-right: 6px;
    margin-top: 10px;
  }

  .testimonial-text {
    display: block;
    text-align: center;
    vertical-align: top;
    font-size: 16px;
  }
</style>