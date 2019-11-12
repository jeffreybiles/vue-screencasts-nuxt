<template>
  <input type="file" @change="uploadFile(fieldName, $event.target.files)"/>
</template>

<script>
  import S3 from 'aws-s3';

  export default {
    computed: {
      s3Keys(){
        return this.$auth.user.s3_keys;
      },
      config(){
        return {
            bucketName: 'vue-screencasts-uploads',
            dirName: this.directory,
            region: 'us-west-2',
            accessKeyId: this.s3Keys.id,
            secretAccessKey: this.s3Keys.secret,
            s3Url: this.baseURL
        }
      },
      baseURL(){
        return 'https://vue-screencasts-uploads.s3-us-west-2.amazonaws.com'
      },
      S3Client(){
        return new S3(this.config);
      },
      newFileName(){
        return Math.random().toString().slice(2)
      },
      url(){
        return `${this.baseURL}/${this.directory}/${this.newFileName}`;
      }
    },
    methods: {
      uploadFile(fieldName, files) {
        let file = files[0]

        this.isLoading = true
        this.S3Client
            .uploadFile(file, this.newFileName).finally(()=>{
              this.isLoading = false
              let fileExtension = file.type.split('/')[1]
              this.obj[this.fieldName] = `${this.url}.${fileExtension}`
            })
      }
    },
    props: ['fieldName', 'obj', 'directory']
  }
</script>

<style lang="scss" scoped>

</style>