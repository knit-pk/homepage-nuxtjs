<template>
  <section :class="['article-card-list']" v-config>
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
    <div v-if="showMore && isNext && !loading" class="more-wrapper">
      <button type="button" @click="getPage({ page: page+1, 'category.code': listCode })">
        <span class="flaticon-arrow-down"></span>
        Więcej
      </button>
    </div>
  </section>
</template>

<script>
  import ArticleCard from '~/components/article/ArticleCard'
  import { mapActions, mapGetters } from 'vuex'
  import _ from 'lodash'
  const storePath = 'articles/list'
  export default {
    props: ['showMore'],
    data () {
      return {}
    },
    computed: {
      cardsArticles () {
        let articles
        if (this.showMore || this.articles.length <= 5) {
          articles = Object.values(this.articles)
        } else {
          articles = _.slice(Object.values(this.articles), 0, 5)
        }
        return articles
      },
      ...mapGetters({
        articles: `${storePath}/articles`,
        loading: `${storePath}/loading`,
        page: `${storePath}/page`,
        isNext: `${storePath}/isNext`,
        listCode: `${storePath}/listCode`
      })
    },
    methods: mapActions({
      getPage: `${storePath}/getArticleList`
    }),
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
    .more-wrapper {
      width: 100%;
      text-align: center;
      margin: 25px 0px 40px;
      button {
        background: #f5f5f5;
        color: #666;
        padding: 8px 25px 8px 23px;
        border: 1px solid #888;
        border-radius: 5px;
        font-size: 13px;
        cursor: pointer;
        &:focus {
          outline: none;
        }
        span:before {
          font-size: 13px;
          color: #5786ba;
        }
      }
    }
  }

  &--big-main-post {
    @media (max-width: $screen-sm) {
      padding: 0 10px;
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

    &--horizontal-fixed {
      @media (min-width: $screen-xl) {
        flex-direction: row;
        .article-card:nth-of-type(n+3) {
          flex-direction: row;
          flex-basis: calc(100% - #{$default-gutters-width});
          .article-card__header {
            flex-direction: column;
            padding: 30px 0 0 20px;
          }
          .article-card__author-link {
            position: absolute;
            left: 80px;
            top: 35px;
          }
          .article-card__thumbnail-link {
            flex: 1 0 33%;
          }
          .article-card__horizontal-wrapper {
            flex: 1 0 66%;
          }
          .article-card__footer {
            justify-content: flex-end;
            width: 100%;
          }
          .article-card__author-link {
            position: absolute;
            left: 74px;
            bottom: 14px;
          }
          .article-card__author-avatar-link {
            position: absolute;
            left: 15px;
            bottom: 18px;
          }
        }
      }
    }

    .article-card {
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

      &:first-of-type {
        $ac: '.article-card';

        @media (min-width: $screen-sm) {
          flex-basis: calc(66.666% - #{$default-gutters-width});
          position: relative;
          justify-content: flex-end;

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
</style>
