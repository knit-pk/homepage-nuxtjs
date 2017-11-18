<template>
  <header class="knit-header">
    <h1 class="site-heading">
      <a href="/" class="site-heading__link">
        <img src="/knit-logotype.svg" class="site-heading__logo" alt="">
        <div class="site-heading__name-wrapper">
          <span>Koło Naukowe IT</span>
          <span class="site-heading__university-name">Politechnika Krakowska</span>
        </div>
      </a>
    </h1>
    <form class="searchbar">
      <label for="site-search" class="visualy-hidden">Wyszukaj na stronie</label>
      <input id="site-search" type="search" class="searchbar__input" placeholder="Szukaj" autocomplete="off">
      <span class="flaticon-magnifying-glass searchbar__icon"></span>
    </form>

    <b-dropdown class="header-dropdown" right no-flip>
      <div slot="button-content" class="header-dropdown__profile-button">
        <img :src="user.avatarUrl" class="header-dropdown__avatar" alt="">
        <span>{{ user.name }}</span>
      </div>
      <b-dropdown-item href="#">If won't</b-dropdown-item>
      <b-dropdown-item href="#">be useful</b-dropdown-item>
      <b-dropdown-item href="#">we'll delete</b-dropdown-item>
      <b-dropdown-divider></b-dropdown-divider>
      <b-dropdown-item href="#">dropdown and make</b-dropdown-item>
      <b-dropdown-item href="#">link to profile</b-dropdown-item>
    </b-dropdown>

    <b-dropdown class="header-dropdown" right no-caret no-flip>
      <span slot="button-content" class="flaticon-plus header-dropdown__button-icon" aria-label="Dodaj treść"></span>
      <b-dropdown-item href="#">Napisz artykuł</b-dropdown-item>
      <b-dropdown-item href="#">Dodaj ofertę pracy</b-dropdown-item>
      <b-dropdown-item href="#">Utwórz projekt</b-dropdown-item>
      <b-dropdown-divider></b-dropdown-divider>
      <b-dropdown-item href="#">Dodaj spotkanie</b-dropdown-item>
    </b-dropdown>

    <b-dropdown class="header-dropdown" right no-caret no-flip>
      <span slot="button-content" class="flaticon-cog-wheel header-dropdown__button-icon" aria-label="Ustawienia"></span>
      <b-dropdown-item href="#"><span class="flaticon-user header-dropdown__list-item-icon" aria-hidden="true"></span>Moje konto</b-dropdown-item>
      <b-dropdown-divider></b-dropdown-divider>
      <b-dropdown-item href="#">Akcja 1</b-dropdown-item>
      <b-dropdown-item href="#">Akcja 2</b-dropdown-item>
      <b-dropdown-divider></b-dropdown-divider>
      <b-dropdown-item href="#"><span class="flaticon-logout header-dropdown__list-item-icon" aria-hidden="true"></span>Wyloguj</b-dropdown-item>
    </b-dropdown>
  </header>
</template>

<script>
  export default {
    data () {
      return {
        user: {
          name: 'Dominik Źrebiec',
          avatarUrl: '/temporary/article-author.png'
        }
      }
    }
  }
</script>

<style lang='scss'>
@import "assets/scss/_imports.scss";

.knit-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 50px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  z-index: 9999;
  background-color: $knit-header-bg-color;
}

.site-heading {
  display: flex;
  align-items: center;
  margin-right: auto;

  &__link {
    display: flex;
    text-decoration: none;
    color: $knit-header-text-color;
  }

  &__logo {
    width: 35px;
    height: 100%;
    margin-right: 10px;
  }

  &__name-wrapper {
    display: flex;
    flex-direction: column;
    font-size: 16px;
    padding-top: 3px;
    font-weight: 400;
  }

  &__university-name {
    font-size: 10px;
    margin-left: auto;
  }
}

.searchbar {
  position: relative;
  margin-right: 5px;

  &__input {
    background-color: $knit-header-searchbar-bg-color;
    border-radius: $default-blocks-border-radius;
    color: $knit-header-text-color;
    border: none;
    height: 30px;
    padding: 0 10px 0 35px;
    font-size: 14px;
    outline: 0;
    background-color: #fff;
    width: 100px;
    transition: 0.4s width;

    &:focus {
      background-color: $knit-header-searchbar-bg-color;
      width: 250px;
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

.header-dropdown {
  display: flex;
  align-items: stretch;
  align-self: stretch;
  font-family: $default-font-family;

  &.show {
    > .btn {
      background-color: $knit-header-links-focus-bg-color;
    }
  }

  .btn {
    display: flex;
    align-items: center;
    cursor: pointer;
    border: none;
    background-color: transparent;
    padding: 0 15px;
    outline: 0;
    color: $primary-text-color;

    &:hover {
      color: $knit-header-links-hover-text-color;
    }

    &:focus {
      background-color: $knit-header-links-focus-bg-color;
      color: $knit-header-links-hover-text-color;
    }
  }

  &__button-icon {
    &:before {
      font-size: 15px;
    }
  }

  &__list-item-icon {
    &:before {
      font-size: 15px;
      margin-right: 8px;
    }
  }

  &__profile-button {
    display: flex;
    align-items: center;
    font-size: 14px;
    font-family: $default-font-family;
  }

  &__avatar {
    width: 32px;
    height: 32px;
    object-fit: cover;
    border-radius: 50%;
    margin-right: 10px;
  }

  .dropdown-menu {
    margin: 0;
    border-radius: 4px;
    border-color: #d9d9d9;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    left: 1px !important;
  }

  .dropdown-item {
    font-weight: 300;
    font-size: 14px;
    color: $gray-60;
    padding: 7px 17px;
    
    &:hover,
    &:focus {
      background-color: $knit-header-links-focus-bg-color;
      color: $knit-header-links-hover-text-color;
      outline: 0;
    }
  }

  .dropdown-divider {
    background-color: #e5e5e5;
  }
}
</style>