<template>
  <nav class="navbar">
    <ul class="navbar__list">
      <li class="navbar__list-item">
        <router-link :to="{ path: '/'}" class="navbar__list-link">Strona Główna</router-link>
      </li>
      <li class="navbar__list-item">
        <router-link :to="{ path: '/'}" class="navbar__list-link">O nas</router-link>
      </li>
      <li class="navbar__list-item">
        <router-link :to="{ path: '/'}" class="navbar__list-link">Sekcje</router-link>
      </li>
      <li class="navbar__list-item">
        <router-link :to="{ path: '/'}" class="navbar__list-link">Zarząd</router-link>
      </li>
      <li class="navbar__list-item">
        <router-link :to="{ path: '/'}" class="navbar__list-link">Członkowie</router-link>
      </li>
      <li class="navbar__list-item">
        <router-link :to="{ path: '/'}" class="navbar__list-link">Kontakt</router-link>
      </li>
      <li class="navbar__list-item">
        <router-link :to="{ name: 'articles'}" class="navbar__list-link">Artykuły</router-link>
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
    transition: background-color 0.15s ease-in-out;

    &:hover,
    &:focus {
      background-color: $navbar-links-hover-bg-color;
    }
  }

  &.navbar--footy {
    padding: 0;
    margin-top: 25px;

    #{$p}__list-link {
      color: $footer-text-color;
      padding: 0;
      margin: 0 15px;

      &:hover,
      &:focus {
        background-color: transparent;
        opacity: 0.5;
      }
    }
  }
}
</style>
