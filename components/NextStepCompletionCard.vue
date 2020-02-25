<template>
  <div>
    <v-row :class="['perk-step', stepCompleted ? 'minimized-step' : '']">
      <v-col cols="10" class="message">
        <slot />
      </v-col>
      <v-col cols="2" class="completion">
        <font-awesome-icon icon="thumbs-up" size="3x" v-if="stepCompleted" />
        <v-btn @click="markComplete('actionPlan')" 
              color="green accent-3" 
              v-else>
          Mark Complete
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
  export default {
    props: {
      markComplete: {
        type: Function,
        required: true
      },
      stepCompleted: {
        type: Boolean,
        required: true
      }
    }    
  }
</script>

<style lang="scss" scoped>
  .perk-step {
    border: 1px solid black;
    padding: 8px;
    margin-top: 8px;

    .completion {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    &.minimized-step {
      .message {
        opacity: 0.7;
      }
    }

    .col {
      padding: 4px;
    }

    p {
      margin: 6px 0;
    }
  }
</style>