<template>
  <div v-config class="article-breadcrumb">
    <ul class="article-breadcrumb__routes">
      <li v-for="({ path, text }, index) in breadcrumbs" :key ="index" class="article-breadcrumb__item">
        <router-link :to="{ path }"> {{ text }} </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  components: {},
  mixins: {},
  props: {
    breadcrumbs: {
      type: Array,
      default: () => [
        {
          text: 'Strona główna',
          path: '/',
        },
      ],
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
@import "src/assets/scss/_imports";

.article-breadcrumb {
  &__routes {
    list-style: none;
    margin-left: 9px;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 4px 0 11px 0;
  }

  &__routes li {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: inline;
  }

  &__routes li + li::before {
    padding: 6px;
    color: $gray-50;
    content: ">\00a0";
  }

  &__routes li a {
    color: $gray-50;
    text-decoration: none;
  }

  &__routes li:last-child a {
    font-weight: bold;
    text-decoration: none;
  }

  &__routes li a:hover {
    text-decoration: underline;
  }
}
</style>
