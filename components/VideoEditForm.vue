<template>
  <v-form v-model="valid">
    <v-text-field v-model="videoCopy.name" 
                  label="Name" 
                  counter=50
                  :rules="[required('name'), minLength('name', 5), maxLength('name', 50)]" />
    <v-text-field v-model="videoCopy.duration"
                  label="Duration (in seconds)" >
      <template #prepend>
        <span class="duration-display">
          <DurationDisplay :duration="videoCopy.duration" />
        </span>
      </template>
    </v-text-field>

    <v-row>
      <v-col cols="12" sm="9" md="10">
        <S3FileUpload :obj="videoCopy" 
                      fieldName="videoUrl" 
                      directory="videos" 
                      label="Video File"/>
        <S3FileUpload :obj="videoCopy" 
                      fieldName="thumbnail" 
                      directory="thumbnails" 
                      label="Thumbnail Image" />
      </v-col>
      <v-col cols="12" sm="3" md="2">
        <VideoWatch :video="videoCopy" />
      </v-col>
    </v-row>

    <v-datetime-picker label="Select Datetime" v-model="videoCopy.published_at"> </v-datetime-picker>   

    <MarkdownEditor :markdown="videoCopy.description">
      <v-textarea v-model="videoCopy.description" 
                  label="Description" 
                  counter=true
                  rows="9"
                  :rules="[required('description'), minLength('description', 20)]"/>
    </MarkdownEditor>

    <MarkdownEditor :markdown="videoCopy.code_summary">
      <template #default>
        <v-textarea v-model="videoCopy.code_summary"
                    label="Code Summary" 
                    rows="12" />
      </template>
      <template #footer>
        This code will be displayed below the videoCopy.
      </template>
    </MarkdownEditor>

    <v-btn @click="save" :disabled="!valid">{{buttonText}}</v-btn>
  </v-form>
</template>

<script>
  import validations from '@/utils/validations';
  import DurationDisplay from '@/components/DurationDisplay'
  import MarkdownEditor from '@/components/MarkdownEditor';
  import VideoWatch from '@/components/VideoWatch';
  import S3FileUpload from '@/components/S3FileUpload';
  import _ from 'lodash';

  export default {
    components: {
      DurationDisplay,
      MarkdownEditor,
      VideoWatch,
      S3FileUpload
    },
    data() {
      return {
        valid: false,
        ...validations,
        videoCopy: _.cloneDeep(this.video)
      }
    },
    methods: {
      save(){
        this.saveVideo(this.videoCopy)
      }
    },
    props: {
      video: {
        type: Object,
        required: true
      },
      saveVideo: {
        type: Function,
        required: true
      }, 
      buttonText: {
        type: String,
        required: true
      }
    }
  }
</script>

<style lang="scss" scoped>
  .duration-display {
    background-color: grey; 
    color: white; 
    border-radius: 5px; 
    padding: 7px;
  }
</style>