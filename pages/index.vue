<template>
  <div>
    <HomePageSection classes="hero bg-dark" innerClasses="homepage-header">
      <div class="col-md-6 col-sm-7">
        <h1>VueScreencasts.com</h1>
        <h3>All things intermediate and advanced</h3>
        <h4>You've read the docs and done the beginner courses...</h4>
        <h4>It's time to level up.</h4>

        <!-- TODO: Turn this into a bullet-point list, with the comments being the smaller text -->
        <h4>Structured. <!-- Can I do this?  Step by step -->
            Practical. <!-- By using real-world situations, we learn real-world code -->
            Effective.  <!-- Step-by-step anticipating your challenges --></h4>
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
        <h2 class="section-title">As close to downloading Kung Fu as it gets.</h2>

        <p>Unfortunately, the human brain isn't like a tape drive and we can't download new skills to it.</p>
        <p>But with VueScreencasts we can get really close.</p>
        <!-- TODO: add features and benefits here on HOW we're going to do that -->

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

        <v-btn :to="`/#pro-platinum`" color="green accent-2">Okay, show me how we do this</v-btn>
      </div>
    </HomePageSection>

    <div class="bg-white">
      <TestimonialsRow :testimonialIds="['63', '48', '34', '99']" class="paper-container-large" />
    </div>


    <HomePageSection classes="bg-dark" id="pro-platinum">
      <div class="col-sm-12 center-md">
        <h3>Solution 1</h3>
        <h2 class="section-title">Pro Platinum - for when the survival of your company or job is on the line.</h2>

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
        <h3>Solution 2</h3>
        <h2 class="section-title">Pro Gold - your best bet for fast growth.</h2>

        <ProPackageCard :stripePlanId="4" nextSolutionId="pro-silver">
          <p>With the Pro Gold plan, we'll analyze your situation and work with you to create a custom action plan that maximizes the impact of your learning time.</p>
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
        <h3>Solution 3</h3>
        <h2 class="section-title">Pro Silver - a high-ROI investment in your career.</h2>

        <ProPackageCard :stripePlanId="3" nextSolutionId="pro-bronze">
          <p>A little push may be all you need to get yourself on a better trajectory.</p>
          <p>Monthly meetings, weekly check-ins...</p>
          <p>The results may be slower than in our other plans, but this is an investment that will pay for itself many times over the course of your career.</p>
        </ProPackageCard>
      </div>
    </HomePageSection>

    <div class="bg-gray">
      <TestimonialsRow :testimonialIds="['19', '86', '97', '18']" class="paper-container-large" />
    </div>

    <HomePageSection class="bg-dark" id="pro-bronze">
      <div class="col-sm-12 center-md">
        <h3>Solution 4</h3>
        <h2 class="section-title">Pro Bronze - guidance for those in a hurry or on a budget.</h2>

        <ProPackageCard :stripePlanId="6" nextSolutionId="pro-standard">
          <p>This is for the people who are extremely busy, who don't like seeking help, or who are on a tight budget... but know, deep down, that mentorship can make them an even better version of themselves.</p>
          <p>Weekly email check-ins give you the chance to get the guidance you need, without having to ever show up for a meeting.</p>
        </ProPackageCard>
      </div>
    </HomePageSection>

    <div class="bg-gray">
      <TestimonialsRow :testimonialIds="['85', '70', '88', '93']" class="paper-container-large" />
    </div>

    <HomePageSection class="bg-dark" id="pro-standard">
      <div class="col-sm-12 center-md">
        <h3>Solution 5</h3>
        <h2 class="section-title">Pro Standard - high-quality resources for self-directed learning.</h2>

        <ProPackageCard :stripePlanId="2" nextSolutionId="more-questions" nextSolutionText="More Questions?">
          <p>You like our free videos.</p>
          <p>That's why you're here.</p>
          <p>Our Pro courses are more of that, but designed specifically to level you up.</p>
        </ProPackageCard>
      </div>
    </HomePageSection>

    <div class="bg-gray">
      <TestimonialsRow :testimonialIds="['64', '95', '83', '69']" class="paper-container-large" />
    </div>

    <HomePageSection class="bg-dark">
      <div class="col-sm-12 center-md">
        <h2 class="section-title">Free - a great start.</h2>

        <ProPackageCard :stripePlanId="7">
          <p>Enjoy the free videos as much as you like.</p>
          <p>Signing up for a free account will help you track your progress.</p>
        </ProPackageCard>
      </div>
    </HomePageSection>

    <div class="bg-gray">
      <TestimonialsRow :testimonialIds="['8', '11', '103', '100']" class="paper-container-large" />
    </div>

    <HomePageSection classes="bg-dark" id="more-questions">
      <div class="col-md-7 col-sm-12">
        <!-- TODO: put this stuff in every section, then replace it with "I care" message and  "how to ask more questions" message  -->
        <h2 class="section-title">Still not sure?</h2>
        <p>We have a 30-day 100% money-back guarantee, and at any point you can easily cancel or change your subscription level with just one email or text.</p>
        <p>If you have any questions, please contact us.  We want to make sure you get the solution that's best for you.</p>
        <ul>
          <li>Email: <a href="mailto:jeffrey@vuescreencasts.com" target="_blank">jeffrey@vuescreencasts.com</a></li>
          <li>Twitter: <a href="https://twitter.com/vuescreencasts" target="_blank">@vuescreencasts</a></li>
          <li>Text or Phone: <a href="sms:501-256-3078">(501) 256-3078</a></li>
        </ul>
      </div>
      <div class="col-md-5 col-sm-12 center-md">
        <img src="~assets/vuescreencasts-student-coding-2.png" class="img-responsive img-center-xs" alt="Ember School Student Learning">
      </div>
    </HomePageSection>

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

</style>
