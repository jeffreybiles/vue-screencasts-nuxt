<template>
  <input type="file" @change="uploadFile(fieldName, $event.target.files)"/>
</template>

<script>
  export default {
    methods: {
      uploadFile(fieldName, files) {
        let file = files[0]
        // TODO: Upload it to S3
        // Get the URL for the file
        this.obj[fieldName] = file.name
      }
    },
    props: ['fieldName', 'obj']
  }
</script>

<style lang="scss" scoped>

</style>