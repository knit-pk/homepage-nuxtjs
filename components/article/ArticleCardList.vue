<template>
<section class="article-card-list article-card-list--big-main-post" v-config>
  <h2 class="visualy-hidden"> Artykuły KNIT </h2>

  <!-- Articles list -->
  <article-card v-for="(article, index) in articles" :key="index"
                      :title="article.title"
                      :author="article.author"
                      :content="article.content"
                      :description="article.description"
                      :thumbnail="article.image.url"
                      :published-at="article.publishedAt"
                      :updated-at="article.updatedAt"
                      :tags="article.tags"
                      :ratings="article.ratings"
                      :comments="article.comments"
                      :category="article.category"
                      :comments-count="article.commentsCount"
                      :short-id="article.shortId"
                      :title-code="article.titleCode"
                      :category-code="article.categoryCode"
                      :code="article.code"/>
</section>
</template>

<script>
import ArticleCard from '~/components/article/ArticleCard'

export default {
  data () {
    return {}
  },
  components: {
    ArticleCard
  },
  props: {
    articles: {
      required: true,
      type: Array
    }
  },
  computed: {},
  methods: {},
  mixins: {}
}
</script>

<style lang="scss">
@import "assets/scss/_imports";

.article-card-list {
  display: flex;
  flex-wrap: wrap;

  @media (max-width: $screen-sm) {
    padding: 0 10px;
  }

  .article-card {
    margin: 0 $default-gutters-width $default-gutters-width 0;
    flex-basis: calc(33.333% - #{$default-gutters-width});
    margin-right: $default-gutters-width;

    @media (min-width: 1060px) and (max-width: $screen-xl) {
      flex-basis: calc(50% - #{$default-gutters-width});
    }

    @media (max-width: $screen-md) {
      flex-basis: calc(50% - #{$default-gutters-width});
    }

    @media (max-width: $screen-sm) {
      flex-basis: 100%;
      margin-right: 0;
    }
  }

  &--horizontal {
    &.article-card-list--big-main-post {
      .article-card:first-of-type {
        @media (max-width: 1060px) and (min-width: $screen-sm) {
          flex-basis: 100%;
          height: 400px;
        }
      }
    }

    .article-card {
      &:nth-of-type(n+3) {
        flex-basis: 100%;

         @media (min-width: 1060px) {
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        align-items: flex-start;
        box-sizing: border-box;
        min-height: 240px;
      .article-card__thumbnail-link {
        width: calc(33.333% - #{$default-gutters-width});
        float: left;
        min-height: 200px;
        position: absolute;
        object-fit: cover;
      }
      .article-card__author-wrapper {
       position: absolute;
       bottom: 0;
       margin-bottom: -2px;
     }
     .article-card__horizontal-wrapper {
        display: flex;
        flex-direction: column;
        order: 1;
        margin-top: auto;
        width: calc(66.666% - #{$default-gutters-width});
        align-self: flex-end;
        position: relative;
}
.article-card__header {
     .article-card__title-link {
        order: 1;
      }
      .article-card__tags-wrapper {
        order: 2;
      }
     }
      .article-card__description {
        width: calc(66.666% - #{$default-gutters-width});
        align-self: flex-end;
        position: relative;
        order: 2;
        margin-top: auto;
        overflow: hidden;
      }
      .article-card__footer {
        width: 100%;
        justify-content: flex-end;
        order: 3;
     }
    }
      }
      }

      @media (max-width: $screen-xl) {
        flex-basis: 100%;
      }
    }
  }

  &--big-main-post {
    .article-card {
      &:first-of-type {
        $ac: '.article-card';

        @media (min-width: $screen-sm) {
          flex-basis: calc(66.666% - #{$default-gutters-width});
          position: relative;
          justify-content: flex-end;

          #{$ac}__tags-wrapper {
            color: #fff;
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
            flex-basis: 100%;
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

        @media (min-width: 1060px) and (max-width: $screen-xl) {
          flex-basis: 100%;
          height: 360px;
        }

        @media (min-width: $screen-sm) and (max-width: $screen-md) {
          height: 360px;
          flex-basis: 100%;
        }
      }
    }
  }
}
</style>
