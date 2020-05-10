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

.hero {
  padding: 60px 0;

  @media (max-width: 600px) {
    padding: 30px 0;
  }
  @media (min-width: 600px) {
    padding: 30px 0 60px;
  }
  h1, h3 {
    margin: 0;
    font: 400 28px/36px $font;
  }
  h1 {
    @media (min-width: 64em) {
      font-size: 48px;
      line-height: 72px;
    }
  }
  h3 {
    font-size: 24px/28px;
    @media (min-width: 64em) {
      font-size: 28px;
      line-height: 48px;
    }
  }
  h4 {
    font: 400 18px/26px $font;
    margin: 24px 0;
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