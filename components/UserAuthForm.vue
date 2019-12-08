<template>
  <v-form v-model="valid">
    <v-text-field v-model="userInfo.name" 
                  label="Name" 
                  :rules="[required('name')]"
                  v-if="hasName" />

    <v-text-field v-model="userInfo.email" 
                  label="Email" 
                  :rules="[required('email'), emailFormat()]"/>

    <v-text-field v-model="userInfo.password"
                  label="Password"
                  :type="showPassword ? 'text' : 'password'" 
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="showPassword = !showPassword"
                  counter=true
                  :rules="[required('password'), minLength('password', 8)]"
                  />

    <div v-if="registrationCheckboxes">
      I have read and agree to the 
      <a href="/policies/terms-and-conditions" target="_blank">Terms and Conditions</a>
      and
      <a href="/policies/privacy-policy" target="_blank">Privacy Policy</a>
      <!-- :input-value connects it with the userInfo hash, value makes the :rules work -->
      <v-checkbox value="userInfo.agreeToTerms"
                  :input-value="userInfo.agreeToTerms"
                  label="Yes, I agree"
                  :rules="[required('agreeToTerms', 'You must agree to the terms and conditions and privacy policy')]" />
      Email preferences
      <v-checkbox :input-value="userInfo.emailDaily"
                  label="I would like an email every time a new video is released" />
      <v-checkbox :input-value="userInfo.emailWeekly"
                  label="I would like a weekly email newsletter with a summary of the week's videos and fun VueJS news" />
    </div>

    <v-btn @click="submitForm(userInfo)" :disabled="!valid">{{ buttonText }}</v-btn>
  </v-form>
</template>

<script>
  import validations from "@/utils/validations";

  export default {
    data() {
      return {
        valid: false,
        showPassword: false,
        userInfo: {
          name: 'Hey',
          email: '',
          password: '',
          agreeToTerms: false,
          emailDaily: true,
          emailWeekly: true
        },
        ...validations
      }
    },
    props: {
      submitForm: {
        type: Function,
        required: true,
      },
      buttonText: {
        type: String,
        required: true,
      },
      hasName: Boolean,
      registrationCheckboxes: Boolean
    }
  }
</script>

<style lang="scss" scoped>
  .v-input--checkbox {
    margin: 0;

    ::v-deep .v-input__control {
      .v-input__slot {
        margin-bottom: 0 !important;
      }
    }
    
  }
</style>