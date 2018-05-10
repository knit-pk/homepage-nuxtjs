<template>
  <header v-config class="category-banner">
    <img :src="categoryImage" alt="Obraz kategorii" class="category-banner__image">
  </header>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  components: {},
  mixins: [],
  props: {
    categoryImage: {
      type: String,
      required: true,
    },
  },
  data () {
    return {}
  },
  computed: {
    ...mapGetters({
    }),
  },
  methods: {},
}
</script>

<style lang="scss">
@import "assets/scss/_imports";

.category-banner {
  height: 380px;
  width: 100%;

  @media (max-width: $screen-xl) {
    height: 300px;
    margin: 0 10px;
  }

  @media (max-width: $screen-sm) {
    margin: 0 10px;
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
