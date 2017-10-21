<template>
  <header class="knit-header" :class="{'knit-header--high': isHighMenu, 'knit-header--low': !isHighMenu}">
    <div class="knit-header__logotype-wrapper">
      <h1 class="knit-header__heading">
        <a class="knit-header__link" href="/">
          <img class="knit-header__image" src="knit-logotype.svg" alt="KNIT Homepage">
        </a>
      </h1>
    </div>
    <div class="knit-header__menu-block-wrapper">
      <div class="knit-header__organization">
        <h2 class="knit-header__name">Koło Naukowe IT</h2>
        <span class="knit-header__caption">Cracow University of Technology students IT organization</span>
      </div>
      <nav class="knit-header__nav">
        <ul class="knit-header__nav-list">
          <li class="knit-header__nav-item">
            <a class="knit-header__nav-link" href="/">Strona główna</a>
          </li>
          <li class="knit-header__nav-item">
            <a class="knit-header__nav-link" href="/">Zarząd</a>
          </li>
          <li class="knit-header__nav-item">
            <a class="knit-header__nav-link" href="/">Statut</a>
          </li>
          <li class="knit-header__nav-item">
            <a class="knit-header__nav-link" href="/">O nas</a>
          </li>
          <li class="knit-header__nav-item">
            <a class="knit-header__nav-link" href="/">Zaloguj się</a>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
import throttle from 'lodash/throttle'
export default {
  data () {
    return {
      highMenuIndicator: 0,
      highMenuIndicatorsMap: {
        low: 191,
        mid: 211,
        high: 311
      },
      isHighMenu: true
    }
  },
  methods: {
    toggleWideMenu: throttle(function () {
      this.isHighMenu = window.scrollY < this.highMenuIndicator
    }, 180),
    onResize: throttle(function () {
      const windowWidth = window.outerWidth
      this.highMenuIndicator = windowWidth < 961 ? this.highMenuIndicatorsMap.low :
        windowWidth >= 961 && windowWidth < 1281 ?
          this.highMenuIndicatorsMap.mid :
          this.highMenuIndicatorsMap.high
    }, 500)
  },
  mounted () {
    this.onResize()
    this.toggleWideMenu()
    window.addEventListener('scroll', this.toggleWideMenu)
    window.addEventListener('resize', this.onResize)
  },
  destroyed () {
    window.removeEventListener('scroll', this.toggleWideMenu)
    window.removeEventListener('resize', this.onResize)
  }
}
</script>

<style lang='scss'>
@import "assets/scss/_imports.scss";
// @TODO: Some animation for KnitMenu (bad UX)
.knit-header {
  $p: &;
  top: 0;
  position: fixed;
  width: 100%;
  background-color: $knit-header-bg-color;
  display: flex;
  z-index: 9999;
  border-bottom: 0.5px solid $knit-header-border-color;
  &__heading {
    margin: 0;
  }
  &__logotype-wrapper {
    transition: all 0.2s linear;
  }
  &__link {
    height: 100%;
  }
  &__menu-block-wrapper {
    transition: all 0.2s linear;
  }
  &__organization {
    display: none;
  }
  &__nav-list {
    display: flex;
  }
  &__nav-item {
    display: inline-block;
  }
  &__nav-link {
    margin: 0 10px;
    white-space: nowrap;
    text-transform: uppercase;
    text-decoration: none;
    color: $knit-header-links-color;
    &:hover {
      border-bottom: 1px solid $knit-header-links-hover-color;
    }
    &:active {
      color: $knit-header-links-color-active;
    }
  }
  &--low {
    #{$p}__logotype-wrapper {
      flex: 1;
      padding: 5px 20px;
    }
    #{$p}__image {
      width: 50px;
      height: 50px;
    }
    #{$p}__menu-block-wrapper {
      margin: auto 0;
    }
    #{$p}__nav-item {
      padding: 5px 5px;
    }
  }
  &--high {
    justify-content: center;
    flex-direction: column;
    align-items: center;
    #{$p}__logotype-wrapper {
      transition: none;
      margin: 30px 0;
    }
    #{$p}__name {
      display: block;
    }
    #{$p}__nav-list {
      padding-bottom: 10px;
    }
  }
}

@media (min-width: $desktop-width) {
  .knit-header {
    $p: &;
    &--high {
      flex-direction: row;
      #{$p}__logotype-wrapper {
        flex: 1;
      }
      #{$p}__image {
        float: right;
        height: 150px;
        width: 150px;
      }
      #{$p}__menu-block-wrapper {
        flex: 1;
        margin: 30px 20px;
        padding: 20px 20px 0 30px;
      }
      #{$p}__organization {
        display: initial;
      }
      #{$p}__name {
        font-size: 2rem;
        padding: 0;
      }
      #{$p}__caption {
        font-size: 1rem;
      }
      #{$p}__nav {
        margin-top: 20px;
      }
      #{$p}__nav-item {
        padding: 5px 20px 15px 0;
      }
      #{$p}__nav-link {
        margin: 0;
        font-size: 1.25rem;
      }
    }
  }
}

@media (min-width: $desktop-large-width) {
  .knit-header {
    $p: &;
    &--high {
      #{$p}__menu-block-wrapper {
        margin: 60px 20px;
      }
      #{$p}__image {
        height: 250px;
        width: 250px;
      }
      #{$p}__caption {
        font-size: 1.25rem;
        margin: 0px 0px 30px 4px;
      }
      #{$p}__name {
        font-size: 2.5rem;
      }
      #{$p}__nav {
        margin-top: 50px;
      }
      #{$p}__nav-link {
        font-size: 1.5rem;
      }
    }
  }
}
</style>
