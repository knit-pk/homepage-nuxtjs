<template>
  <div class= "article-breadcrumb">
    <ul class="article-breadcrumb__routes">
      <li v-for="({path, text}, index) in breadcrumbs" class="article-breadcrumb__item" :key ="index">
        <router-link :to="{ path }"> {{ text }} </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  components: {},
  props: {
    breadcrumbs: {
      type: Array,
      default: () => [
        {
          text: 'Strona główna',
          path: '/'
        }
      ]
    }
  },
  computed: {},
  methods: {},
  mixins: {}
}
</script>

<style lang="scss">
@import "assets/scss/_imports.scss";

.article-breadcrumb {
  &__routes {
    list-style: none;
    margin-left: 9px;
    margin-bottom: 10px;
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

  &__routes li+li:before {
    padding: 6px;
    color: $gray-50;
    content: ">\00a0";
  }

  &__routes li a {
    color: $gray-50;
    text-decoration: none;
  }

  &__routes li a:hover {
    text-decoration: underline;
  }

  &__routes li:last-child a {
    font-weight: bold;
    text-decoration: none;
  }
}
</style>
