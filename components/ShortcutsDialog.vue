<template>
  <v-dialog v-model="dialog" width="500">
    <template #activator="{ on }">
      <v-btn x-small outlined v-on="on">
        ⌨️ Shortcuts
      </v-btn>
    </template>

    <v-card>
      <v-card-title class="headline grey lighten-2" primary-title>
        Available shortcuts
      </v-card-title>

      <v-card-text>
        <v-list-item>
          <v-list-item-title>
            <v-chip label>Space</v-chip> – Play/Pause
          </v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>
            <v-chip label>Left Arrow</v-chip> – Previous Video
          </v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>
            <v-chip label>Right Arrow</v-chip> – Next Video
          </v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>
            <v-chip label>d</v-chip> – Speed +0.25x
          </v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>
            <v-chip label>s</v-chip> – Speed -0.25x
          </v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>
            <v-chip label>m</v-chip> – Mark Played
          </v-list-item-title>
        </v-list-item>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="dialog = false">
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
    export default {
        name: "ShortcutsDialog",
        data() {
          return {
            dialog: false
          }
        }
    }
</script>

<style scoped>

</style>
