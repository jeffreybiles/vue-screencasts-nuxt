<template>
  <div>
    <h1>Edit Personal Details</h1>

    <v-form v-model="valid">
      <v-text-field color="green"
                    label="name"
                    v-model="user.name"
                    :rules="[required('name')]" />
      <v-text-field color="green"
                    label="email"
                    v-model="user.email"
                    :rules="[emailFormat()]"/>

      <UserAuthPassword v-model="newPassword"
                        label="New Password (leave blank if not changing)"
                        :passwordRequired="false" />

      <UserAuthPassword v-model="oldPassword"
                        label="Old Password (required to change anything)" />

      <ButtonAsync color="green accent-3" :clickAction="updateInfo" :disabled="!valid">
        Update Info
      </ButtonAsync>
    </v-form>
    <!-- Submit button -->
  </div>
</template>

<script>
  import validations from "@/utils/validations";
  import UserAuthPassword from '@/components/UserAuthPassword.vue';
  import ButtonAsync from '@/components/ButtonAsync.vue';

  export default {
    middleware: 'auth-guard',
    data(){
      return {
        ...validations,
        user: this.$auth.user,
        newPassword: '',
        oldPassword: '',
        valid: false
      }
    },
    components: {
      UserAuthPassword,
      ButtonAsync
    },
    methods: {
      async updateInfo(){
        let user = this.user;

        try {
          let response = await this.$axios.put(`/users/${user.id}`, {
            name: user.name,
            email: user.email,
            new_password: this.newPassword,
            old_password: this.oldPassword
          })
          this.$store.dispatch('snackbar/setSnackbar', {text: "You have successfully edited your personal details."})
          this.$router.push('/account')
        } catch {
          this.$store.dispatch('snackbar/setSnackbar', {color: 'red', text: "Something went wrong :( Check that you got the right password, or contact jeffrey: jeffrey@vuescreencasts.com", timeout: 0})
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
