<template>
<div class="page page--category">
  <article-category-banner/>

  <!-- Category leftside wrapper -->
  <div class="leftside-wrapper">
    <main class="main-content">
      <article-card-list :class="[ 'article-card-list--horizontal', !isMobile ? 'article-card-list--big-main-post' : '' ]" :articles="list"/>
    </main>
    <aside class="aside-down">
    </aside>
  </div>

  <!-- Category aside right -->
  <aside class="aside-right">
    <categories-widget/>
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
    ArticleCardList
  },
  computed: {
    ...mapGetters({
      categoryCodeList: 'view/articles/categoryCodeList',
      isMobile: 'general/isMobile'
    }),
    list () {
      return _.map(this.categoryCodeList, code => this.$store.getters[ 'resources/articles' ][code])
    }
  },
  fetch ({ store, params }) {
    if (params.categoryCode === 'wszystkie') {
      return store.dispatch('view/articles/getMainList')
    }

    return store.dispatch('view/articles/getCategoryList', params)
  }
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
