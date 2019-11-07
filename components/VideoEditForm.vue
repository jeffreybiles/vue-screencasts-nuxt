<template>
  <v-form v-model="valid">
    <v-text-field v-model="video.name" 
                  label="Name" 
                  counter=50
                  :rules="[required('name'), minLength('name', 5), maxLength('name', 50)]" />

    <MarkdownEditor :markdown="video.description">
      <v-textarea v-model="video.description" 
                  label="Description" 
                  counter=true
                  rows="9"
                  :rules="[required('description'), minLength('description', 20)]"/>
    </MarkdownEditor>

    <MarkdownEditor :markdown="video.code_summary">
      <v-textarea v-model="video.code_summary"
                  label="Code Summary" 
                  rows="12" />
    </MarkdownEditor>

    <v-text-field v-model="video.duration"
                  label="Duration (in seconds)" />
    <DurationDisplay :duration="video.duration" />
    <v-text-field v-model="video.videoUrl" 
                  label="Video URL" 
                  :rules="[required('video URL')]"
                  hint="If you want our friends in China to be able to watch this, please use Amazon S3 or similar instead of Youtube and Vimeo." />
    <v-text-field v-model="video.thumbnail" 
                  label="Thumbnail URL" 
                  :rules="[required('thumbnail URL')]" />
    <v-datetime-picker label="Select Datetime" v-model="video.published_at"> </v-datetime-picker>   
    <v-btn @click="saveVideo" :disabled="!valid">{{buttonText}}</v-btn>
  </v-form>
</template>

<script>
  import validations from '@/utils/validations';
  import DurationDisplay from '@/components/DurationDisplay'
  import MarkdownEditor from '@/components/MarkdownEditor';

  export default {
    components: {
      DurationDisplay,
      MarkdownEditor
    },
    data() {
      return {
        valid: false,
        ...validations
      }
    },
    props: ['video', 'saveVideo', 'buttonText']
  }
</script>

<style lang="scss" scoped>

</style>