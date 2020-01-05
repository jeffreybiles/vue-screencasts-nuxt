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
    <p>Just a new video (almost) every morning, ready to help you to effortlessly level up your skills.</p>
    <p>Your career is worth the investment.</p> -->
    
    <p>Yeah, the site needs a designer.  There's not much Pro content yet.</p>
    <p>That's why, as a 'thank you' for believing in the project, I'm offering the biggest deal I'll ever offer.</p>

    <div class="display-2">Order now and get <strong>75% off</strong> the full price.</div>
    <div class="display-2 pt-2">Plus: for the first year, <strong>100% of your subscription goes to Open Source</strong>.</div>
 
    <p class="headline pt-4 mb-1">This is the biggest sale I'll ever have...</p>
    <p class="headline">and if you order now, it doesn't end. You get to keep your massively discounted rate for as long as you stay subscribed.</p>

    <h2>Here's what you get with your subscription</h2>
    
    <ul>
      <li>Instant access to <strong>all Pro courses and videos</strong>.</li>
      <li>(coming soon) <strong>New videos most workdays.</strong></li>
      <li>(coming soon) Ability to <strong>download videos for offline viewing</strong>.</li>
      <li>(coming soon) More votes on <strong>user-selected topics</strong>.</li>
      <li>25% of your subscription goes to help <strong>support the VueJS community</strong>.</li>
    </ul>

    <StripeCheckoutButton buttonText="Subscribe $9/month" planId="plan_GUbsLVGwbTE2K1" />
    <StripeCheckoutButton buttonText="Subscribe $90/year" planId="plan_GUbw5FDN0z2EHe" />

  </v-container>
</template>

<script>
  import StripeCheckoutButton from '@/components/StripeCheckoutButton.vue';
  export default {
    components: {
      StripeCheckoutButton
    }
  }
</script>

<style lang="scss" scoped>

</style>