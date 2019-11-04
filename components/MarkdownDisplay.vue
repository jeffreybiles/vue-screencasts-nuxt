<template>
  <div v-html="processedMarkdown"></div>
</template>

<script>
  import marked from 'marked';
  import highlight from 'highlight.js'
  import 'highlight.js/styles/solarized-dark.css';
  
  export default {
    computed: {
      processedMarkdown(){
        if(this.markdown){
          return marked(this.markdown, { 
            highlight: function(code) {
              return highlight.highlightAuto(code).value;
            },
          })
        }
      },  
    },
    props: ['markdown']
  }
</script>

<style lang="scss" scoped>
  ::v-deep code:before {
    content: "" !important;
  }
</style>