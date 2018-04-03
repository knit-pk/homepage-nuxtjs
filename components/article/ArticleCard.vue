<template>
<article class="article-card" itemscope itemtype="http://schema.org/Article" v-config>

  <!-- Thumbnail -->
  <router-link class="article-card__thumbnail-link" :to="{ path: code }">
    <img :src="thumbnail" class="article-card__thumbnail" alt="" itemprop="image">
  </router-link>

  <!-- Article horizontal wrapper -->
  <div class="article-card__horizontal-wrapper">

    <!-- Article header -->
    <header class="article-card__header">

      <!-- Article title -->
      <router-link :to="{ path: code }" class="article-card__title-link">
        <h3 ref="articleTitle" class="article-card__title" itemprop="headline"> {{ trimString(title, 75) }} </h3>
      </router-link>

      <!-- Author wrapper -->
      <div class="article-card__author-wrapper" itemprop="author" itemscope itemtype="http://schema.org/Person">

        <!-- Author name -->
        <router-link :to="{ path: code }" class="article-card__author-link">
          <span class="article-card__author-name" itemprop="name"> {{ author.username }} </span>
        </router-link>

        <!-- Author avatar -->
        <router-link :to="{ path: code }" class="article-card__author-avatar-link">
          <img :src="authorAvatar" class="article-card__author-avatar" :alt="author.fullname" itemprop="image">
        </router-link>
      </div>
    </header>
  </div>

  <!-- Article description -->
  <router-link :to="{ path: code }" itemtype="description" class="article-card__description">
    {{ trimString(description, 170) }}
  </router-link>

  <!-- Article footer -->
  <footer class="article-card__footer">
    <time :datetime="publishedAt" itemprop="datePublished"> {{ formatDateToLocalString(publishedAt) }} </time>
    <meta itemprop="dateModified" :content="updatedAt" />


    <!-- Article stats -->
    <ul class="article-card__stats" aria-label="Statystyki">

      <!-- Article likes -->
      <li class="article-card__stats-group">
        <a @click.prevent.stop="handleLikeClick" :class="{ [ 'article-card__like-button--liked' ]: isLiked }" href="#" role="button" class="article-card__like-button"
           title="Lubię to!" aria-label="Polub post" itemprop="interactionStatistic" itemscope itemtype="http://schema.org/InteractionCounter">
          <span class="flaticon-like article-card__stat-icon" aria-hidden="true"></span>
          <span class="visualy-hidden" itemprop="interactionType" content="http://schema.org/LikeAction">Polubienia</span>
          <span itemprop="userInteractionCount"> {{ likesCount }} </span>
        </a>
      </li>

      <!-- Article comments -->
      <li class="article-card__stats-group" itemprop="interactionStatistic" itemscope itemtype="http://schema.org/InteractionCounter">
        <span class="flaticon-chat article-card__stat-icon article-card__comment-icon" title="Komentarze" aria-hidden="true"></span>
        <span class="visualy-hidden" itemprop="interactionType" content="http://schema.org/CommentAction">Komentarze</span>
        <span itemprop="userInteractionCount"> {{ commentsCount }} </span>
      </li>
    </ul>
  </footer>

  <!-- Article meta informations-->
  <ArticlePublisherMeta />
</article>
</template>

<script>
import templateHelper from '~/helpers/template'
import ArticlePublisherMeta from '~/components/article/ArticlePublisherMeta'

// @TODO: Make elipsis overflow in article card description
export default {
  data () {
    return {
      isLiked: false
    }
  },
  components: {
    ArticlePublisherMeta
  },
  props: {
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    author: {
      type: Object,
      required: true
    },
    thumbnail: {
      type: String,
      required: true
    },
    publishedAt: {
      type: String,
      required: true
    },
    updatedAt: {
      type: String,
      required: true
    },
    id: {
      type: String
    },
    code: {
      type: String,
      required: true
    },
    comments: {
      type: Array,
      default: () => []
    },
    commentsCount: {
      type: Number,
      default: 0
    },
    ratings: {
      type: Array,
      default: () => []
    },
    description: {
      type: String,
      required: true
    },
    category: {
      type: Object,
      required: true
    }
  },
  computed: {
    likesCount () {
      return this.ratings.length
    },
    authorAvatar () {
      return this.author.avatar.url
    }
  },
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

  // NOTE: It fixes mainpage card issue, but it may affect to horizontal card
  //       in article list, which is not implemented yet.

  // &__thumbnail-link {
  //   flex: 1 0 33%;
  // }

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
    margin: 13px 0;
    color: $gray-50;
    order: 3;
    flex-basis: 100%;
  }

  &__title {
    min-width: 200px;
    font-weight: 300;
    font-size: 21px;
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
    color: #888888;

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
