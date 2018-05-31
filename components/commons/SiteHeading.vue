<template>
  <h1 v-config class="site-heading">
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
  components: {
    KnitLogo,
  },
  mixins: {},
  props: {},
  data () {
    return {}
  },
  computed: {},
  methods: {},
}
</script>

<style lang="scss">
@import "assets/scss/imports";

.site-heading {
  display: flex;
  align-items: center;
  margin-right: auto;

  &__link {
    display: flex;
    align-items: center;
    text-decoration: none;
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
