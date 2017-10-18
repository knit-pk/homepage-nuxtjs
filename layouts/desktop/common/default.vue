<template>
  <div id='#nuxt-app'>
    <knit-menu/>
    <!-- Render content from content-type -->
    <div class="mainContentWrapper">
      <slot/>
    </div>
    <knit-footer/>
  </div>
</template>
<script>
import KnitMenu from '~/components/desktop/KnitMenu.vue';
import KnitFooter from '~/components/desktop/KnitFooter.vue';
export default {
  components: {
    KnitMenu,
    KnitFooter
  }
};
</script>
<style>
.mainContentWrapper {
  margin-top: 100px;
}
</style>
