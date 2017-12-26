<template>
  <section :class="['article-card-list']">
    <h2 class="visualy-hidden"> Artykuły KNIT </h2>

    <article-card v-for="(article, index) in cardsArticles" :key="index"
                       :title="article.title"
                       :author="article.author"
                       :content="article.content"
                       :description="article.description"
                       :thumbnail="article.image.url"
                       :published-at="article.publishedAt"
                       :likes="article.likes"
                       :comments="article.comments"
                       :comments-count="article.commentsCount"
                       :slug="article.code"/>

  </section>
</template>

<script>
import ArticleCard from '~/components/partials/ArticleCard'
import { mapGetters } from 'vuex'
import _ from 'lodash'

const storePath = 'articles/list'

export default {
  data () {
    return {}
  },
  computed: {
    cardsArticles () {
      return _.slice(this.articles, 0, 5)
    },
    ...mapGetters({
      articles: `${storePath}/articles`,
      loading: `${storePath}/loading`,
      status: `${storePath}/status`,
      limit: `${storePath}/limit`,
      error: `${storePath}/error`
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

  &--horizontal {
    @media (max-width: $screen-xl) {
      flex-direction: column;

      .article-card {
        flex-direction: row;

        &__header {
          flex-direction: column;
          padding: 30px 0 0 20px;
        }

        &__author-link {
          position: absolute;
          left: 80px;
          top: 35px;
        }

        &__thumbnail-link {
          flex: 1 0 33%;
        }

        &__horizontal-wrapper {
          flex: 1 0 66%;
        }

        &__footer {
          justify-content: flex-end;
          width: 100%;
        }

        &__author-link {
          position: absolute;
          left: 74px;
          bottom: 14px;
        }

        &__author-avatar-link {
          position: absolute;
          left: 15px;
          bottom: 18px;
        }
      }
    }
  }

  &--big-main-post {
    .article-card {
      @media (max-width: $screen-xl) {
        flex-basis: calc(50% - #{$default-gutters-width/2});
        flex-wrap: wrap;
        margin-right: 0;

        &:nth-of-type(2n + 2) {
          margin-right: $default-gutters-width;
        }
      }

      @media (max-width: 1060px) {
        flex-basis: calc(50% - #{$default-gutters-width});
        margin-right: $default-gutters-width;
      }

      @media (max-width: $screen-sm) {
        flex-basis: 100%;
        margin-right: 0;

        &:nth-of-type(2n + 2) {
          margin-right: 0;
        }
      }

      &__title-link {
        width: 100%;
      }

      &:first-of-type {
        $ac: '.article-card';

        @media (min-width: $screen-sm) {
          flex-basis: calc(66.666% - #{$default-gutters-width});
          position: relative;
          justify-content: flex-end;

          @media (max-width: $screen-xl) {
            height: 360px;
            flex-basis: 100%;
          }

          #{$ac}__thumbnail-link {
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
              background: linear-gradient(to bottom, rgba(90,45,140,0) 0%, rgba(15,15,15,1) 100%);
            }
          }

          #{$ac}__thumbnail {
            width: 100%;
            height: 100%;
            object-fit: cover;
            position: relative;
          }

          #{$ac}__title-link {
            color: #fff;
            z-index: 2;
          }

          #{$ac}__author-link {
            z-index: 2;
            color: #fff;
          }

          #{$ac}__author-avatar-link {
            z-index: 2;
          }

          #{$ac}__description {
            z-index: 2;
            color: #fff;
          }

          #{$ac}__footer {
            margin-top: 0;
            z-index: 2;
            background-color: transparent;
            color: #fff;
          }

          #{$ac}__like-button {
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
}
</style>
