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
    <TestimonialsRow :testimonialIds="['1', '2', '3', '4']" class="paper-container-large" />

    <section class="section" id="why-vue">
      <div class="paper-container-large">
        <div class="row">
          <div class="col-md-6 col-sm-12">
            <h2 class="section-title margin-sm">Why VueScreencasts?</h2>
            <p>You're beyond the first two hours.</p>
            <p>Watching the same intro tutorials over and over isn't getting you anywhere.</p>
            <p>But maybe you don't have access to an expert... or the experts in your company prefer coding to teaching.</p>
          </div>
          <div class="col-md-6 col-sm-12 center-md">
            <img src="images/happy-ember-programmer.png" class="img-responsive bottom-image" alt="Happy Ember Programmer">
          </div>
        </div>
      </div>
    </section>

    <!-- TODO: choose which testimonials to put here -->
    <TestimonialsRow :testimonialIds="['1', '2', '3', '4']" class="paper-container-large" />

  <v-container class="home">
    <v-row>
      <v-col cols="12">
        <h1 class="display-2 text-center">VueScreencasts.com</h1>
        <!-- change slogan font to make it more fun -->
        <h3 class="display-1 text-center">All things intermediate and advanced.</h3>
        <div class="text-center">
          <v-btn color="green darken-2" outlined x-large class="mt-2 mb-2" to="/courses">Start Learning Now</v-btn>
        </div>
      </v-col>
      <v-col cols="12" md="8">
        <p>{{courses.length}} courses. {{videos.length}} videos. Over 19 hours of content.</p>
        <p>And <em>much</em> more on the way.</p>
        <p>Here's a sample.</p>
      </v-col>
      <v-col cols="12" md="4" class="pr-0">
        <SocialProofGrid />
      </v-col>
    </v-row>
  </v-container>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import SocialProofGrid from '@/components/SocialProofGrid.vue';
import TestimonialsRow from '@/components/TestimonialsRow.vue';

export default {
  components: {
    SocialProofGrid,
    TestimonialsRow,
  },
  computed: {
    ...mapGetters({
      courses: 'courses/topLevel'
    }),
    ...mapState({
      videos: state => state.videos.videos,
    }),
  }
}
</script>

<style lang="scss">
$font: Roboto, sans-serif;

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
      // background: url(../images/hero-bg.png) no-repeat 50px;
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
    &.margin-sm {
      @media (min-width: 75em) {
        margin-top: 60px;
      }
    }
    &.margin-lg {
      @media (min-width: 75em) {
        margin-top: 100px;
      }
    }
    &.margin-xl {
      @media (min-width: 75em) {
        margin-top: 120px;
      }
    }
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

</style>
