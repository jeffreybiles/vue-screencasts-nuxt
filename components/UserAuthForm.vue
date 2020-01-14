<template>
  <v-form v-model="valid">
    <v-text-field v-model="userInfo.name" 
                  label="Name" 
                  color="green"
                  :rules="[required('name')]"
                  v-if="hasName" />

    <v-text-field v-model="userInfo.email" 
                  label="Email"
                  color="green" 
                  :rules="[required('email'), emailFormat()]"/>

    <v-text-field v-model="userInfo.password"
                  label="Password"
                  color="green"
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
                  color="green"
                  :rules="[required('agreeToTerms', 'You must agree to the terms and conditions and privacy policy')]">
        <template #label @click.stop>
          <span>
            I have read and agree to the 
            <a href="/policies/terms-and-conditions" target="_blank" @click.stop>Terms and Conditions</a>
            and 
            <a href="/policies/privacy-policy" target="_blank" @click.stop>Privacy Policy</a>
          </span>
        </template>
      </v-checkbox>
      <v-checkbox v-model="userInfo.email_weekly"
                  color="green"
                  label="I would like a weekly email newsletter with a summary of the week's videos and fun VueJS news (starting early January)" />
    </div>

    <v-btn @click="submitForm(userInfo)" :disabled="!valid" color="green accent-3">{{ buttonText }}</v-btn>
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

</style>