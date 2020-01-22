<template>
  <v-form v-model="valid">
    <v-text-field v-model="videoChangeset.name" 
                  label="Name" 
                  counter=50
                  :rules="[required('name'), minLength('name', 5), maxLength('name', 50)]" />
    <v-text-field v-model="videoChangeset.duration"
                  label="Duration (in seconds)" >
      <template #prepend>
        <span class="duration-display">
          <DurationDisplay :duration="videoChangeset.duration" />
        </span>
      </template>
    </v-text-field>

    <v-row>
      <v-col cols="12" sm="9" md="10">
        <S3FileUpload :obj="videoChangeset" 
                      fieldName="videoUrl" 
                      directory="videos" 
                      label="Video File"/>
        <S3FileUpload :obj="videoChangeset" 
                      fieldName="thumbnail" 
                      directory="thumbnails" 
                      label="Thumbnail Image" />
      </v-col>
      <v-col cols="12" sm="3" md="2">
        <VideoWatch :video="videoChangeset" />
      </v-col>
    </v-row>

    <v-datetime-picker label="Select Datetime" 
                      v-model="videoChangeset.published_at" />

    <MarkdownEditor :markdown="videoChangeset.description">
      <v-textarea v-model="videoChangeset.description"
                  label="Description" 
                  counter=true
                  rows="9"
                  :rules="[required('description'), minLength('description', 20)]"/>
    </MarkdownEditor>

    <MarkdownEditor :markdown="videoChangeset.code_summary">
      <template #default>
        <v-textarea v-model="videoChangeset.code_summary"
                    label="Code Summary" 
                    rows="12" />
      </template>
      <template #footer>
        This code will be displayed below the videoChangeset.
      </template>
    </MarkdownEditor>

    <v-btn @click="cancel">Cancel</v-btn>
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
        videoChangeset: _.cloneDeep(this.video)
      }
    },
    methods: {
      cancel(){
        this.cancelAction()
      },
      save(){
        this.saveVideo(this.videoChangeset)
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
      },
      cancelAction: {
        type: Function,
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