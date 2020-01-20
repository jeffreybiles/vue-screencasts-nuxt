<template>
  <v-form v-model="valid">
    <v-text-field :value="video.name" 
                  @input="updateVideo('name', $event)"
                  label="Name" 
                  counter=50
                  :rules="[required('name'), minLength('name', 5), maxLength('name', 50)]" />
    <v-text-field :value="video.duration"
                  @input="updateVideo('duration', $event)"
                  label="Duration (in seconds)" >
      <template #prepend>
        <span class="duration-display">
          <DurationDisplay :duration="video.duration" />
        </span>
      </template>
    </v-text-field>

    <v-row>
      <v-col cols="12" sm="9" md="10">
        <S3FileUpload :obj="video" 
                      fieldName="videoUrl" 
                      directory="videos" 
                      label="Video File"/>
        <S3FileUpload :obj="video" 
                      fieldName="thumbnail" 
                      directory="thumbnails" 
                      label="Thumbnail Image" />
      </v-col>
      <v-col cols="12" sm="3" md="2">
        <VideoWatch :video="video" />
      </v-col>
    </v-row>

    <v-datetime-picker label="Select Datetime" 
                       :datetime="video.published_at"
                       @input="updateVideo('published_at', $event)" />

    <MarkdownEditor :markdown="video.description">
      <v-textarea :value="video.description" 
                  @input="updateVideo('description', $event)"
                  label="Description" 
                  counter=true
                  rows="9"
                  :rules="[required('description'), minLength('description', 20)]"/>
    </MarkdownEditor>

    <MarkdownEditor :markdown="video.code_summary">
      <template #default>
        <v-textarea :value="video.code_summary"
                    @input="updateVideo('code_summary', $event)"
                    label="Code Summary" 
                    rows="12" />
      </template>
      <template #footer>
        This code will be displayed below the video.
      </template>
    </MarkdownEditor>

    <v-btn @click="saveVideo" :disabled="!valid">{{buttonText}}</v-btn>
  </v-form>
</template>

<script>
  import validations from '@/utils/validations';
  import DurationDisplay from '@/components/DurationDisplay'
  import MarkdownEditor from '@/components/MarkdownEditor';
  import VideoWatch from '@/components/VideoWatch';
  import S3FileUpload from '@/components/S3FileUpload';

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
        ...validations
      }
    },
    methods: {
      updateVideo(property, newValue) {
        this.$store.dispatch('videos/update', {video: this.video, property, newValue});
      },
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