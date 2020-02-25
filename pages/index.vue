<template>
  <div>
    <HomePageSection classes="hero bg-dark" innerClasses="homepage-header">
      <div class="col-md-6 col-sm-7">
        <h1>VueScreencasts.com</h1>
        <h3>All things intermediate and advanced</h3>
        <h4>You've read the docs and done the beginner courses...</h4>
        <h4>It's time to level up.</h4>
        <!-- make spacing below this smaller -->
      </div>
      <div class="col-md-6 col-sm-5"></div>
    </HomePageSection>

    <div class="bg-gray">
      <TestimonialsRow :testimonialIds="['65', '21', '81', '27']" class="paper-container-large" />
    </div>

    <HomePageSection sectionId="why-vue">
      <div class="col-md-6 col-sm-12">
        <!-- TODO: make the section title a heavier font weight -->
        <h2 class="section-title">As close to the Matrix Kung Fu upload as it gets.</h2>

        <p>Unfortunately, the human brain isn't like a tape drive and we can't download new skills to it.</p>
        <p>But with VueScreencasts we can get really close.</p>

        <div class="bullet-points">
          <p><big>Structured</big> - Step-by-step tutorials keep you on the right path.</p>
          <p><big>Practical</big> - Realistic code prepares you for real-world challenges.</p>
          <p><big>Effective</big> - Experienced teachers anticipate and prevent common problems.</p>
        </div>
        <!-- <p>In-depth courses walk you step by step through real situations, going over common issues and tradeoffs.</p>
        <p>Customized training sessions get you specifically where you need to go.</p> -->

        <p>VueScreencasts is your next step to developing true expertise.</p>
      </div>
      <div class="col-md-6 col-sm-12 center-md">
        <img src="~assets/happy-vue-programmer.png" class="img-responsive bottom-image" alt="Happy Vue Programmer">
      </div>
    </HomePageSection>

    <div class="bg-dark">
      <TestimonialsRow :testimonialIds="['87', '77', '98', '76']" class="paper-container-large" />
    </div>

    <HomePageSection classes="bg-gray">
      <div class="col-md-5 col-sm-12 center-md">
        <img src="~assets/vuescreencasts-student-coding.png" class="img-responsive" alt="VueScreencasts Student Coding">
      </div>
      <div class="col-md-7 col-sm-12">
        <h2 class="section-title">Keep Training Step by Step</h2>
        <p>No guessing, no wondering, no getting lost, no walking in circles.</p>
        <p>The only way to gain expertise is to have a plan and execute it.  Whether you choose a custom plan, or simply go through our video courses, or something in between, we have the perfect solution for your situation.</p>

        <v-btn to="/pro?solution=pro-platinum" color="green accent-2">Okay, show me how we do this</v-btn>
      </div>
    </HomePageSection>

    <div class="bg-white">
      <TestimonialsRow :testimonialIds="['63', '48', '34', '99']" class="paper-container-large" />
    </div>


    <HomePageSection classes="bg-dark" id="pro-platinum">
      <div class="col-sm-12 center-md">
        <div class="header-section">
          <h3 class="platinum">Solution 1: Platinum</h3>
          <h2 class="section-title">For when the Survival of your Company or Job is on the line.</h2>
        </div>

        <ProPackageCard :stripePlanId="5" nextSolutionId="pro-gold">
          <p><strong>It's go-time.  Let's do it now. I'm all-in.</strong></p>
          <p>When you need an expert who can care about your situation even more than you do, but can still stand back and give you the objective truth.</p>
          <p>I'll give it to you straight: if you're calling us mid-explosion, this might not be enough.</p>
          <p>But whatever the situation, we can massively increase your odds of success.</p>
        </ProPackageCard>
      </div>
    </HomePageSection>

    <div class="bg-gray">
      <TestimonialsRow :testimonialIds="['4', '96', '92', '1']" class="paper-container-large" />
    </div>
    
    <HomePageSection class="bg-dark" id="pro-gold">
      <div class="col-sm-12 center-md">
        <div class="header-section">
          <h3 class="gold">Solution 2: Gold</h3>
          <h2 class="section-title">Your Best bet for Fast Growth.</h2>
        </div>

        <ProPackageCard :stripePlanId="4" nextSolutionId="pro-silver">
          <p>With the Gold plan, we'll analyze your situation and work with you to create a custom action plan that maximizes the impact of your learning time.</p>
          <p>One-on-one personal checkins hold you accountable and keep you winning.</p>
          <p>Say goodbye to overwhelm.</p>
          <p>Say hello to growth.</p>
        </ProPackageCard>
      </div>
    </HomePageSection>

    <div class="bg-gray">
      <TestimonialsRow :testimonialIds="['79', '3', '56', '16']" class="paper-container-large" />
    </div>

    <HomePageSection class="bg-dark" id="pro-silver">
      <div class="col-sm-12 center-md">
        <div class="header-section">
          <h3 class="silver">Solution 3: Silver</h3>
          <h2 class="section-title">Accountability and Acceleration.</h2>
        </div>

        <ProPackageCard :stripePlanId="3" nextSolutionId="pro-bronze">
          <p>You already know where you're going, you've already got your plan established... but a little bit of guidance at the right time will get you over the hump.</p>
          <p>You'll still receive suggestions and accountability, but it won't be as rigorous as the above plans.</p>
        </ProPackageCard>
      </div>
    </HomePageSection>

    <div class="bg-gray">
      <TestimonialsRow :testimonialIds="['19', '86', '97', '18']" class="paper-container-large" />
    </div>

    <HomePageSection class="bg-dark" id="pro-bronze">
      <div class="col-sm-12 center-md">
        <div class="header-section">
          <h3 class="bronze">Solution 4: Bronze</h3>
          <h2 class="section-title">For those who are more Patient or on a Budget.</h2>
        </div>

        <ProPackageCard :stripePlanId="6" nextSolutionId="pro-standard">
          <p>This is for the people who are on a more relaxed time-table, or who are on a tight budget... but know how important mentorship is.</p>
          <p>Weekly email check-ins give you the chance to get the guidance you need, without having to ever show up for a meeting.</p>
        </ProPackageCard>
      </div>
    </HomePageSection>

    <div class="bg-gray">
      <TestimonialsRow :testimonialIds="['85', '70', '88', '93']" class="paper-container-large" />
    </div>

    <HomePageSection class="bg-dark" id="pro-standard">
      <div class="col-sm-12 center-md">
        <div class="header-section">
          <h3>Solution 5: Pro Standard</h3>
          <h2 class="section-title">High-Quality resources for self-directed Learning.</h2>
        </div>

        <ProPackageCard :stripePlanId="2" nextSolutionId="more-questions" nextSolutionText="More Questions?">
          <p>You like our free videos.  That's why you're here.</p>
          <p>Our Pro courses are more of that, tackling harder subjects, and designed to level you up.</p>
        </ProPackageCard>
      </div>
    </HomePageSection>

    <div class="bg-gray">
      <TestimonialsRow :testimonialIds="['64', '95', '83', '69']" class="paper-container-large" />
    </div>

    <HomePageSection classes="bg-dark" id="more-questions">
      <div class="col-md-7 col-sm-12">
        <!-- TODO: put this stuff in every section, then replace it with "I care" message and  "how to ask more questions" message  -->
        <h2 class="section-title">If you still have questions:</h2>
        <p>Okay, we've done our best to answer everything, but if you have more questions then let's hear'em! Just send us an email (<a href="mailto:jeffrey@vuescreencasts.com" target="_blank">jeffrey@vuescreencasts.com</a>) or text us (<a href="sms:501-256-3078">(501) 256-3078</a>) right now.</p>
        <p>Ultimately, one of the best ways to see if this is right for you is to just get started.  Why not click on some of the free videos and work your way through them, and let us know what you think.  We're listening.</p>
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
    margin-bottom: 0px;
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

      &.section-title {
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
