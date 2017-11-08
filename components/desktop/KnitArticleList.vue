<template>
  <div class="article-list">
    <knit-article-card/>
    <knit-article-card/>
    <knit-article-card/>
    <knit-article-card/>
    <knit-article-card/>
  </div>
</template>

<script>
import KnitArticleCard from '~/components/desktop/KnitArticleCard.vue'

export default {
  components: {
    KnitArticleCard
  }
}
</script>

<style lang="scss">
@import "assets/scss/_imports.scss";

.article-list {
  display: flex;
  flex-wrap: wrap;

  .article-card {
    &:first-child {
      flex-basis: calc(66.666% - #{$knit-default-gutters-width});
    }
  }
}
</style>
