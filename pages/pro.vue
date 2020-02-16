
<template>
  <v-container style="max-width: 1024px;">
    <p class="headline"><strong>Instant access to a wealth of VueJS knowledge</strong></p>
    <p class="subheader">Like most developers, you're either getting paid based on your skills... or you're busy trying to snag a higher-paying gig where you are.</p>
    <p class="subheader"><strong>Knowledge and skill equals money.</strong></p>
    <p>So, how are you going to get those skills?</p>
    <p>At VueScreencasts.com, we go beyond the first fifteen minutes, beyond the todo app, and dig deep into subjects that will level up your skills and get you paid.</p>
    <p>Whatever your commitment level, we've got a package that will get you where you want to go.</p>
    <ProPackageCard :stripePlanId="5">
      <p>You're all-in.  You've got lots of money on the line, and you need to be able to deliver.</p>
      <p>I'm here to help.</p>
      <p>With the Platinum package:</p>
    </ProPackageCard>

    <ProPackageCard :stripePlanId="4">
      <p>You're making money from your Vue skills -- or hope to be soon -- and are ready to take it to the next level.</p>
      <p>With the Gold package, you get:</p>
    </ProPackageCard>

    <ProPackageCard :stripePlanId="3">
      <p>With the Silver package, you get:</p>
    </ProPackageCard>

    <ProPackageCard :stripePlanId="6">
      <p>With the Bronze package, you get:</p>
    </ProPackageCard>

    <ProPackageCard :stripePlanId="2">
      <p class="headline">Subscribe before March 5th to get the early-bird discount</p>

      <p>With the Pro subscription, you get:</p>
    </ProPackageCard>

    <ProPackageCard :stripePlanId="7">
      <p>With the Free plan, you get:</p>
    </ProPackageCard>


    <br class="pa-3">


    <div class="display-1 text-center pa-3">
      Study Vue <font-awesome-icon icon="laptop-code" />. 
      Level Up <font-awesome-icon icon="arrow-up" />. 
      Leap Forward <font-awesome-icon icon="dollar-sign" />.  
    </div>
  </v-container>
</template>

<script>
  import SubscriptionLinks from '@/components/SubscriptionLinks.vue';
  import ProPackageCard from '@/components/ProPackageCard.vue';
  
  export default {
    components: {
      SubscriptionLinks,
      ProPackageCard
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