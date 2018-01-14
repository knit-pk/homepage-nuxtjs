<template>
  <div class="page page--article">
    <div class="leftside-wrapper">
      <main class="main-content">
        <article-single :title="article.title"
                    :content="article.content"
                    :thumbnail="article.image.url"
                    :author="article.author"
                    :description="article.description"
                    :published-at="article.publishedAt"
                    :likes="article.likes"
                    :comments="article.comments"
                    :comments-count="article.commentsCount"
                    :slug="article.code"
                    :id="article.id"/>
      </main>
    </div>
    <aside class="aside-right">
      <popular-articles-widget/>
      <recommended-articles-widget/>
    </aside>
  </div>
</template>

<script>
import ArticleSingle from '~/components/ArticleSingle.vue'
import PopularArticlesWidget from '~/components/PopularArticlesWidget.vue'
import RecommendedArticlesWidget from '~/components/RecommendedArticlesWidget.vue'
import { mapGetters } from 'vuex'

const storePath = 'articles/item'

export default {
  layout: 'common',
  components: {
    ArticleSingle,
    PopularArticlesWidget,
    RecommendedArticlesWidget
  },
  computed: {
    ...mapGetters({
      loading: `${storePath}/loading`,
      article: `${storePath}/article`,
      status: `${storePath}/status`,
      error: `${storePath}/error`
    })
  },
  beforeDestroy () {
    this.$store.dispatch(`${storePath}/resetArticle`)
  },
  fetch ({ store, params }) {
    return Promise.all([ store.dispatch('articles/item/getArticle', params.slug) ])
  }
}
</script>

<style lang="scss">
</style>

