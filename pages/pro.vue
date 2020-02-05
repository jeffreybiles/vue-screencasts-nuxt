
<template>
  <v-container style="max-width: 1024px;">
    <!-- Uncomment this sales pitch once I'm ready to charge -->

    <div class="display-1 text-center pa-3">
      Study Vue <font-awesome-icon icon="laptop-code" />. 
      Level Up <font-awesome-icon icon="arrow-up" />. 
      Leap Forward <font-awesome-icon icon="dollar-sign" />.  
    </div>

    <SubscriptionLinks />

    <br class="pa-3">

    <p class="headline"><strong>Instant access to a wealth of VueJS knowledge</strong></p>
    <p class="subheader">Like most developers, you're either getting paid based on your skills... or you're busy trying to snag a higher-paying gig where you are.</p>
    <p class="subheader"><strong>Knowledge and skill equals money.</strong></p>
    <p>So, how are you going to get those skills?</p>
    <p>At VueScreencasts.com, we go beyond the Todo List app.</p>
    <p><strong>Big Real-World Projects</strong> give you experience seeing real problems solved on a large scale.</p>
    <p><strong>Focused Tutorials</strong> dig deep into techniques, concepts, and libraries.
    <p><strong>Guided Exercises</strong> give you <em>actual experience</em> using advanced techniques, in a controlled environment that reduces frustration while maximizing knowledge.</p>
    <p>There's already 19 hours of video, with more being added every week.</p>
    <p><strong>Your career is worth the investment.</strong></p>

    <p class="headline text-center">Subscribe before February 6th to get the super-early-bird discount</p>

    <SubscriptionLinks />

    <br>

    <p class="headline text-center">What am I getting if I subscribe?</p>

    <ul style="margin: auto; max-width: 550px;">
      <li>Instant access to <strong>all Pro courses and videos</strong>.</li>
      <li><strong>New course every week</strong>.</li>
      <li>(coming soon) Ability to <strong>download videos for offline viewing</strong>.</li>
      <li>(coming soon) More votes on <strong>user-selected topics</strong>.</li>
      <li><strong>Lock in early-bird pricing</strong> for as long as you stay subscribed.</li>
      <li>25% of your subscription goes to help <strong>support the VueJS community</strong>.</li>
    </ul>
    <br>
    <SubscriptionLinks />

  </v-container>
</template>

<script>
  import SubscriptionLinks from '@/components/SubscriptionLinks.vue';
  
  export default {
    components: {
      SubscriptionLinks
    },
    head(){
      let title = `Become a VueScreencasts Pro`
      let description = "Pro members get access to every single video in our library, and more member-exclusive perks are coming soon."
      return {
        title: title,
        meta: [
          {hid: 'description', property: 'description', content: description},
          {hid: 'og-description', property: 'og:description', content: description},
          {hid: 'twitter-description', property: 'twitter:description', content: description},
          {hid: 'og-title', property: 'og:title', content: title},
          {hid: 'twitter-title', property: 'twitter:title', content: title},
        ]
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>