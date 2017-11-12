<template>
</template>

<script>
export default {
  components: { },
  layout: ({ isMobile }) => isMobile ? 'mobile/content-types/articles/show' : 'desktop/content-types/articles/show',
  fetch ({ store, params }) {
    return store.dispatch('article/show/retrieveByCode', params.slug)
  }
}
</script>
