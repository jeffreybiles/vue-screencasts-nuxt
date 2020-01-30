
<template>
  <v-container>
    <!-- Uncomment this sales pitch once I'm ready to charge -->
    <!-- <h1>Instant access to a wealth of VueJS knowledge</h1>
    <p>Like most developers, you're either getting paid based on your skills... or you're busy trying to snag a higher-paying gig where you are.</p>
    <p><strong>Knowledge and skill equals money.</strong></p>
    <p>I put in hours upon hours of research when preparing a course, condensing complex topics into something you can pick up five or ten minutes at a time.</p>
    <p>More importantly, I'm focusing on the types of problems you'll see in a real professional setting, not the toy problems you'll see everywhere else.</p>
    <p><strong>I'm not going to waste your time.</strong></p>

    <p>No fluff.</p>
    <p>No flash.</p>
    <p>Just a new videos every week, ready to help you to effortlessly level up your skills.</p>
    <p>Your career is worth the investment.</p> -->

    <div class="display-1 text-center pa-3">
      Study Vue <font-awesome-icon icon="laptop-code" />. 
      Level Up <font-awesome-icon icon="arrow-up" />. 
      Leap Forward <font-awesome-icon icon="dollar-sign" />.  
    </div>

    <SubscriptionLinks />

    <br class="pa-3">

    <p class="headline">
      Here's the deal... I want to make you the best Vue developer possible.
    </p>

    <p class="subheader">
      To do that, I'm going to be releasing a new course every week.
      And these courses aren't going to just be the "first fifteen minutes with X" you see all over YouTube... 
      they're in-depth, and advanced developers have commented, telling me they've been learning from them.  Sometimes even the courses I thought were for beginners!
    </p>
    
    <p>Yeah, the site needs a designer.  Yeah, there's only free content so far.  It's not perfect.</p>
    <p>That's why, as a 'thank you' for believing in the project, I'm giving you the biggest deal I'll ever offer.</p>

    <p class="display-1">Order now and get <strong>75% off</strong> the monthly subscription.</p>
    <p class="display-1 pt-1">Plus: for the first year, <strong>100% of your subscription goes to Open Source</strong>.</p>
 
    <p class="headline pt-1 mb-1">This is the biggest sale I'll ever have... and if you order now, it doesn't end. You get to <strong>keep your massively discounted rate for as long as you stay subscribed</strong>.</p>
      <p class="display-1"><strong>Sale ends February 6th, when I release the first Pro course</strong>.</p>

    <p class="headline">Here's what you get with your subscription:</p>
    
    <ul>
      <li>Instant access to <strong>all Pro courses and videos</strong>.</li>
      <li><strong>New course every week</strong>.</li>
      <li>(coming soon) Ability to <strong>download videos for offline viewing</strong>.</li>
      <li>(coming soon) More votes on <strong>user-selected topics</strong>.</li>
      <li>25% of your subscription goes to help <strong>support the VueJS community</strong>.</li>
    </ul>

    <p class="subheader pt-2"><strong>Sale ends Thursday, February 6th</strong>.</p>

    <p class="headline text-center">What are you waiting for?</p>

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