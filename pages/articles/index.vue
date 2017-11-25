<template>
  <article-list/>
</template>

<script>
import ArticleList from '~/components/article/List.vue'

export default {
  components: {
    ArticleList
  },
  fetch ({ store, params }) {
    // return store.dispatch('article/list/getItems', store.state.article.list.page)
  }
}
</script>
