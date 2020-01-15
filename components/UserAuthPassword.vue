<template>
  <div>
    <v-text-field :value="value"
                @input="$emit('input', $event)"
                :label="label"
                color="green"
                :type="showPassword ? 'text' : 'password'" 
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showPassword = !showPassword"
                counter=true
                :rules="chosenValidations"
                />
  </div>
</template>

<script>
  import validations from "@/utils/validations";

  export default {
    data(){
      return {
        ...validations,
        showPassword: false
      }
    },
    computed: {
      chosenValidations(){
        let validations = [];
        if(this.passwordRequired){
          validations.push(this.required('password'))
        }
        validations.push(this.minLength('password', 8))
        return validations
      }
    },
    props: {
      value: {
        type: String,
        required: true
      },
      label: {
        type: String,
        default: "Password"
      },
      passwordRequired: {
        type: Boolean,
        default: true
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>