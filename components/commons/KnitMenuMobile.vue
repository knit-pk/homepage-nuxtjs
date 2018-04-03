<template>
<div class="knit-menu" v-config>

  <!-- Site heading -->
  <site-heading/>

  <!-- Hamburger button -->
  <button @click="onHamburgerClick" :class="[ 'button-no-highlight hamburger', { 'hamburger--open': isMobileMenuShown } ]" type="button">
    <span class="hamburger__icon icon1"></span>
    <span class="hamburger__icon icon2"></span>
    <span class="hamburger__icon icon3"></span>
  </button>

  <!-- Collapse menu content -->
  <div :class="[ 'knit-menu__navigation collapse-menu', { 'collapse-menu--show': isMobileMenuShown } ]">
    <knit-navbar class="navbar--menu" @linkClickedEvent="onNavbarLinkClick"/>
    <div class="knit-menu__searchbar-wrapper">
      <searchbar class="searchbar--menu"/>
    </div>
  </div>
</div>
</template>

<script>
import SiteHeading from '~/components/commons/SiteHeading'
import KnitNavbar from '~/components/commons/KnitNavbar'
import Searchbar from '~/components/commons/Searchbar'
import _ from 'lodash'

export default {
  data () {
    return {
      isMobileMenuShown: false,
      bodyElement: null,
      htmlElement: null
    }
  },
  components: {
    SiteHeading,
    KnitNavbar,
    Searchbar
  },
  props: {},
  computed: {},
  methods: {
    onHamburgerClick () {
      this.isMobileMenuShown = !this.isMobileMenuShown
      this.toggleElementsClass([ this.bodyElement, this.htmlElement ], 'no-scroll')
      this.$emit('mobileMenuToggle', this.isMobileMenuShown)
    },
    onNavbarLinkClick () {
      setTimeout(() => this.onHamburgerClick(), 300)
    },
    toggleElementsClass (elements, className) {
      _.each(elements, element => { element && element.classList.toggle(className) })
    }
  },
  mixins: {},
  beforeMount () {
    this.bodyElement = document.querySelector('body')
    this.htmlElement = document.querySelector('html')
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

  &__navigation {
    padding-top: 20px;
  }
}

.collapse-menu {
  transition: left .1s linear;
  height: 100%;
  flex-direction: column;
  position: fixed;
  z-index: 9998;
  top: 54px;
  width: 70%;
  left: -100%;
  background-color: $knit-menu-collapse-bg-color;

  @media (min-width: $screen-md) {
    width: 30%;
  }

  &--show {
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
  width: 80px;

  &__icon {
    background-color: $knit-header-links-text-color;
    transition: .25s ease-in-out;
    transform: rotate(0deg);
    border-radius: 3px;
    position: absolute;
    display: block;
    width: 25px;
    right: 12px;
    height: 2px;
    opacity: 1;

    &.icon1 {
      top: 6px;
    }

    &.icon2 {
      top: 15px;
    }

    &.icon3 {
      top: 24px;
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
