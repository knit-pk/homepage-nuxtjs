<template>
  <div id='#nuxt-app'>
    <knit-header/>
    <!-- Render content from content-type -->
    <div class="main-content-wrapper">
      <article class="main-content-wrapper__main-content">
        <slot/>
      </article>
    </div>
    <knit-footer/>
  </div>
</template>

<script>
import KnitHeader from '~/components/desktop/KnitHeader.vue'
import KnitFooter from '~/components/desktop/KnitFooter.vue'
export default {
  components: {
    KnitHeader,
    KnitFooter
  }
}
</script>

<style lang="scss">
@import "assets/scss/_imports.scss";
.main-content-wrapper {
  top: 0;
  padding: 40px 0;
  width: 100%;
  min-height: 100%;
  background-color: $knit-main-content-wrapper-bg-color;
  &__main-content {
    margin-top: 211px;
    background-color: $knit-main-content-bg-color;
    transition: all 0.2s linear;
  }
}
@media (min-width: $desktop-width) {
  .main-content-wrapper {
    &__main-content {
      margin-top: 231px;
    }
  }
}
@media (min-width: $desktop-large-width) {
  .main-content-wrapper {
    &__main-content {
      margin-top: 331px;
    }
  }
}
</style>
