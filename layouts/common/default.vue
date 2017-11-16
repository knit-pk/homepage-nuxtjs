<template>
  <div id='#nuxt-app'>
    <knit-header/>
    <knit-navbar/>

    <!-- Render content from content-type -->
    <slot/>

    <knit-footer/>
  </div>
</template>

<script>
import KnitHeader from '~/components/KnitHeader.vue'
import KnitNavbar from '~/components/KnitNavbar.vue'
import KnitFooter from '~/components/KnitFooter.vue'

export default {
  components: {
    KnitHeader,
    KnitNavbar,
    KnitFooter
  }
}
</script>

<style lang="scss">
@import "assets/scss/_imports.scss";

body {
  background-color: $background-color;
  font-family: $default-font-family;
  color: $primary-text-color;
}
</style>
