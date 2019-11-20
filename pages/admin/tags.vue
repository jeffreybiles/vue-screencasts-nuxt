<template>
  <div>
    <div class="flex-table">
      <div>Name</div>
      <div># videos</div>
      <div></div>
    </div>
    <div v-for="tag in tags" :key="tag.id" class="flex-table">
      <div>
        <div v-if="tagEditingId == tag.id">
          <v-text-field v-model="tag.name"
                        :id="`tag-edit-${tag.id}`"
                        @blur="updateTagName(tag)"
                        @keydown.enter="updateTagName(tag)" />
        </div>
        <div v-else @click="setToEditing(tag)">
          {{tag.name}}
        </div>
      </div>
      <div>
        <router-link :to="`/tags/${tag.id}`">
          {{tag.video_ids.length}}
        </router-link>
      </div>
      <div class="actions">
        <v-btn x-small @click="setToEditing(tag)">Edit</v-btn>
        <v-btn x-small @click="deleteTag(tag)">Delete</v-btn>
      </div>
    </div>
    <div v-if="!isEditingNewTag">
      <v-btn @click="startNewTag()">Add Tag</v-btn>
    </div>
    <div v-else>
      <v-text-field v-model="newTagName"
                    :id="`new-tag-name`"
                    @blur="createTag()"
                    @keydown.enter="createTag()" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

  export default {
    data() {
      return {
        tagEditingId: '',
        isEditingNewTag: false,
        newTagName: '',
      }
    },
    computed: {
      ...mapState({
        tags: state => state.tags.tags
      })
    },
    methods: {
      setToEditing(tag) {
        this.tagEditingId = tag.id;

        this.$nextTick(()=> {
          document.getElementById(`tag-edit-${tag.id}`).focus()
        })
      },
      updateTagName(tag) {
        this.$store.dispatch('tags/updateName', {tag})

        this.tagEditingId = ''
      },
      deleteTag(tag) {
        let confirmed = confirm(`Are you sure you want to delete tag ${tag.name}? It is connected to ${tag.video_ids.length} videos.`)
        if(confirmed){
          this.$store.dispatch('tags/delete', {tag});
        }
      },
      startNewTag(){
        this.isEditingNewTag = true;

        setTimeout(()=> {
          document.getElementById(`new-tag-name`).focus()
        }, 1)
      },
      createTag(){
        if(this.newTagName.length > 0) {
          this.$store.dispatch('tags/create', {name: this.newTagName})
          this.newTagName = ''
        }
        this.isEditingNewTag = false
      }
    }
  }
</script>

<style lang="scss" scoped>
  .flex-table {
    display: grid;
    grid-template-columns: repeat(auto-fill, 33%);
    padding: 10px;
    border-bottom: 1px black solid;

    &:nth-of-type(2n) {
      background-color: #dedede;
    }

    .actions {
      * {
        margin-right: 10px
      }
    }
  }
</style>