<template>
  <article v-config class="article-card" itemscope itemtype="http://schema.org/Article">

    <!-- Thumbnail -->
    <router-link :to="{ path: url }" class="article-card__thumbnail-link">
      <img :src="thumbnail" class="article-card__thumbnail" alt="" itemprop="image">
    </router-link>

    <!-- Horizontal wrapper -->
    <div class="article-card__horizontal-wrapper">

      <!-- Header -->
      <header class="article-card__header">

        <!-- Title -->
        <router-link :to="{ path: url }" class="article-card__title-link">
          <h3 ref="articleTitle" class="article-card__title" itemprop="headline"> {{ ellipsis(title, 75) }} </h3>
        </router-link>

        <!-- Tags -->
        <ul class="article-card__tags-wrapper">
          <li v-for="(tag, index) in tags" :key="index" class="article-card__single-tag"> {{ tag.name }} </li>
        </ul>

        <!-- Wrapper -->
        <div class="article-card__author-wrapper" itemprop="author" itemscope itemtype="http://schema.org/Person">

          <!-- Name -->
          <router-link :to="{ path: url }" class="article-card__author-link">
            <span class="article-card__author-name" itemprop="name"> {{ author.username }} </span>
          </router-link>

          <!-- Avatar -->
          <router-link :to="{ path: url }" class="article-card__author-avatar-link">
            <img :src="authorAvatar" :alt="author.fullname" itemprop="image" class="article-card__author-avatar" >
          </router-link>
        </div>
      </header>
    </div>

    <!-- Description -->
    <router-link :to="{ path: url }" itemtype="description" class="article-card__description">
      {{ ellipsis(description, 170) }}
    </router-link>

    <!-- Footer -->
    <footer class="article-card__footer">
      <time :datetime="publishedAt" itemprop="datePublished"> {{ formatDateToLocalString(publishedAt) }} </time>
      <meta :content="updatedAt" itemprop="dateModified">

      <!-- Stats -->
      <ul class="article-card__stats" aria-label="Statystyki">

        <!-- Likes -->
        <li class="article-card__stats-group">
          <a :class="{ [ 'article-card__like-button--liked' ]: isLiked }"
             class="article-card__like-button"
             href="#"
             role="button"
             title="Lubię to!"
             aria-label="Polub post"
             itemprop="interactionStatistic"
             itemscope
             itemtype="http://schema.org/InteractionCounter"
             @click.prevent.stop="handleLikeClick">

            <!-- Likes content -->
            <span class="article-card__stat-icon fas fa-thumbs-up" aria-hidden="true"/>
            <span class="visualy-hidden" itemprop="interactionType" content="http://schema.org/LikeAction"> Polubienia </span>
            <span itemprop="userInteractionCount"> {{ likesCount }} </span>
          </a>
        </li>

        <!-- Comments -->
        <li class="article-card__stats-group" itemprop="interactionStatistic" itemscope itemtype="http://schema.org/InteractionCounter">
          <span class="article-card__stat-icon article-card__comment-icon fas fa-comment-alt" title="Komentarze" aria-hidden="true"/>
          <span class="visualy-hidden" itemprop="interactionType" content="http://schema.org/CommentAction"> Komentarze </span>
          <span itemprop="userInteractionCount"> {{ commentsCount }} </span>
        </li>
      </ul>
    </footer>

    <!-- Meta informations-->
    <ArticlePublisherMeta />
  </article>
</template>

<script>
import templateHelper from '~/helpers/template'
import ArticlePublisherMeta from '~/components/article/ArticlePublisherMeta'

export default {
  components: {
    ArticlePublisherMeta,
  },
  mixins: [templateHelper],
  props: {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: Object,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    publishedAt: {
      type: String,
      required: true,
    },
    updatedAt: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      default: '',
    },
    code: {
      type: String,
      required: true,
    },
    comments: {
      type: Array,
      default: () => [],
    },
    commentsCount: {
      type: Number,
      default: 0,
    },
    ratings: {
      type: Array,
      default: () => [],
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: Object,
      required: true,
    },
    tags: {
      type: Array,
      required: true,
    },
  },
  data () {
    return {
      isLiked: false,
    }
  },
  computed: {
    likesCount () {
      return this.ratings.length
    },
    authorAvatar () {
      return this.author.avatar.url
    },
    url () {
      return `/artykuly/${this.code}`
    },
  },
  methods: {
    handleLikeClick () {
      this.isLiked = !this.isLiked
      document.activeElement.blur()
      // @TODO: Send handling request to the server
    },
  },
}
</script>

<style lang="scss">
@import "assets/scss/_imports";

.article-card {
  background-color: #fff;
  box-sizing: border-box;
  flex-basis: calc(33.333% - #{$default-gutters-width});
  border-radius: $default-blocks-border-radius;
  color: $secondary-text-color;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  font-size: 14px;
  min-height: 260px;

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

    @media (max-width: $screen-sm) {
      padding: 0 15px;
    }
  }

  &__title-link {
    text-decoration: none;
    margin: 4px 0;
    color: $gray-50;
    order: 4;
    flex-basis: 100%;
  }

  &__title {
    min-width: 200px;
    font-weight: 300;
    font-size: 21px;
  }

  &__tags-wrapper {
    color: $primary-text-color;
    margin: 10px 0 0 -2px;
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    flex-basis: 100%;
    order: 3;
  }

  &__single-tag {
    margin: 0 7px 7px 0;
    z-index: 9997;
    border: 1px solid #bbb9b9;
    padding: 5px;
    font-size: 0.8rem;
    flex-wrap: wrap;
    white-space: nowrap;
    border-radius: 7px;
  }

  &__author-wrapper {
    display: flex;
  }

  &__author-link {
    order: 2;
    display: flex;
    align-items: flex-end;
    text-decoration: none;
    color: $secondary-text-color;
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
    display: block;
    padding: 0 20px 15px 20px;
    font-weight: 300;
    font-size: 14px;
    color: #888;

    @media (max-width: $screen-sm) {
      padding: 0 15px 15px 15px;
    }
  }

  &__footer {
    display: flex;
    justify-content: space-between;
    background-color: $article-card-footer-bg-color;
    margin-top: auto;
    padding: 15px 20px;
    font-size: 13px;

    @media (max-width: $screen-sm) {
      padding: 15px;
    }
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
    }

    &--liked {
      color: $article-card-like-button-liked-color;

      &:hover, &:focus {
        color: $article-card-like-button-liked-hover-color;
      }
    }
  }

  &__stat-icon {
    margin-right: 2px;

    &::before {
      font-size: 14px;
    }
  }

  &__comment-icon {
    position: relative;
    top: 2px;
  }
}
</style>
