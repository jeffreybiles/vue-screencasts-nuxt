<template>
  <div>
    <v-checkbox v-model="user.email_daily"
                label="Receive emails when new videos are released (several times per week)"
                @change="saveUser" />
    <v-checkbox v-model="user.email_weekly"
                label="Receive weekly email newsletter"
                @change="saveUser" />
  </div>
</template>

<script>
  export default {
    methods: {
      async saveUser() {
        try {
          await this.$store.dispatch('user/update', this.user)
          this.$store.dispatch('snackbar/setSnackbar', {text: `Your preferences have been saved.`})
        } catch {
          this.$store.dispatch('snackbar/setSnackbar', {
            color: 'error', 
            text: `There was an error.  Please email me (jeffrey@vuescreencasts.com) and I will fix the issue, then update your subscription manually.`,
            timeout: 0
          })
        }
      }
    },
    props: {
      user: {
        type: Object,
        required: true
      }
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