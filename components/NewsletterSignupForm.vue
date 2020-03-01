<template>
  <div v-if="isSignedUp">
    <h2 class="section-title">Thanks!  Look for an email in your inbox soon.</h2>
  </div>
  <div class="email-signup" v-else>
    <v-form v-model="valid">
      <div class="row">
        <div class="col-sm-6">
          <v-text-field v-model="email" 
                        label="Email" 
                        class="email-field pb-0"
                        :rules="[emailFormat()]"
                        hint="To be notified of new videos and get a weekly newsletter, put your email in here" />
        </div>
        <div class="col-sm-6">
          <v-btn style="height: 100%; min-height: 40px; width: 100%;" 
                 :disabled="!valid"
                 @click="signup">
            Sign Up for free newsletters
          </v-btn>
        </div>
      </div>
    </v-form>
  </div>
</template>

<script>
  import validations from "@/utils/validations";
  export default {
    data(){
      return {
        email: '',
        valid: false,
        isSignedUp: false,
        ...validations
      }
    },
    methods: {
      async signup(){
        let response = await this.$axios.post('/email_preferences/passwordless_subscription', {
          email: this.email
        })
        this.isSignedUp = true;
        this.email = ''
      }
    }
  }
</script>

<style lang="scss" scoped>
  .email-signup {
  }
  button {
    padding: 4px;
    border-radius: 4px;
  }
</style>