<template>
  <nav v-config class="navbar">
    <ul v-for="(link, index) of navigation" :key="index" class="navbar__list">
      <li class="navbar__list-item" @click="collapseMenu">
        <router-link :to="{ path: link.path }" class="navbar__list-link"> {{ link.text }} </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  components: {},
  mixins: {},
  props: {},
  data () {
    return {
      navigation: [
        {
          text: 'Strona Główna',
          path: '/',
        },
        {
          text: 'O nas',
          path: '/',
        },
        {
          text: 'Sekcje',
          path: '/',
        },
        {
          text: 'Zarząd',
          path: '/',
        },
        {
          text: 'Członkowie',
          path: '/',
        },
        {
          text: 'Kontakt',
          path: '/',
        },
        {
          text: 'Artykuły',
          path: '/artykuly/wszystkie',
        },
      ],
    }
  },
  computed: {},
  methods: {
    collapseMenu () {
      this.$emit('linkClickedEvent')
    },
  },
}
</script>

<style lang="scss">
@import "src/assets/scss/_imports";

.navbar {
  $p: &;
  background-color: $knit-navbar-bg-color;
  height: 50px;
  margin-top: 48px;
  display: flex;
  justify-content: flex-end;
  white-space: nowrap;
  padding-right: 15%;
  font-size: 15px;
  font-weight: 300;
  flex-wrap: nowrap;

  @media (max-width: $screen-md) {
    padding-right: 0;
    justify-content: center;
  }

  &__list {
    list-style: none;
    display: flex;
  }

  &__list-item {
    display: flex;
  }

  &__list-link {
    padding: 15px;
    display: flex;
    align-items: center;
    color: $knit-navbar-links-color;
    text-decoration: none;
    transition: background-color 0.15s ease-in-out;

    &:hover,
    &:focus {
      background-color: $knit-navbar-links-hover-bg-color;
    }
  }

  &.navbar--menu {
    padding: 0;
    margin-top: -1px;
    height: auto;
    flex-direction: column;
    align-items: flex-start;

    #{$p}__list {
      width: 100%;
      flex-direction: column;
    }

    #{$p}__list-item {
      width: 100%;
    }

    #{$p}__list-link {
      padding: 8px 20px;
      width: 100%;
    }
  }

  &.navbar--footy {
    padding: 0;
    margin-top: 25px;

    #{$p}__list-link {
      color: $knit-footer-text-color;
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
