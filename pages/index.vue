<template>
  <div>
    <HomePageSection sectionId="why-vue" classes="hero bg-dark">
      <div class="col-sm-8 col-xs-12">
        <!-- TODO: Fix this styling -->
        <h1>VueScreencasts.com</h1>
        <h3>Concise Screencasts for Working Developers</h3>

        <v-btn to="/courses" x-large color="green accent-2">Watch 200+ Videos</v-btn>
      </div>
      <div class="col-sm-4 d-sm-block d-none center-md">
        <img src="~assets/vuescreencasts-student-learning-3.png" class="img-responsive bottom-image" alt="Happy Vue Programmer">
      </div>
    </HomePageSection>

    <div class="bg-gray">
      <TestimonialsRow :testimonialIds="['99', '87', '21', '1']" class="paper-container-large" />
    </div>
    <div class="bg-gray">
      <TestimonialsRow :testimonialIds="['4', '96', '76', '98']" class="paper-container-large" />
    </div>
    <div class="bg-gray">
      <TestimonialsRow :testimonialIds="['88', '19', '48', '18']" class="paper-container-large" />
    </div>
    <div class="bg-gray">
      <TestimonialsRow :testimonialIds="['16', '79', '93', '97']" class="paper-container-large" />
    </div>
    <div class="bg-gray">
      <TestimonialsRow :testimonialIds="['34', '85', '77', '70']" class="paper-container-large" />
    </div>
    <div class="bg-gray">
      <TestimonialsRow :testimonialIds="['8', '11', '104', '100']" class="paper-container-large" />
    </div>
  </div>
</template>

<script>
import TestimonialsRow from '@/components/TestimonialsRow.vue';
import HomePageSection from '@/components/HomePageSection.vue';

export default {
  components: {
    TestimonialsRow,
    HomePageSection,
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
  }
  margin-bottom: 16px;

  .bullet-point {
    margin-bottom: 12px;
    p {
      display: inline-block;
      margin: 4px 0;
      vertical-align: bottom;
    }
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
  .disabled {
    background-color: $grey;
    color: #aaaaaa;
  }
  .check {
    color: $green;
  }
  li a {
    color: #ffffff;
  }

  p a {
    color: #fff;
  }

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

  .email-signup {
    fieldset {
      border: 2px solid white !important;

      legend {
      }
    }

    input {
      color: white !important;
    }

    .email-field.error--text {
      color: #FAA !important;
      caret-color: #FAA !important;
    }
    .email-field .error--text {
      color: #FAA !important;
    }

    .v-text-field__slot label {
        color: #AAF !important;
    }

    button.theme--light.v-btn--outlined.v-btn {
      color: white !important;
      border-color: white !important;

      &.v-btn--disabled {
        color: grey !important;
        border-color: grey !important;
      }
    }
  }
    
  
}

</style>
