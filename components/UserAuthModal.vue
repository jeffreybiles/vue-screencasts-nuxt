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
          <UserAuthTogglableForm />
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
  }
</script>

<style lang="scss" scoped>

</style>