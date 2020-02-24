<template>
  <div>
    <HomePageSection classes="hero bg-dark" innerClasses="homepage-header">
      <div class="col-md-6 col-sm-7">
        <h1><strong>VueScreencasts.com</strong></h1>
        <h2>All things intermediate and advanced</h2>
        <h4>You've read the docs.  You've done the beginner courses.  We're what's next.</h4>
        <v-btn to="/courses">Get Started</v-btn>
      </div>
      <div class="col-md-6 col-sm-5"></div>
    </HomePageSection>

    <div class="bg-gray">
      <TestimonialsRow :testimonialIds="['65', '21', '81', '27']" class="paper-container-large" />
    </div>

    <HomePageSection sectionId="why-vue">
      <div class="col-md-6 col-sm-12">
        <h2 class="section-title">Remember how Neo downloaded Kung Fu? This is as close as it gets (but for Vue).</h2>

        <p>You've seen your friends flounder around, watching free tutorial after free tutorial, but never getting beyond the beginner level. They go down wrong paths, use bad patterns, and generally make a mess of things.</p>

        <p>There's nothing wrong with starting with free resources... VueScreencasts is your next step to developing true expertise.</p>

        <!-- 
        <p>You know that Vue is a power tool that can make your coding life so much simpler, letting you solve issues with ease...</p>
        <p>But it's hard to level up your skills.  Watching the same type of intro tutorials over and over isn't getting you anywhere.</p>
        <p>Maybe you don't have access to an expert... or the experts you know prefer coding to teaching.</p>
        <p>Good news: we're here, ready to help you level up your Vue skills.  Call or text us any time (501-256-3078), or email us (<a href="mailto:jeffrey@vuescreencasts.com" target="_blank">jeffrey@vuescreencasts.com</a>), or message us on Twitter (<a href="https://twitter.com/vuescreencasts" target="_blank">@vuescreencasts</a>) and let's talk about building your future.</p> -->
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
        <h2 class="section-title">Why keep guessing?</h2>
        <p>Imagine going into a gym, and they hand you a book.  "Here are the exercises." It's three hundred pages of detailed instructions about every exercise you could possibly perform in that gym.</p>
        <p>Even if it's the best-written book in the world, even if the book has an 'example routines' section at the beginning, most people will still quit.</p>
        <p>Now imagine walking in, and you have a personal trainer that designs a routine specifically for you. No more guessing at what exercise you should do, how many reps, when to push and when to slow down. All you have to do is show up and put in the work.</p>
        <p>We're your personal trainer for Vue.</p>

        <!-- <p>Have you ever banged your head against a wall for days, maybe even weeks, struggling to learn something new... only for it to click into place the second you heard the right metaphor?</p>
        <p>Maybe you're the first person in your company to encounter a specific issue, and the friendly people over at StackOverflow tell you to RTFM... but there's no manual.</p>
        <p>What now?</p>
        <p>Whether you need personalized, on-demand assistance, weekly coaching calls to keep you on track, or just a friendly voice to help you along, we've got a package for you.</p>
        <p>We'll meet you wherever you're at, and do whatever we can to get you one level higher.</p> -->
      </div>
    </HomePageSection>

    <div class="bg-white">
      <TestimonialsRow :testimonialIds="['63', '48', '34', '99']" class="paper-container-large" />
    </div>

    <HomePageSection classes="bg-dark" id="pricing">
      <div class="col-md-7 col-sm-12">
        <h2 class="section-title">Are you ready?</h2>
        <p>Remember, we have a 30-day 100% money-back guarantee, and at any point you can easily cancel or change your subscription level with just one email or text.</p>
        <p>If you have any questions, feel free to contact us.</p>
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

    <div class="bg-gray">
      <TestimonialsRow :testimonialIds="['4', '96', '92', '1']" class="paper-container-large" />
    </div>

    <HomePageSection classes="bg-dark">
      <div class="col-sm-12 center-md">
        <h2 class="section-title">Pro Platinum - for when the survival of your company or job is on the line.</h2>

        <ProPackageCard :stripePlanId="5">
          <p>This is what you choose when you want us all-in.</p>
          <p>When you need an expert who can care about your situation even more than you do, but can still stand back and give you the objective truth.</p>
          <p>I'll give it to you straight: if you're calling us mid-explosion, this might not be enough.</p>
          <p>But whatever the situation, we can massively increase your odds of success.</p>
        </ProPackageCard>
      </div>
    </HomePageSection>

    <!-- TODO: choose which testimonials to put here -->
    <div class="bg-gray">
      <TestimonialsRow :testimonialIds="['79', '3', '56', '16']" class="paper-container-large" />
    </div>

    <HomePageSection class="bg-dark">
      <div class="col-sm-12 center-md">
        <h2 class="section-title">Pro Gold - your best bet for fast growth.</h2>

        <ProPackageCard :stripePlanId="4">
          <p>Have you ever felt overwhelmed by the frantic pace of the Javascript world?</p>
          <p>Like you should be going faster, in ten different directions at once... but you don't know where to start?</p>
          <p>With the Pro Gold plan, we'll analyze your situation and work with you to create a custom action plan that maximizes the impact of your learning time.  Then we'll have weekly meetings to adjust as needed and keep you on course.</p>
          <p>Say goodbye to overwhelm.</p>
          <p>Say hello to growth.</p>
        </ProPackageCard>
      </div>
    </HomePageSection>

    <div class="bg-gray">
      <TestimonialsRow :testimonialIds="['19', '86', '97', '18']" class="paper-container-large" />

    </div>

    <HomePageSection class="bg-dark">
      <div class="col-sm-12 center-md">
        <h2 class="section-title">Pro Silver - a high-ROI investment in your career.</h2>

        <ProPackageCard :stripePlanId="3">
          <p>A little push may be all you need to get yourself on a better trajectory.</p>
          <p>Monthly meetings, weekly check-ins...</p>
          <p>The results may be slower than in our other plans, but this is an investment that will pay for itself many times over the course of your career.</p>
        </ProPackageCard>
      </div>
    </HomePageSection>

    <!-- TODO: choose which testimonials to put here -->
    <div class="bg-gray">
      <TestimonialsRow :testimonialIds="['85', '70', '88', '93']" class="paper-container-large" />
    </div>

    <HomePageSection class="bg-dark">
      <div class="col-sm-12 center-md">
        <h2 class="section-title">Pro Bronze - guidance for those in a hurry or on a budget.</h2>

        <ProPackageCard :stripePlanId="6">
          <p>This is for the people who are extremely busy, who don't like seeking help, or who are on a tight budget... but know, deep down, that mentorship can make them an even better version of themselves.</p>
          <p>Weekly email check-ins give you the chance to get the guidance you need, without having to ever show up for a meeting.</p>
        </ProPackageCard>
      </div>
    </HomePageSection>

    <!-- TODO: choose which testimonials to put here -->
    <div class="bg-gray">
      <TestimonialsRow :testimonialIds="['64', '95', '83', '69']" class="paper-container-large" />
    </div>

    <HomePageSection class="bg-dark">
      <div class="col-sm-12 center-md">
        <h2 class="section-title">Pro Standard - high-quality resources for self-directed learning.</h2>

        <ProPackageCard :stripePlanId="2">
          <p>You like our free videos.</p>
          <p>That's why you're here.</p>
          <p>Our Pro courses are more of that, but designed specifically to level you up.</p>
        </ProPackageCard>
      </div>
    </HomePageSection>

    <!-- TODO: choose which testimonials to put here -->
    <div class="bg-gray">
      <TestimonialsRow :testimonialIds="['8', '11', '103', '100']" class="paper-container-large" />
    </div>

    <HomePageSection class="bg-dark">
      <div class="col-sm-12 center-md">
        <h2 class="section-title">Free - a great start.</h2>

        <ProPackageCard :stripePlanId="7">
          <p>Some copy about long term growth</p>
        </ProPackageCard>
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
