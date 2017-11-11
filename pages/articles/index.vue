<template>
</template>

<script>
export default {
  components: { },
  layout: ({ isMobile }) => isMobile ? 'mobile/content-types/articles' : 'desktop/content-types/articles'
}
</script>
