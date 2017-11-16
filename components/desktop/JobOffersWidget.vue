<template>
  <section class="job-offers-widget">
    TUTAJ TEN HEADER
<i class="devicon-babel-plain"></i>
  </section>
</template>

<script>
export default {
  data () {
    return {}
  }
}
</script>

<style lang="scss">
@import "assets/scss/_imports.scss";

.job-offers-widget {
  background-color: #fff;
  height: 330px;
  box-sizing: border-box;
  flex-basis: calc(50% - #{$default-gutters-width / 2});
  margin-right: $default-gutters-width / 2;
}
</style>
