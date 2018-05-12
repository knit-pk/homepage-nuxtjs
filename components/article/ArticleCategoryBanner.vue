<template>
  <header v-config class="category-banner">
    <h2 class="category-banner__name"> {{ currentCategoryName }} </h2>
    <img :src="currentCategoryImage" alt="Obraz kategorii" class="category-banner__image">
  </header>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  components: {},
  mixins: [],
  props: {},
  data () {
    return {}
  },
  computed: {
    ...mapGetters({
      currentCategoryImage: 'view/categories/currentCategoryImage',
      currentCategoryName: 'view/categories/currentCategoryName',
    }),
  },
  methods: {},
}
</script>

<style lang="scss">
@import "assets/scss/_imports";

.category-banner {
  width: 100%;

  @media (max-width: $screen-sm) {
    margin: 0 10px;
  }

  &__image {
    width: 100%;
    height: 380px;
    object-fit: cover;
    box-sizing: border-box;

    @media (max-width: $screen-xl) {
      height: 280px;
    }

    @media (max-width: $screen-sm) {
      height: 240px;
    }
  }

  &__name {
    font-size: 2.4rem;
    color: $gray-50;
    text-transform: uppercase;
    margin-bottom: 5px;
    margin-left: 2px;

    @media (max-width: $screen-sm) {
      font-size: 1.5rem;
    }
  }
}
</style>
