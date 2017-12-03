<template>
  <article-detail :title="article.title"
                  :author="article.author.username"
                  :content="article.content"
                  :thumbnail-url="article.image"
                  :author-avatar-url="article.author.avatarUrl"
                  :published-at="article.publishedAt"
                  :created-at="article.createdAt"
                  :likes="article.likes"
                  :comments="article.comments"
                  :slug="article.code"/>
</template>

<script>
import ArticleDetail from '~/components/ArticleDetail.vue'
import { mapGetters } from 'vuex'

const storePath = 'articles/item'

export default {
  layout: 'common',
  components: {
    ArticleDetail
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
