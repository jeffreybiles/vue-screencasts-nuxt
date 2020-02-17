<template>
  <div>
    <header class="hero bg-blue" id="welcome">
      <div class="paper-container-large homepage-header">
        <div class="row">
          <div class="col-md-6 col-sm-7">
            <h1><strong>VueScreencasts.com</strong> is all things intermediate and advanced.​</h1>
            <h4>You've read the docs.  You've done the beginner courses.  We're what's next.</h4>
            <v-btn to="/courses">Get Started</v-btn>
          </div>
        </div>
      </div>
    </header>

    <!-- TODO: choose which testimonials to put here -->
    <div class="bg-gray">
      <TestimonialsRow :testimonialIds="['1', '2', '3', '4']" class="paper-container-large" />
    </div>

    <HomePageSection sectionId="why-vue">
      <div class="col-md-6 col-sm-12">
        <h2 class="section-title">Why VueScreencasts?</h2>
        <p>You're beyond the first two hours.</p>
        <p>Watching the same type of intro tutorials over and over isn't getting you anywhere.</p>
        <p>But maybe you don't have access to an expert... or the experts you know prefer coding to teaching.</p>
        <p>Good news: we're here, ready to help you level up your Vue skills.</p>
      </div>
      <div class="col-md-6 col-sm-12 center-md">
        <img src="~assets/happy-vue-programmer.png" class="img-responsive bottom-image" alt="Happy Vue Programmer">
      </div>
    </HomePageSection>

    <!-- TODO: choose which testimonials to put here -->
    <div class="bg-dark">
      <TestimonialsRow :testimonialIds="['1', '2', '3', '4']" class="paper-container-large" />
    </div>

    <HomePageSection classes="bg-gray">
      <div class="col-md-5 col-sm-12 center-md">
        <img src="~assets/vuescreencasts-student-coding.png" class="img-responsive" alt="VueScreencasts Student Coding">
      </div>
      <div class="col-md-7 col-sm-12">
        <h2 class="section-title">What will I be getting?</h2>
        <p>Wherever you are in your Vue career, we have a package to meet your needs.</p>
        <p>Some people will benefit from weekly coaching meetings to keep them on track.</p>
        <p>Others will be satisfied with our monthly in-depth courses and our huge library of existing videos.</p>
        <p>While a select few will need personalized, on-demand assistance with their projects.</p>
        <p>Whatever level you're at, it's our goal to get you one level higher.</p>
      </div>
    </HomePageSection>

    <!-- TODO: choose which testimonials to put here -->
    <div class="bg-white">
      <TestimonialsRow :testimonialIds="['1', '2', '3', '4']" class="paper-container-large" />
    </div>

    <HomePageSection classes="bg-dark">
      <div class="col-md-7 col-sm-12">
        <h2 class="section-title">Are you ready?</h2>
        <p>Remember, we have a 30-day 100% money-back guarantee, and at any point you can easily cancel or change your subscription level with just one email.</p>
        <p>If you have any questions, feel free to contact us.</p>
        <ul>
          <li>Email: <a href="mailto:jeffrey@vuescreencasts.com" target="_blank">jeffrey@vuescreencasts.com</a></li>
          <li>Twitter: <a href="https://twitter.com/vuescreencasts" target="_blank">@vuescreencasts</a></li>
          <li>Text or Phone: <a href="sms:501-256-3078">+1 (501) 256-3078</a></li>
        </ul>
      </div>
      <div class="col-md-5 col-sm-12 center-md">
        <img src="~assets/vuescreencasts-student-coding-2.png" class="img-responsive img-center-xs" alt="Ember School Student Learning">
      </div>
    </HomePageSection>

    <!-- TODO: choose which testimonials to put here -->
    <div class="bg-gray">
      <TestimonialsRow :testimonialIds="['1', '2', '3', '4']" class="paper-container-large" />
    </div>

    <HomePageSection classes="bg-white">
      <div class="col-sm-12 center-md">
        <h2 class="section-title">Pro Platinum - for when there's money on the line, and you need to deliver.</h2>

        <ProPackageCard :stripePlanId="5">
          <p>When you need an expert on your side, this is the package for you.</p>
          <p>We'll start with a comprehensive analysis of your situation and come up with a custom action plan to get you where you need to be.</p>
          <p>Then we'll keep you on track with weekly meetings.</p>
          <p>And my phone is open to you - up to 4 hours/month retainer, you can call me and I'll do everything in my power to solve your problem.</p>
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

.hero {
  padding: 60px 0;
  text-align: center;
  @media (min-width: 48em) {
    padding: 0;
    text-align: left;
  }
  .homepage-header {
    @media (min-width: 48em) {
      background: url(~assets/vuescreencasts-hero-bg.png) no-repeat 50px;
      background-size: auto 100%;
      padding-top: 60px;
      padding-bottom: 60px;
    }
    @media (min-width: 64em) {
      background-position: right;
    }
  }
  .hero-welcome {
    @media (min-width: 48em) {
      max-width: 520px;
      flex-basis: 520px;
    }
  }
  h1 {
    color: #ffffff;
    font: 400 28px/36px $font;
    font-weight: 300;
    margin: 0;
    @media (min-width: 64em) {
      font-size: 36px;
      line-height: 44px;
    }
  }
  h4 {
    color: #ffffff;
    font: 400 18px/26px $font;
    margin: 16px 0 32px;
    @media (min-width: 48em) {
      font-size: 20px;
      line-height: 28px;
    }
  }
  .md-button {
    margin: 0;
  }
}

.bg-blue {
  background-color: $primary;
  p {
    color: #ffffff;
  }
  .md-button.button-white-raised {
    color: $primary;
    &:hover, &:focus {
      background-color: $blue-50 !important;
    }
  }
  .md-button.button-white {
    color: #ffffff;
  }
}

.paper-container {
  max-width: 960px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 15px;
  padding-right: 15px;
}

.paper-container-large {
  @extend .paper-container;
  max-width: 1200px;
}

.section {
  background-color: #ffffff;
  padding: 60px 0;
  .section-title {
    font: 300 32px/40px $font;
    margin-bottom: 30px;
  }
  ul {
    margin: 0;
  }
  img {
    margin-top: 30px;
    @media (min-width: 64em) {
      margin-top: 0;
    }
  }
  .bottom-image {
    margin-bottom: -66px;
  }
}

.bg-dark {
  background-color: #2D384A;
  .section-title {
    color: #ffffff;
  }
  color: #ffffff;
  h2, h3, h4 {
    color: #ffffff;
  }
  button.md-button.md-default-theme.md-raised:disabled {
    background-color: $grey;
  }
  .disabled {
    color: #aaaaaa;
  }
  .check {
    color: $green;
  }
  li a {
    color: #ffffff;
  }
}

.img-responsive {
  max-width: 100%;
}

.bg-gray {
  background-color: #EBEFF2;
}

.bg-white {
  background-color: #ffffff;
}


.bg-purple {
  background-color: #DCD;
  a {
    color: #049;
  }
}

.vertical-align-items {
  display: flex;
  justify-content: center; /* align horizontal */
  align-items: center;
}

.circle {
  background-color: blue;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin: 10px;
}

</style>
