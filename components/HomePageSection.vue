<template>
  <section :class="`section ${classes}`" :id="sectionId">
    <div :class="`paper-container-large ${innerClasses}`">
      <div class="row vertical-align-items">
        <slot />
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    props: {
      classes: {
        type: String,
        required: false
      },
      sectionId: {
        type: String,
        required: false
      },
      innerClasses: {
        type: String,
        required: false
      }
    }
  }
</script>

<style lang="scss" scoped>
$font: Roboto, sans-serif;
$grey: #E2E7E9;
$green: #23B408;

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
}

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

</style>