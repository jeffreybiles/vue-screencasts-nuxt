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
      <!-- v-model connects it with the userInfo hash, value makes the :rules work -->
      <v-checkbox v-model="userInfo.agreeToTerms"
                  value="userInfo.agreeToTerms"
                  class="mr-0"
                  :rules="[required('agreeToTerms', 'You must agree to the terms and conditions and privacy policy')]">
        <template #label @click.stop>
          I have read and agree to the 
          <a href="/policies/terms-and-conditions" target="_blank" @click.stop>Terms and Conditions</a>
          and 
          <a href="/policies/privacy-policy" target="_blank" @click.stop>Privacy Policy</a>
        </template>
      </v-checkbox>
      Email preferences
      <v-checkbox v-model="userInfo.email_daily"
                  label="I would like an email every time a new video is released" />
      <v-checkbox v-model="userInfo.email_weekly"
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
          name: '',
          email: '',
          password: '',
          agreeToTerms: false,
          email_daily: true,
          email_weekly: true
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

      a {
        margin: 0 5px;
      }
    }
    
  }
</style>