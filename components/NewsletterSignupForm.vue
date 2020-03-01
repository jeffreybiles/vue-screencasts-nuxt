<template>
  <div class="email-signup">
    <div class="row">
      <div class="col-sm-6">
        <v-text-field v-model="email" label="Email" class="email-field pb-0" hint="To be notified of new videos and get a weekly newsletter, put your email in here" />
      </div>
      <div class="col-sm-6">
        <v-btn style="height: 100%; min-height: 40px; width: 100%;">Sign Up for free newsletters</v-btn>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        email: ''
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