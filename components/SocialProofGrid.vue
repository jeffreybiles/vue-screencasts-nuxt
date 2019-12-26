<template>
  <div>
    <div class="d-flex flex-wrap">
      <div v-for="testimonial in testimonials" :key="testimonial.id" class="testimonial-selector">
        <v-tooltip bottom content-class="full-testimonial">
          <template #activator="{on}">
            <v-img v-on="on" :src="testimonial.img_src" />
          </template>

          <div>
            <h3>{{ testimonial.name }}</h3>
            <p>{{ testimonial.message }}</p>
          </div>

        </v-tooltip>
      </div>      
    </div>
  </div>
</template>

<script>
  import socialProofJson from '@/utils/social-proof-data.json';
  import _ from 'lodash';

  export default {
    data(){
      let bucket = "https://vue-screencasts-uploads.s3-us-west-2.amazonaws.com"
      let folder = "social-proof-portraits"
      let testimonials = socialProofJson.testimonials.map(t => {
          t.order = t.message_priority + 
                    (t.true_face ? 1 : 0) + 
                    (t.true_name ? 1 : 0) +
                    (Math.random() * 3)
          t.img_src = `${bucket}/${folder}/${t.img_url}`
          return t
        })
      let sortedTestimonials = _.sortBy(testimonials, 'order').reverse();
      return {
        testimonials: _.uniqBy(sortedTestimonials, 'name')
      }
    },
    computed: {
      // possible algorithm: sort based on (message_priority + 1 each for real_name and real_face + (3 * Math.random)).
    }
  }
</script>

<style lang="scss" scoped>
  .testimonial-selector {
    margin: 5px;
    width: 60px;

    .v-image, img {
      border-radius: 50% !important;
    }
  }

  .full-testimonial {
    max-width: 300px;
    opacity: 0;
    background-color: black;
  }
</style>