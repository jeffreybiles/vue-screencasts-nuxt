<template>
  <v-row>
    <v-col cols="12" sm="6">
      <v-textarea v-model="markdown" 
                  label="Description" 
                  counter=true
                  :rows="rows || 9"
                  :rules="[required('description'), minLength('description', 20)]"/>      
    </v-col>
    <v-col cols="12" sm="6">
      <MarkdownDisplay :markdown="markdown" />
    </v-col>
  </v-row>
</template>

<script>
  import validations from '@/utils/validations';
  import MarkdownDisplay from '@/components/MarkdownDisplay';

  export default {
    components: {
      MarkdownDisplay
    },
    data() {
      return {...validations}
    },
    computed: {
      mark(){
        return this.markdown;
      }
    },
    props: ['markdown', 'rows']
  }
</script>

<style lang="scss" scoped>

</style>