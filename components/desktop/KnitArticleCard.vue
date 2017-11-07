<template>
  <article class="article-card">
    Card
  </article>
</template>

<style lang="scss">
@import "assets/scss/_imports.scss";

.article-card {
  background-color: #fff;
  height: 420px;
  box-sizing: border-box;
  margin: 0 $knit-default-gutters-width $knit-default-gutters-width 0;
  flex-basis: calc(33.333% - #{$knit-default-gutters-width});
}
</style>

