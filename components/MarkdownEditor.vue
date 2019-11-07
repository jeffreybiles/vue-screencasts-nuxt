<template>
  <v-row>
    <v-col cols="12" sm="6">
      <slot></slot>
    </v-col>
    <v-col cols="12" sm="6">
      <MarkdownDisplay :markdown="markdown" />
    </v-col>
  </v-row>
</template>

<script>
  import MarkdownDisplay from '@/components/MarkdownDisplay';
  export default {
    components: {
      MarkdownDisplay
    },
    props: ['markdown']
  }
</script>

<style lang="scss" scoped>

</style>