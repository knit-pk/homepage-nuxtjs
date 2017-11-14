<template>
  <nav class="navbar">
    <ul class="navbar__list">
      <li class="navbar__list-item">
        <a href="/" class="navbar__list-link">Strona główna</a>
      </li>
      <li class="navbar__list-item">
        <a href="/" class="navbar__list-link">O nas</a>
      </li>
      <li class="navbar__list-item">
        <a href="/" class="navbar__list-link">Sekcje</a>
      </li>
      <li class="navbar__list-item">
        <a href="/" class="navbar__list-link">Zarząd</a>
      </li>
      <li class="navbar__list-item">
        <a href="/" class="navbar__list-link">Członkowie</a>
      </li>
      <li class="navbar__list-item">
        <a href="/" class="navbar__list-link">Kontakt</a>
      </li>
    </ul>
  </nav>
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

.navbar {
  $p: &;
  background-color: $navbar-bg-color;
  height: 50px;
  margin-top: 50px;
  display: flex;
  justify-content: flex-end;
  padding-right: 15%;
  font-size: 15px;
  font-weight: 300;

  &__list {
    list-style: none;
    display: flex;
  }

  &__list-item {
    display: flex;
  }

  &__list-link {
    padding: 0 15px;
    display: flex;
    align-items: center;
    color: $navbar-links-color;
    text-decoration: none;

    &:hover,
    &:focus {
      background-color: $navbar-links-hover-bg-color;
    }
  }

  &.navbar--footy {
    justify-content: center;
    padding: 0;
    margin-top: 25px;

    #{$p}__list-link {
      border-bottom: 1px solid transparent;
      color: $footer-text-color;

      &:hover, &:focus {
        background-color: transparent;
        border-bottom: 1px solid white;
      }
    }
  }
}
</style>
