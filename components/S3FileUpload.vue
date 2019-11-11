<template>
  <!-- the basic issue is the difference -->
  <v-file-input v-model="uploadObject"
                :label="label" 
                @change="uploadFile()" />
</template>

<script>
  import S3 from 'aws-s3';
  
  export default {
    data() {
      return {
        uploadObject: {name: 'hey'},
        newFileName: `${this.video.id}${Math.random().toString().slice(2)}`
      }
    },
    computed: {
      s3Keys() {
        return this.$auth.user.s3_keys;
      },
      config(){
        return {
          bucketName: 'vue-screencasts-uploads',
          dirName: this.directory,
          region: 'us-west-2',
          accessKeyId: this.s3Keys.id,
          secretAccessKey: this.s3Keys.secret,
          url: this.baseUrl
        }
      },
      baseUrl(){
        return `https://vue-screencasts-uploads.s3-us-west-2.amazonaws.com`
      },
      url(){
        return `${this.baseUrl}/${this.directory}/${this.newFileName}`
      },
      S3Client(){
        return new S3(this.config);
      }
    },
    methods: {
      uploadFile() {
        let file = this.uploadObject;
        this.S3Client.uploadFile(file, this.newFileName)
                     .then(data => {
                       debugger
                       console.log(data)
                     })
                     .catch(err => {
                       debugger
                       console.error(err)
                     })
      }
    },
    props: ['directory', 'label', "field", "video"]
  }
</script>

<style lang="scss" scoped>

</style>