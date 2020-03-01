<template>
  <ul>
    <li v-if="services.retainer">
      <font-awesome-icon icon="user-friends" /> Right there with you in the trenches.
    </li>
    <li v-if="services.actionPlan && !services.retainer">
      <font-awesome-icon icon="chart-bar" /> Analysis of your real-world situation.
    </li>
    <li v-if="services.actionPlan && !services.retainer">
      <font-awesome-icon icon="tasks" /> Custom action plan based on your goals.
    </li>
    <li v-if="services.videoChat">
      <font-awesome-icon icon="chalkboard-teacher" /> {{services.videoChat}} pair-programming sessions.
    </li>
    <li v-if="services.retainer">
      <font-awesome-icon icon="phone" /> Access via phone, text, and email.
    </li>
    <li v-if="services.retainer">
      <font-awesome-icon icon="hands-helping" /> On retainer for 4 hours a month, with option for further contracts.
    </li>

    <li v-if="services.weeklyCheckin">
      <font-awesome-icon icon="envelope" /> Weekly check-in.
    </li>
    <li v-if="services.groupFaq">
      <font-awesome-icon icon="user-friends" /> Monthly group FAQ sessions.
    </li>
    <li v-if="services.proCourses">
      <font-awesome-icon icon="laptop-code" /> Access to in-depth Pro courses released on a regular basis.
    </li>
    <li v-if="services.coursePriority">
      <font-awesome-icon icon="clock" /> {{services.coursePriority}} for suggesting which topics to cover next.
    </li>
    <li><font-awesome-icon icon="desktop" /> Access to 200+ existing videos.</li>
    <li><font-awesome-icon icon="arrows-alt-v" /> You can change your plan up or down at any time with no penalty.</li>
  </ul>
</template>

<script>
  export default {
    props: {
      services: {
        type: Object,
        required: true
      }
    }
  }
</script>

<style lang="scss" scoped>
  ul {
    padding: 0px;

    li {
      list-style-type: none;
    }
  }
</style>