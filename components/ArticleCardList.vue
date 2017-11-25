<template>
  <section class="article-card-list article-card-list--big-main-post">
    <h2 class="visualy-hidden">Artykuły KNIT</h2>
    <article-card v-for="(article, index) in articles" :key="index"
                       :title="article.title"
                       :author="article.author.username"
                       :content="article.content"
                       :thumbnail-url="article.thumbnailUrl"
                       :author-avatar-url="article.author.avatarUrl"
                       :published-at="article.publishedAt"
                       :created-at="article.createdAt"
                       :likes="article.likes"
                       :comments="article.comments"/>
  </section>
</template>

<script>
import ArticleCard from '~/components/ArticleCard.vue'
import { mapState } from 'vuex'

const storePath = 'article-card-list'

export default {
  data () {
    return { }
  },
  computed: {
    ...mapState({
      articles: state => state[storePath].articles,
      loading: state => state[storePath].loading,
      error: state => state[storePath].error
    })
  },
  components: {
    ArticleCard
  }
}
</script>

<style lang="scss">
@import "assets/scss/_imports.scss";

.article-card-list {
  display: flex;
  flex-wrap: wrap;

  .article-card {
    margin: 0 $default-gutters-width $default-gutters-width 0;
  }

  &--big-main-post {
    .article-card {
      &:first-of-type {
        flex-basis: calc(66.666% - #{$default-gutters-width});
        position: relative;
        justify-content: flex-end;

        .article-card__thumbnail-link {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 1;

          &:after {
            content: '';
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            background: linear-gradient(to bottom, rgba(90,45,140,0) 0%,rgba(15,15,15,1) 100%);
          }
        }

        .article-card__title {
          min-width: 500px;
        }

        .article-card__thumbnail {
          width: 100%;
          height: 100%;
          object-fit: cover;
          position: relative;
        }

        .article-card__title-link {
          color: #fff;
          z-index: 2;
        }

        .article-card__author-link {
          z-index: 2;
          color: #fff;
        }

        .article-card__author-avatar-link {
          z-index: 2;
        }

        .article-card__content {
          z-index: 2;
          color: #fff;
        }

        .article-card__footer {
          margin-top: 0;
          z-index: 2;
          background-color: transparent;
          color: #fff;
        }

        .article-card__like-button {
          color: #fff;

          &:hover, &:focus {
            color: $article-card-like-button-hover-color;
          }

          &--liked {
            color: darken($article-card-like-button-liked-color, 5%);
          }
        }
      }
    }
  }
}
</style>
