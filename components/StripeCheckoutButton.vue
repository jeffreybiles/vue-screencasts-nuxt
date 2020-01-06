<template>
  <span>
    <v-btn large color="primary" class="mt-1" @click="startCheckout" :disabled="disabled">
      <v-progress-circular indeterminate v-if="loading" />
      <div v-html="buttonText" v-else />
    </v-btn>

    <span v-if="displayAuthModal">
      <UserAuthModal :isOpen="true"
                     topPhrase="Log in or register, then you will be taken to the payment page."
                     :postRegisterAction="finishAuth"
                     :postLoginAction="finishAuth" />
    </span>
  </span>
</template>

<script>
  import UserAuthModal from '@/components/UserAuthModal.vue';
  export default {
    components: {
      UserAuthModal
    },
    data(){
      return {
        loading: false,
        displayAuthModal: false
      }
    },
    methods: {
      async startCheckout(){
        if(this.$auth.loggedIn) {
          this.goToCheckout()
        } else {
          this.displayAuthModal = true
        }
      },
      async finishAuth(){
        if(this.$auth.user.pro) {
          this.displayAuthModal = false
        } else {
          this.goToCheckout()
        }
      },
      async goToCheckout(){
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
       },
       disabled: {
         type: Boolean,
         default: false
       }
    }
  }
</script>

<style lang="scss" scoped>

</style>