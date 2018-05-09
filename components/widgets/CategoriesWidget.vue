<template>
  <section v-config class="widget categories-widget">
    <widget-title widget-class="categories-widget" title="Kategorie" widget-icon-class="far fa-newspaper"/>
    <categories-widget-item
      v-for="(item, index) of categoriesList"
      :key="index"
      :name="item.name"
      :path="`/artykuly/${item.code}`"
      :articles-count="item.articlesCount"/>
  </section>
</template>

<script>
import CategoriesWidgetItem from '~/components/widgets/partials/CategoriesWidgetItem'
import WidgetTitle from '~/components/widgets/partials/WidgetTitle'
import { mapGetters } from 'vuex'
import _ from 'lodash'

export default {
  components: {
    CategoriesWidgetItem,
    WidgetTitle,
  },
  mixins: {},
  props: {},
  data () {
    return {}
  },
  computed: {
    ...mapGetters({
      categoriesCodesList: 'view/categories/categoriesCodesList',
    }),
    categoriesList () {
      return _.map(this.categoriesCodesList, code => this.$store.getters['resources/categories'][code])
    },
  },
  methods: {},
}
</script>

<style lang="scss">
@import "assets/scss/_imports";

.categories-widget {
  background-color: #fff;
  margin-bottom: $default-gutters-width;

  &__title {
    padding: 17px 15px;
  }
}
</style>
