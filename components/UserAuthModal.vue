<template>
  <span>
    <slot :openModal="() => dialog = true">
      <v-btn @click="dialog = true">Open</v-btn>
    </slot>
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <v-card min-height="200px" min-width="200px">
        Auth goes here
      </v-card>
    </v-dialog>
  </span>
</template>

<script>
  import UserAuthForm from '@/components/UserAuthForm.vue';

  export default {
    components: {
      UserAuthForm
    },
    data(){
      return {
        dialog: false
      }
    },
    methods: {
      async loginUser(loginInfo){
        try {
          await this.$auth.loginWith('local', {
            data: loginInfo
          })
          this.$store.dispatch('snackbar/setSnackbar', {text: `Thanks for signing in, ${this.$auth.user.name}`})
          this.$router.push('/')
        } catch {
          this.$store.dispatch('snackbar/setSnackbar', {color: 'red', text: 'There was an issue signing in.  Please try again.'})
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>