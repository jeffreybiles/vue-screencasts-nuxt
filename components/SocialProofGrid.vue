<template>
  <div>
    <div class="d-flex flex-wrap">
      <div v-for="testimonial in testimonials" :key="testimonial.id" class="testimonial-selector">
        <SocialProofGridItem :testimonial="testimonial" />
      </div>      
    </div>
  </div>
</template>

<script>
  import socialProofJson from '@/utils/social-proof-data.json';
  import SocialProofGridItem from '@/components/SocialProofGridItem.vue';
  export default {
    data(){
      return {
        testimonials: socialProofJson.testimonials
      }
    },
    components: {
      SocialProofGridItem
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

    ::v-deep .v-image, img {
      border-radius: 50% !important;
    }
  }
</style>