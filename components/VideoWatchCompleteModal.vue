<template>
  <v-dialog
    v-model="open"
    @click:outside="close"
    width="500"
  >
    <v-card min-height="200px" min-width="300px">
      <div class="pa-3">
        Hey
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    computed: {
      open(){
        return this.isOpen;
      }
    },
    props: {
      isOpen: Boolean,
      close: Function
    }
  }
</script>

<style lang="scss" scoped>

</style>