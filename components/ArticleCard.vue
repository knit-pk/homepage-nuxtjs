<template>
  <article class="article-card">
    <router-link class="article-card__thumbnail-link" :to="{name: 'articles-slug', params: { slug }}">
      <img :src="thumbnail" class="article-card__thumbnail" alt="">
    </router-link>
    <header class="article-card__header">
      <a href="/" class="article-card__title-link">
        <h3 class="article-card__title">{{ title }}</h3>
      </a>
      <a href="/" class="article-card__author-link">
        <span class="article-card__author-name">{{ author.username }}</span>
      </a>
      <a href="#" class="article-card__author-avatar-link">
        <img :src="authorAvatar" class="article-card__author-avatar" :alt="author">
      </a>
    </header>
    <p class="article-card__description">{{ description }}</p>
    <footer class="article-card__footer">
      <time :datetime="publishedAt">{{ formatDateToLocalString(publishedAt) }}</time>
      <ul class="article-card__stats" aria-label="Statystyki">
        <li class="article-card__stats-group">
          <a @click.prevent.stop="handleLikeClick" :class="{ ['article-card__like-button--liked']: isLiked }" href="#" role="button" class="article-card__like-button" title="Lubię to!" aria-label="Polub post">
            <span class="flaticon-like article-card__stat-icon" aria-hidden="true"></span>
            <span class="visualy-hidden">Polubienia</span>
            <span>{{ likesAmount }}</span>
          </a>
        </li>
        <li class="article-card__stats-group">
          <span class="flaticon-chat article-card__stat-icon article-card__comment-icon" title="Komentarze" aria-hidden="true"></span>
          <span class="visualy-hidden">Komentarze</span>
          <span>{{ commentsAmmout }}</span>
        </li>
      </ul>
    </footer>
  </article>
</template>

<script>
import articleFullSchema from '~/schemes/article/full'
import templateHelper from '~/helpers/templateHelper'

// @TODO: Make elipsis overflow in article card description
export default {
  data () {
    return {
      isLiked: false
    }
  },
  computed: {
    likesAmount () {
      return this.likes.length
    },
    commentsAmmout () {
      return this.comments.length
    },
    authorAvatar () {
      return this.author.avatar.url
    }
  },
  props: articleFullSchema.props,
  methods: {
    handleLikeClick () {
      this.isLiked = !this.isLiked
      document.activeElement.blur()
      // @TODO: Send handling request to the server
    }

  },
  mixins: [ templateHelper ]
}
</script>

<style lang="scss">
@import "assets/scss/_imports.scss";

.article-card {
  background-color: #fff;
  // height: 420px;
  box-sizing: border-box;
  flex-basis: calc(33.333% - #{$default-gutters-width});
  border-radius: $default-blocks-border-radius;
  color: $secondary-text-color;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  font-size: 14px;

  &__thumbnail-link {
    display: block;
  }

  &__thumbnail {
    @include img-fluid;
    vertical-align: middle;
    width: 100%;
    height: 200px;
    object-fit: cover;
  }

  &__header {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding: 0 20px;
    margin-top: -26px;
  }

  &__title-link {
    text-decoration: none;
    margin: 13px 0;
    color: $gray-50;
    order: 3;
  }

  &__title {
    min-width: 200px;
    font-weight: 300;
    font-size: 21px;
  }

  &__author-link {
    order: 2;
    display: flex;
    align-items: flex-end;
    text-decoration: none;
    color: $secondary-text-color;

    &:hover,
    &:focus {
      .article-card__author-name {
        // color: $primary-text-color;
        text-decoration: underline
      }
    }
  }

  &__author-avatar-link {
    order: 1;
    display: inline-block;
    border-radius: 50%;
  }

  &__author-avatar {
    width: 52px;
    height: 52px;
    display: block;
    border-radius: 50%;
    border: 2px solid #fff;
    margin-right: 5px;
    object-fit: cover;
  }

  &__description {
    padding: 0 20px 15px 20px;
    font-weight: 300;
    font-size: 14px;
    color: #888888;
  }

  &__footer {
    display: flex;
    justify-content: space-between;
    background-color: $article-card-footer-bg-color;
    margin-top: auto;
    padding: 15px 20px;
    font-size: 13px;
  }

  &__stats {
    display: flex;
    list-style: none;
  }

  &__stats-group {
    display: flex;
    margin-left: 13px;
    align-items: center;
  }

  &__like-button {
    color: $article-card-text-color;
    text-decoration: none;
    transition: color 0.1s ease-in-out;

    &:hover, &:focus {
      color: $article-card-like-button-hover-color;
    // color: $article-card-text-color;

    }

    &--liked {
      color: $article-card-like-button-liked-color;

      &:hover, &:focus {
         color: $article-card-like-button-liked-hover-color;
      // color: $article-card-like-button-liked-color;

      }
    }
  }

  &__stat-icon {
    margin-right: 2px;

    &:before {
      font-size: 14px;
    }
  }

  &__comment-icon {
    position: relative;
    top: 2px;
  }
}
</style>
