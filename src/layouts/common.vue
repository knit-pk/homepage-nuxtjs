<template>
  <div id="#nuxt-app">
    <template v-if="!isMobile">
      <knit-header/>
      <knit-navbar class="fixed-top"/>
    </template>

    <!-- Render menu only for mobile pages -->
    <knit-menu-mobile v-else class="fixed-top" @mobileMenuToggle="onMobileMenuToggle"/>

    <!-- Render content from pages -->
    <nuxt :class="isMobile ? 'page--mobile' : 'page--desktop'"/>

    <!-- Knit footer -->
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
  components: {
    KnitMenuMobile,
    KnitHeader,
    KnitNavbar,
    KnitFooter,
  },
  mixins: [FixedTop],
  data () {
    return {}
  },
  computed: {
    ...mapGetters({ isMobile: 'general/isMobile' }),
  },
  methods: {
    onMobileMenuToggle (value) {
      this.isMobileMenuShown = value
    },
  },
}
</script>
