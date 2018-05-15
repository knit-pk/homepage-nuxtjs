<template>
  <div class="page page--category">
    <article-category-banner/>

    <!-- Category leftside wrapper -->
    <div class="leftside-wrapper">
      <main class="main-content">
        <article-card-list :class="[ 'article-card-list--horizontal', !isMobile ? 'article-card-list--big-main-post' : '' ]" :articles="articlesList"/>
      </main>
      <aside class="aside-down"/>
    </div>

    <!-- Category aside right -->
    <aside class="aside-right">
      <categories-widget class="aside-right__widget"/>
    </aside>
  </div>
</template>

<script>
import ArticleCategoryBanner from '~/components/article/ArticleCategoryBanner'
import CategoriesWidget from '~/components/widgets/CategoriesWidget'
import ArticleCardList from '~/components/article/ArticleCardList'
import { mapGetters } from 'vuex'
import _ from 'lodash'

export default {
  layout: 'common',
  components: {
    ArticleCategoryBanner,
    CategoriesWidget,
    ArticleCardList,
  },
  computed: {
    ...mapGetters({
      categoryArticlesCodeList: 'view/articles/categoryArticlesCodeList',
      isMobile: 'general/isMobile',
    }),
    articlesList () {
      return _.map(this.categoryArticlesCodeList, code => this.$store.getters['resources/articles'][code])
    },
  },
  fetch ({ store, params }) {
    const promises = [
      store.dispatch('view/categories/getCategories'),
      params.categoryCode === 'wszystkie' ?
        store.dispatch('view/articles/getMainList') :
        store.dispatch('view/articles/getCategoryArticlesList', params),
    ]

    return Promise.all(promises)
  },
}
</script>

<style lang="scss">
@import "assets/scss/imports";

.page--category {
  margin-top: 120px;

  &.page--mobile {
    margin-top: 70px;
  }

  .leftside-wrapper, .aside-right {
    margin-top: 15px;
  }
}
</style>
