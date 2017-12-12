<template>
  <footer class="knit-footer">
    <router-link :to="{path: '/'}" class="knit-footer__link">
      <knit-logo/>
    </router-link>
    <knit-navbar class="navbar--footy"/>
    <span class="knit-footer__caption"> 2017 &copy; Koło Naukowe IT Politechnika Krakowska </span>
    <ul class="knit-footer__socialbox-list">
      <li class="knit-footer__socialbox-item">
        <a href="https://github.com/knit-pk" target="_blank" class="knit-footer__socialbox-link">
          <span class="flaticon-github-logo knit-footer__socialbox-icon" aria-hidden="true"></span>
          Github
        </a>
      </li>
      <li class="knit-footer__socialbox-item">
        <a href="https://www.facebook.com/wieik.knit" target="_blank" class="knit-footer__socialbox-link">
          <span class="flaticon-facebook-logo knit-footer__socialbox-icon" aria-hidden="true"></span>
          Facebook
        </a>
      </li>
    </ul>
  </footer>
</template>

<script>
import KnitLogo from '~/components/partials/KnitLogo'
import KnitNavbar from '~/components/KnitNavbar'

export default {
  data () {
    return {}
  },
  components: {
    KnitNavbar,
    KnitLogo
  }
}
</script>

<style lang='scss'>
@import "assets/scss/_imports.scss";

.knit-footer {
  background-color: $footer-bg-color;
  display: flex;
  flex-direction: column;
  align-items: center;

  &__link {
    display: block;
    margin-top: 35px;
    width: 65px;
    height: auto;
  }

  &__caption {
    display: block;
    margin: 30px 0 auto;
    text-align: center;
    font-size: 0.75rem;
    color: $footer-text-color;
  }

  &__socialbox-list {
    display: flex;
    justify-content: center;
    list-style: none;
    display: flex;
    align-items: center;
    margin-top: 40px;
    height: 50px;
    background-color: $footer-down-bg-color;
    align-self: stretch;
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
    color: #ffffff;
    text-align: center;
    font-size: 0.80rem;
  }

  &__socialbox-icon {
    position: relative;
    top: 2px;
    margin-right: 3px;
  }
}
</style>
