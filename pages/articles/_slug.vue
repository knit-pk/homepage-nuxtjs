<template>
  <article-show/>
</template>

<script>
import ArticleShow from '~/components/article/Show.vue'

export default {
  components: {
    ArticleShow
  },
  fetch ({ store, params }) {
    return store.dispatch('article/show/retrieveByCode', params.slug)
  }
}
</script>
