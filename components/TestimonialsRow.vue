<template>
  <v-row>
    <v-col v-for="testimonial in testimonials" 
           :key="testimonial.id"
           cols="6"
           sm="4"
           class="text-center testimonial">
      <img :src="testimonial.img_src" />
      <div class="testimonial-text text-center pa-2">
        <div class="subtitle-1">"{{testimonial.message}}"</div>
        <div>--{{testimonial.name}}</div>
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
        testimonials: _.filter(socialProofJson.testimonials, t => {
          return this.testimonialIds.includes(t.id.toString())
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
  }

  .testimonial-text {
    display: inline-block;
    text-align: center;
    vertical-align: top;
    font-size: 16px;
  }
</style>