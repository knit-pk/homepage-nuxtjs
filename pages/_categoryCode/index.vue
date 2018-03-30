<template>
  <div class="page">
    <article-list/>
  </div>
</template>

<script>
import ArticleList from '~/components/article/ArticleList'

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

<style lang="scss">
</style>
