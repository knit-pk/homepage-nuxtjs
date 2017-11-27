<template>
  <article-list/>
</template>

<script>
import ArticleList from '~/components/ArticleList'

export default {
  layout: 'common',
  components: {
    ArticleList
  },
  fetch ({ store, params }) {
    return store.dispatch('articles/list/getArticleList', { page: 1 })
  }
}
</script>
