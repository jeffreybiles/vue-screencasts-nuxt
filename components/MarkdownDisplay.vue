<template>
  <div v-html="processedMarkdown"></div>
</template>

<script>
  import marked from 'marked';

  export default {
    computed: {
      processedMarkdown(){
        if(this.markdown){
          return marked(this.markdown)
        }
      },  
    },
    props: ['markdown']
  }
</script>

<style lang="scss" scoped>

</style>