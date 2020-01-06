<template>
  <span>
    <v-btn large color="primary" class="mt-1" @click="goToCheckout">
      <div v-html="buttonText" />
    </v-btn>
  </span>
</template>

<script>
  export default {
    data(){
      return {
        loading: false
      }
    },
    methods: {
      async goToCheckout(){
        // TODO: have spinner when loading
        this.loading = true;
        
        let response = await this.$axios.post('/stripe/create_session_id', {
          plan_id: this.planId
        })

        let sessionId = response.data.session_id
        
        this.$stripe.import().redirectToCheckout({
          sessionId: sessionId
        }).then(()=>{
          // TODO: handle possible errors
          this.loading = false
        })
      }
    },
    props: {
       buttonText: {
         type: String,
         default: "Subscribe"
       },
       planId: {
         type: String,
         required: true
       }
    }
  }
</script>

<style lang="scss" scoped>

</style>