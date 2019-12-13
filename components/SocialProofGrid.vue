<template>
  <div>
    <div class="d-flex flex-wrap">
      <div v-for="testimonial in testimonials" :key="testimonial.id" class="testimonial-selector">
        <v-tooltip bottom content-class="full-testimonial">

          <template #activator="{on}">
            <span v-if="testimonial.link">
              <a :href="testimonial.link" target="_blank" class="v-responsive">
                <v-img v-on="on" :src="testimonial.img_url" />
              </a>
            </span>
            <span v-else>
              <v-img v-on="on" :src="testimonial.img_url" />
            </span>
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

  export default {
    data(){
      return {
        testimonials: socialProofJson.testimonials
      }
    },
    computed: {
      // possible algorithm: sort based on (message_priority + 1 each for real_name and real_face + (3 * Math.random)).
    }
  }
</script>

<style lang="scss" scoped>
  .full-testimonial {
    max-width: 300px;
    opacity: 0;
    background-color: black;
  }

  .testimonial-selector {
    margin: 5px;
    max-width: 60px;

    .v-image, img {
      border-radius: 50% !important;
    }
  }
</style>