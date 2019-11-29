<template>
    <div v-html="processedMarkdown"></div>
</template>

<script>
  import marked from 'marked';
  import highlight from 'highlight.js';
  import 'highlight.js/styles/solarized-dark.css';
  
  export default {
    computed: {
      processedMarkdown(){
        if(this.markdown) {
          return marked(this.markdown, {
            highlight(md) {
              return highlight.highlightAuto(md).value
            }
          });
        } 
      }
    },
    props: {
      markdown: String
    }
  }
</script>

<style lang="scss" scoped>
  ::v-deep code:before {
    content: "" !important;
  }
</style>