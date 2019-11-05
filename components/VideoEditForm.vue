<template>
  <v-form v-model="valid">
    <v-text-field v-model="video.name" 
                  label="Name" 
                  counter=50
                  :rules="[required('name'), minLength('name', 5), maxLength('name', 50)]" />
    <v-row>
      <v-col cols="12" sm="6">
        <v-textarea v-model="video.description" 
                    label="Description" 
                    counter=true
                    rows="9"
                    :rules="[required('description'), minLength('description', 20)]"/>
      </v-col>
      <v-col cols="12" sm="6">
        <MarkdownDisplay :markdown="video.description" />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6">
        <v-textarea v-model="video.code_summary"
                    label="Code Summary" 
                    rows="12" />
      </v-col>
      <v-col cols="12" sm="6">
        <MarkdownDisplay :markdown="video.code_summary" />
      </v-col>
    </v-row>
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
  import MarkdownDisplay from '@/components/MarkdownDisplay';

  export default {
    components: {
      DurationDisplay,
      MarkdownDisplay
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