<template>
  <form class="searchbar">
    <label for="site-search" class="visualy-hidden">Wyszukaj na stronie</label>
    <input id="site-search" type="search" class="searchbar__input" placeholder="Szukaj" autocomplete="off">
    <span class="flaticon-magnifying-glass searchbar__icon"></span>
  </form>
</template>

<script>
export default {
  data () {
    return {}
  }
}
</script>

<style lang="scss">
@import "assets/scss/imports";
/* @TODO: Probably we should create another scss file for all these colors */

.searchbar {
  $p: &;
  position: relative;
  margin-right: 5px;
  color: $knit-header-links-text-color;

  &--menu {
    margin: 20px 10px 0 10px;

    #{$p}__input {
      background-color: #2c2c2c;
      width: 100%;

      &:focus {
        width: 100%;
      }
    }
  }

  &__input {
    border-radius: $default-blocks-border-radius;
    border: none;
    height: 30px;
    color: $knit-header-links-text-color;
    padding: 0 10px 0 35px;
    font-size: 14px;
    outline: 0;
    background-color: $knit-navbar-bg-color;
    width: 100px;
    transition: 0.4s width;

    &:focus {
      width: 250px;
      color: $knit-header-links-hover-text-color;
    }

    &::placeholder {
      color: $knit-header-links-text-color;
    }
  }

  &__icon {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);

    &:before {
      font-size: 14px;
    }
  }
}
</style>
