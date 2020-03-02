<template>
  <div v-if="isSignedUp">
    <h2 class="section-title">Thanks!  Look for the first email in your inbox soon.</h2>
  </div>
  <div class="email-signup" v-else>
    <p class="section-subtitle mb-0">Get free videos and more in your inbox.</p>
    <v-form v-model="valid">
      <div class="row">
        <div class="col-sm-6">
          <v-text-field v-model="email"
                        label="Email"
                        class="email-field pb-0"
                        :rules="[emailFormat()]"
                        outlined />
        </div>
        <div class="col-sm-6">
          <v-btn style="height: 100%; min-height: 40px; width: 100%;" 
                 :disabled="!valid"
                 text
                 outlined
                 @click="signup">
            Sign Up
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

  ::v-deep .v-text-field__details {
    display: none;
    height: 0px;
  }

  ::v-deep .v-input__slot {
    margin-bottom: 0;
  }

  ::v-deep fieldset {
    border: 2px solid black !important;
  }

  .email-field.error--text {
    color: #500 !important;
    caret-color: #500 !important;
  }
  .email-field ::v-deep .error--text {
    color: #500 !important;
  }
</style>