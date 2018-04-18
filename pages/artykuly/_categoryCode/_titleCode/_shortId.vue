<template>
  <div class="page page--article">
    <div class="leftside-wrapper">
      <main class="main-content">

        <!-- Article detail -->
        <article-single
          :title="article.title"
          :content="article.content"
          :thumbnail="article.image.url"
          :author="article.author"
          :description="article.description"
          :published-at="article.publishedAt"
          :updated-at="article.updatedAt"
          :tags="article.tags"
          :ratings="article.ratings"
          :category="article.category"
          :comments="article.comments"
          :comments-count="article.commentsCount"
          :code="article.code"
          :id="article.id"/>
      </main>
    </div>

    <!-- Aside right -->
    <aside class="aside-right">
      <popular-articles-widget/>
      <recommended-articles-widget/>
    </aside>
  </div>
</template>

<script>
import RecommendedArticlesWidget from '~/components/widgets/RecommendedArticlesWidget'
import PopularArticlesWidget from '~/components/widgets/PopularArticlesWidget'
import ArticleSingle from '~/components/article/ArticleSingle'
import _ from 'lodash'

export default {
  layout: 'common',
  components: {
    ArticleSingle,
    PopularArticlesWidget,
    RecommendedArticlesWidget,
  },
  computed: {
    article () {
      return this.$store.getters['resources/articles'][this.$store.getters['view/articles/currentArticleCode']]
    },
  },
  fetch ({ store, params }) {
    return store.dispatch('view/articles/getArticle', {
      code: _.values(params).join('/'),
    })
  },
}
</script>

<style lang="scss">
@import "assets/scss/imports";

.page--article {
  &.page--mobile {
    margin-top: 70px;
  }

  .aside-right {
    margin-top: 2 * $default-gutters-width;
  }

  .article {
    max-width: 100vw;

    @media (min-width: $screen-sm) {
      margin-right: $default-gutters-width;
    }

    @media (min-width: $screen-xl) {
      max-width: 950px;
    }
  }

  .main-content {
    @media (max-width: 1241px) {
      margin-right: 0;
    }
  }
}
</style>
