<template>
  <div>
    <HomePageSection sectionId="why-vue" classes="hero">
      <div class="col-md-6 col-sm-12">
        <!-- TODO: Fix this styling -->
        <h1>VueScreencasts.com</h1>
        <h3>All things intermediate and advanced</h3>

        <p>Whether you hire us, receive mentorship, or work at your own pace, this is as close to uploading Vue to your brain as it gets.</p>
        <p>Choose a solution:</p>

        <div class="bullet-points">
          <div class="bullet-point">
            <v-btn to="/pro?solution=pro-platinum" color="green accent-2">Hire Me</v-btn>
            <p>Coaching while working with you in the trenches of your project.</p>
          </div>
          <div class="bullet-point">
            <v-btn to="/pro?solution=pro-gold" color="green accent-2">Mentorship and Training</v-btn>
            <p>Custom action plans and regular pair-programming.</p>
          </div>
          <div class="bullet-point">
            <v-btn to="/pro?solution=pro-platinum" color="green accent-2">Quality Learning</v-btn>
            <p>Structured courses and high-quality videos.</p>
          </div>
          <div class="bullet-point">  
            <v-btn to="/courses" color="green accent-2">Free Videos</v-btn>
            <p>200+ free videos because we're cool like that.</p>
          </div>
        </div>
      </div>
      <div class="col-md-6 col-sm-12 center-md">
        <img src="~assets/happy-vue-programmer.png" class="img-responsive bottom-image" alt="Happy Vue Programmer">
      </div>
    </HomePageSection>

    <div class="bg-gray">
      <TestimonialsRow :testimonialIds="['65', '21', '81', '27']" class="paper-container-large" />
    </div>


    <div class="bg-dark">
      <TestimonialsRow :testimonialIds="['87', '77', '98', '76']" class="paper-container-large" />
    </div>

    <div class="bg-white">
      <TestimonialsRow :testimonialIds="['63', '48', '34', '99']" class="paper-container-large" />
    </div>


    <HomePageSection classes="bg-dark" id="pro-platinum">
      <div class="col-sm-12 center-md">
        <div class="header-section">
          <h2 class="section-title">Platinum Package</h2>
          <h2 class="section-subtitle">When the Survival of your Company or Job is on the line.</h2>
        </div>

        <ProPackageCard :stripePlanId="5" 
                        nextSolutionId="pro-gold"
                        bossLink="https://docs.google.com/document/d/13StavsXklWSzuYk0PN9G9LAja9QfXfwwJQkg3IpRcRU/edit?usp=sharing">
          <p><strong>YOU'RE HIRING ME.  LET'S DO IT NOW.</strong></p>
          <p>I am right there, coding with you in the trenches. I will care about your project as much as you do. I will also coach you and make you succeed.</p>
          <p>Imploding projects? Impossible deadlines?</p> 
          <p>Hire me and let's get started.</p>
        </ProPackageCard>
      </div>
    </HomePageSection>

    <div class="bg-gray">
      <TestimonialsRow :testimonialIds="['4', '96', '92', '1']" class="paper-container-large" />
    </div>
    
    <HomePageSection class="bg-dark" id="pro-gold">
      <div class="col-sm-12 center-md">
        <div class="header-section">
          <h2 class="section-title">Gold Package</h2>
          <h2 class="section-subtitle">Your Best Bet for Fast Growth.</h2>
        </div>

        <ProPackageCard :stripePlanId="4" 
                        nextSolutionId="pro-silver"
                        bossLink="https://docs.google.com/document/d/166C59AXbqgFGSz1iRhwrp-MXUqIkKLCxpplJIcITwyU/edit?usp=sharing">
          <p>You have a clear goal, but that's not enough.</p>
          <p>You also need a specific, detailed action plan that maximizes your learning while respecting your time. Followed up by one-on-one pair-coding sessions to hold you accountable and keep you winning.</p>
          <p>Say goodbye to overwhelm.</p>
          <p>Say hello to growth.</p>
        </ProPackageCard>
      </div>
    </HomePageSection>

    <div class="bg-gray">
      <TestimonialsRow :testimonialIds="['79', '3', '56', '16']" class="paper-container-large" />
    </div>

    <div class="bg-gray">
      <TestimonialsRow :testimonialIds="['19', '86', '97', '18']" class="paper-container-large" />
    </div>

    <HomePageSection class="bg-dark" id="pro-silver">
      <div class="col-sm-12 center-md">
        <div class="header-section">
          <h2 class="section-title">Silver Plan</h2>
          <h2 class="section-subtitle">Mentorship on a Budget.</h2>
        </div>

        <ProPackageCard :stripePlanId="6" 
                        nextSolutionId="pro-bronze"
                        bossLink="https://docs.google.com/document/d/1Hg3sZ3K2b5rAXAkwX_bAqM5Pnat_PahLDFtffdYH1Gw/edit?usp=sharing">
          <p>If you're a self-directed learner, or on a budget, but know how important mentorship is - this is a great plan.</p>
          <p>Weekly email check-ins give you the chance to get the guidance you need.</p>
          <p>This is a great way to get started, and remember you can change your plan up or down at any time!</p>
        </ProPackageCard>
      </div>
    </HomePageSection>

    <div class="bg-gray">
      <TestimonialsRow :testimonialIds="['85', '70', '88', '93']" class="paper-container-large" />
    </div>

    <HomePageSection class="bg-dark" id="pro-bronze">
      <div class="col-sm-12 center-md">
        <div class="header-section">
          <h2 class="section-title">Bronze Plan</h2>
          <h2 class="section-subtitle">High-Quality Resources for Self-Directed Learning.</h2>
        </div>

        <ProPackageCard :stripePlanId="2" 
                        nextSolutionId="more-questions"
                        nextSolutionText="More Questions?"
                        bossLink="https://docs.google.com/document/d/16cXGOJkQoqwG-iq4sc0n84KMMldOlNHMGbhTijaPsQk/edit?usp=sharing">
          <p>You like our free videos.  That's why you're here.</p>
          <p>But you know it's time to grow and get serious.</p>
          <p>Our Pro Courses tackle harder subjects, and are designed to level you up.</p>
        </ProPackageCard>
      </div>
    </HomePageSection>

    <div class="bg-gray">
      <TestimonialsRow :testimonialIds="['64', '95', '83', '69']" class="paper-container-large" />
    </div>

    <HomePageSection classes="bg-dark" id="more-questions">
      <div class="col-md-7 col-sm-12">
        <!-- TODO: put this stuff in every section, then replace it with "I care" message and  "how to ask more questions" message  -->
        <h2 class="section-title">Talk to us</h2>
        <p>We've done our best to answer everything, but if you have more questions just email <a href="mailto:jeffrey@vuescreencasts.com" target="_blank">jeffrey@vuescreencasts.com</a> or text <a href="sms:501-256-3078">(501) 256-3078</a> right now.</p>
        <p>There are no stupid questions, and the only way that we can improve is if you let us know if somethig isn't clear.  Reach out - we're here for you.</p>
        <p>Fair enough?</p>
      </div>
      <div class="col-md-5 col-sm-12 center-md">
        <img src="~assets/vuescreencasts-student-coding-2.png" class="img-responsive img-center-xs" alt="Ember School Student Learning">
      </div>
    </HomePageSection>

    <div class="bg-gray">
      <TestimonialsRow :testimonialIds="['8', '11', '103', '100']" class="paper-container-large" />
    </div>
  </div>
</template>

<script>
import TestimonialsRow from '@/components/TestimonialsRow.vue';
import ProPackageCard from '@/components/ProPackageCard.vue';
import HomePageSection from '@/components/HomePageSection.vue';

export default {
  components: {
    TestimonialsRow,
    ProPackageCard,
    HomePageSection
  },
}
</script>

<style lang="scss">
$font: Roboto, sans-serif;

$indigo: #3F51B5;
$indigo-300: #7986CB;
$indigo-100: #c5cae9;
$orange: #FF6E40;
$grey: #E2E7E9;
$dark-grey: #333;
$navy: #24303C;
$dark-navy: #1A242E;
$green: #23B408;


$blue: #2196f3;
$blue-300: #64b5f6;
$blue-100: #bbdefb;
$blue-50: #E3F2FD;

$transparent-blue: rgba(33, 150, 243, .12);

$primary: $blue;

.bg-gray {
  background-color: #EBEFF2;
}

.bg-white {
  background-color: #ffffff;
}

.vertical-align-items {
  display: flex;
  justify-content: center; /* align horizontal */
  align-items: center;
}

.bullet-points {
  p {
    margin-bottom: 8px;
  }
  margin-bottom: 16px;
}

.bg-dark {
  .header-section {
    padding: 24px;
    margin-left: -24px;
    background-color: white;
    border-radius: 20px;
    display: inline-block;

    h1, h2, h3, h4 {
      color: #2163B3;
      // color: #2773D3;
      // color: #2D374A;
      // color: #017FFF;

      &.section-title, &.section-subtitle {
        color: #2163B3;
        // color: #2773D3;
        // color: #2D374A;
        // color: #017FFF;
        margin-bottom: 0px;
      }

      &.platinum {
        color: #797979;
      }
      &.gold {
        color: #F8AE00;
      }
      &.silver {
        color: #C0C0C0;
      }
      &.bronze {
        color: #CD7F31;
      }
    }
  }
}

</style>
