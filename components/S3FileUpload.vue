<template>
  <!-- the basic issue is the difference -->
  <div v-if="isUploading">
    <p>Uploading, please wait...</p>
  </div>
  <div v-else>
    <v-file-input v-model="uploadObject"
                  :label="label" 
                  truncateLength="125"
                  @change="uploadFile()" />
  </div>
</template>

<script>
  import S3 from 'aws-s3';

  export default {
    data() {
      return {
        isUploading: false,
        uploadObject: {name: this.obj[this.fieldName]},
        randomNumber: `${Math.random().toString().slice(2, 10)}`
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
      newFileName(){
        return `${this.randomNumber}-${this.uploadObject.name}`
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
        this.isUploading = true;
        this.S3Client.uploadFile(file, this.newFileName).finally(()=>{
          this.isUploading = false;
          let fileExtension = file.type.split('/')[1];
          this.obj[this.fieldName] = `${this.url}.${fileExtension}`
        })
      }
    },
    props: ['directory', 'label', "obj", "fieldName"]
  }
</script>

<style lang="scss" scoped>

</style>