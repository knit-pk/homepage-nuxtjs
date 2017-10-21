<template>
<footer class="knit-footer">
  <div class="knit-footer__copyrights-wrapper">
    <span class="knit-footer__copyrights">
      Developed by Koło Naukowe IT Politechniki Krakowskiej
    </span>
  </div>
</footer>
</template>

<script>
export default {
  data () {
    return {}
  }
}
</script>

<style lang='scss'>
@import "assets/scss/_imports.scss";
.knit-footer {
  border-top: 1px solid $knit-footer-border-color;
  height: 61px;
  width: 100%;
  position: relative;
  &__copyrights-wrapper {
    position: absolute;
    bottom: 4px;
    right: 0;
    left: 0;
  }
  &__copyrights {
    display: block;
    text-align: center;
    font-size: 0.8em;
  }
}
</style>
