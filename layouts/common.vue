<template>
  <div id='#nuxt-app'>
    <template v-if="!isMobile">
      <knit-header/>
      <knit-navbar class="fixed-top"/>
    </template>

    <!-- Render menu only for mobile pages -->
    <knit-menu-mobile class="fixed-top" v-else/>

    <!-- Render content from pages -->
    <nuxt :class="isMobile ? 'page--mobile' : 'page--desktop'"/>

    <knit-footer/>
  </div>
</template>

<script>
import KnitMenuMobile from '~/components/commons/KnitMenuMobile'
import KnitHeader from '~/components/commons/KnitHeader'
import KnitNavbar from '~/components/commons/KnitNavbar'
import KnitFooter from '~/components/commons/KnitFooter'
import FixedTop from '~/components/mixins/FixedTop'
import { mapGetters } from 'vuex'

export default {
  data () {
    return {}
  },
  computed: {
    ...mapGetters({ isMobile: 'general/general/isMobile' })
  },
  components: {
    KnitMenuMobile,
    KnitHeader,
    KnitNavbar,
    KnitFooter
  },
  mixins: [ FixedTop ]
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
