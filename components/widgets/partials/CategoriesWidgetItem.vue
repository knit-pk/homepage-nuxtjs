<template>
  <router-link :to="{ path }" class="categories-widget-item link-no-decoration widget-item">
    <span class="categories-widget-item__name"> {{ name }} </span>
    <b-badge pill variant="info" class="categories-widget-item__articles-count"> {{ articlesCount }} </b-badge>
  </router-link>
</template>

<script>
export default {
  components: {},
  mixins: {},
  props: {
    name: {
      type: String,
      required: true,
    },
    articlesCount: {
      required: true,
      type: Number,
    },
    path: {
      type: String,
      required: true,
    },
  },
  data () {
    return {}
  },
  computed: {},
  methods: {},
}
</script>

<style lang="scss">
@import "assets/scss/_imports";

.categories-widget-item {
  display: flex;
  padding: 13px 16px;
  font-size: 0.9rem;

  &:not(:last-child) {
    border-bottom: 1px solid $gray-30;
  }

  &__name {
    line-height: 1.5;
    flex: 1;
  }

  &__articles-count {
    padding: 6px 17px;
    font-size: 0.7rem;
  }
}
</style>
