<template>
  <div>
    <div v-if="isLoading">
      <p>Uploading your file, please wait...</p>
    </div>
    <div v-else>
      <v-file-input v-model="uploadObject" 
                    @change="uploadFile"
                    :label="label"
                    truncate-length="125" />
    </div>
  </div>
</template>

<script>
  import S3 from 'aws-s3';

  export default {
    data(){
      return {
        isLoading: false,
        uploadObject: {name: this.obj[this.fieldName]}
      }
    },
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
        return `${Math.random().toString().slice(2, 5)}-${this.uploadObject.name}`
      },
      url(){
        return `${this.baseURL}/${this.directory}/${this.newFileName}`;
      }
    },
    methods: {
      uploadFile() {
        let file = this.uploadObject

        this.isLoading = true
        this.S3Client
            .uploadFile(file, this.newFileName).finally(()=>{
              this.isLoading = false
              let fileExtension = file.type.split('/')[1]
              this.obj[this.fieldName] = `${this.url}.${fileExtension}`
            })
      }
    },
    props: ['fieldName', 'obj', 'directory', 'label']
  }
</script>

<style lang="scss" scoped>

</style>