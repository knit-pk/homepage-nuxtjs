<template>
  <div class="knit-menu">
    <site-heading/>
    <button @click="onHamburgerClick" :class="[ 'hamburger', { 'hamburger--open': !isCollapsed } ]" type="button">
      <span class="hamburger__icon icon1"></span>
      <span class="hamburger__icon icon2"></span>
      <span class="hamburger__icon icon3"></span>
    </button>

    <div :class="[ 'knit-menu__navigation collapse-menu', { 'collapse-menu--show': !isCollapsed } ]">
      <knit-navbar class="navbar--menu"/>
      <div class="knit-menu__searchbar-wrapper">
        <searchbar class="searchbar--menu"/>
      </div>
    </div>
  </div>
</template>

<script>
import SiteHeading from '~/components/partials/SiteHeading'
import KnitNavbar from '~/components/commons/KnitNavbar'
import Searchbar from '~/components/partials/Searchbar'

export default {
  data () {
    return {
      isCollapsed: true,
      body: null
    }
  },
  methods: {
    onHamburgerClick () {
      this.isCollapsed = !this.isCollapsed
      this.body.classList.toggle('no-scroll')
    }
  },
  components: {
    SiteHeading,
    KnitNavbar,
    Searchbar
  },
  beforeMount () {
    this.body = document.querySelector('body')
  }
}
</script>

<style lang="scss">
@import "assets/scss/imports";

.knit-menu {
  height: 55px;
  background-color: $knit-menu-bg-color;
  position: fixed;
  z-index: 9999;
  display: flex;
  width: 100%;

  .fixed-top--hidden {
    margin-top: -55px;
  }

  .site-heading {
    margin-left: 10px;
  }

  .hamburger {
    margin-right: 10px;
  }
}

.collapse-menu {
  transition: left .1s ease-out;
  height: calc(100vh + 55px);
  flex-direction: column;
  position: fixed;
  z-index: 9998;
  top: 55px;
  width: 100%;
  left: -3000px;

  &--show {
    background-color: $knit-menu-collapse-bg-color;
    display: flex;
    left: 0;
  }
}

.hamburger {
  $p: &;
  @include reset-input;
  transition: .5s ease-in-out;
  position: relative;
  margin-top: 12px;
  cursor: pointer;
  width: 25px;

  &__icon {
    background-color: $knit-header-links-text-color;
    transition: .25s ease-in-out;
    transform: rotate(0deg);
    border-radius: 3px;
    position: absolute;
    display: block;
    width: 25px;
    height: 2px;
    opacity: 1;
    left: 0;

    &.icon1 {
      top: 5px;
    }

    &.icon2 {
      top: 14px;
    }

    &.icon3 {
      top: 23px;
    }
  }

  &--open {
    #{$p}__icon.icon1 {
      transform: rotate(45deg);
      top: 15px;
    }

    #{$p}__icon.icon2 {
      opacity: 0;
    }

    #{$p}__icon.icon3 {
      transform: rotate(-45deg);
      top: 15px;
    }
  }
}
</style>
