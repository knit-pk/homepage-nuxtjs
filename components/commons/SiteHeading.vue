<template>
  <h1 class="site-heading" v-checkConfig>
    <router-link :to="{ path: '/' }" class="site-heading__link">
      <div class="site-heading__logo">
        <knit-logo/>
      </div>
      <div class="site-heading__name-wrapper">
        <span>Koło Naukowe IT</span>
        <span class="site-heading__university-name">Politechnika Krakowska</span>
      </div>
    </router-link>
  </h1>
</template>
<script>
import KnitLogo from '~/components/commons/KnitLogo'

export default {
  data () {
    return {}
  },
  components: {
    KnitLogo
  },
  props: {},
  computed: {},
  methods: {},
  mixins: {}
}
</script>

<style lang="scss">
@import "assets/scss/imports.scss";

.site-heading {
  display: flex;
  align-items: center;
  margin-right: auto;

  &__link {
    display: flex;
    align-items: center;
    text-decoration: none;
  }

  &__logo {
    width: 37px;
    height: 100%;
    margin-right: 10px;
    margin-bottom: -5px;
  }

  &__name-wrapper {
    display: flex;
    flex-direction: column;
    font-size: 16px;
    font-weight: 400;
    color: #fff;

    @media (max-width: $screen-sm + 200) {
      display: none;
    }
  }

  &__university-name {
    font-size: 10px;
    margin-left: auto;
  }
}
</style>
