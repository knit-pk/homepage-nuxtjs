<template>
  <footer class="knit-footer">
    <a href="/" class="knit-footer__link">
      <img src="/knit-logotype.svg" class="knit-footer__logo" alt="Koło Naukowe IT">
    </a>
    <knit-navbar class="navbar--footy"/>
    <span class="knit-footer__caption"> 2017 &copy; Koło Naukowe IT Politechnika Krakowska </span>
    <div class="knit-footer__socialbox">
      <ul class="knit-footer__socialbox-list">
        <li class="knit-footer__socialbox-item">
          <a href="/" class="knit-footer__socialbox-link">
            <span class="flaticon-github-logo" aria-hidden="true"></span>
            Github
          </a>
        </li>
        <li class="knit-footer__socialbox-item">
          <a href="/" class="knit-footer__socialbox-link">
            <span class="flaticon-facebook-logo" aria-hidden="true"></span>
            Facebook
          </a>
        </li>
      </ul>
    </div>
  </footer>
</template>

<script>
import KnitNavbar from '~/components/KnitNavbar.vue'

export default {
  data () {
    return {}
  },
  components: {
    KnitNavbar
  }
}
</script>

<style lang='scss'>
@import "assets/scss/_imports.scss";

.knit-footer {
  height: 280px;
  background-color: $footer-bg-color;

  &__link {
    display: block;
    width: 100%;
    padding-top: 35px;
  }

  &__logo {
    margin: 0 auto;
    display: block;
    height: 65px;
  }

  &__caption {
    display: block;
    width: 100%;
    margin: 30px 0 auto;
    text-align: center;
    font-size: 0.75rem;
    color: $footer-text-color;
  }

  &__socialbox {
    margin-top: 40px;
    height: 50px;
    background-color: $footer-down-bg-color;
    width: 100%;
  }

  &__socialbox-list {
    display: flex;
    padding-top: 20px;
    justify-content: center;
    list-style: none;
  }

  &__socialbox-item {
    padding: 0 15px;
    opacity: 0.5;

    &:hover,
    &:focus {
      opacity: 1;
    }
  }

  &__socialbox-link {
    color: white;
    margin: auto 0;
    text-align: center;
    justify-content: center;
    line-height: 80%;
    font-size: 0.80rem;
  }
}
</style>
