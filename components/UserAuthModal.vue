<template>
  <span>
    <slot :openModal="() => isOpen = true">
      <v-btn @click="isOpen = true">Open</v-btn>
    </slot>
    <v-dialog
      v-model="isOpen"
      width="500"
    >
      <v-card min-height="200px" min-width="300px">
        <div class="pa-4">
          <div class="headline" v-if="topPhrase">{{topPhrase}}</div>
          <UserAuthTogglableForm :loginPhrase="loginPhrase"
                                 :registerPhrase="registerPhrase"
                                 :postLoginAction="postLoginAction"
                                 :postRegisterAction="postRegisterAction" />
        </div>
      </v-card>
    </v-dialog>
  </span>
</template>

<script>
  import UserAuthTogglableForm from '@/components/UserAuthTogglableForm.vue';

  export default {
    components: {
      UserAuthTogglableForm
    },
    data(){
      return {
        isOpen: false,
      }
    },
    props: {
      topPhrase: {
        type: String
      },
      registerPhrase: {
        type: String,
        default: "Register"
      },
      loginPhrase: {
        type: String,
        default: "Login"
      },
      postRegisterAction: {
        type: Function,
        default: () => {}
      },
      postLoginAction: {
        type: Function,
        default: () => {}
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>