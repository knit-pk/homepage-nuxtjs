<template>
</template>

<script>
export default {
  components: { },
  layout: ({ isMobile }) => isMobile ? 'mobile/content-types/articles/list' : 'desktop/content-types/articles/list',
  fetch ({ store, params }) {
    return store.dispatch('article/list/getItems', store.state.article.list.page)
  }
}
</script>
