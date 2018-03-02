<template>
  <div class="article-content">
    <header class="article-content__header">
      <img :src="thumbnail" class="article-content__thumbnail"/>
      <div class="article-content__header-info">
        <h2 class="article-content__title"> {{ title }} </h2>
        <div class="article-content__pub-info">
          <router-link to="/" class="article-content__author-avatar-link">
            <img class="article-content__author-avatar" :src="author.avatar.url" :alt="author.fullname"/>
          </router-link>
          <div>
            <router-link to="/" class="article-content__author-fullname"> {{ author.fullname }} </router-link>
            <time :datetime="publicationDate" class="article-content__pub-date"> {{ publicationDate }} </time>
          </div>
        </div>
      </div>
    </header>
    <vue-markdown class="article-content__body" :source="content"/>
  </div>
</template>

<script>
import templateHelper from '~/helpers/templateHelper'
import VueMarkdown from 'vue-markdown'

export default {
  data () {
    return {}
  },
  components: {
    VueMarkdown
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
      default: '',
      required: true
    }
  },
  computed: {
    publicationDate () {
      return this.formatDateToLocalString(this.publishedAt)
    }
  },
  methods: {},
  mixins: [ templateHelper ]
}
</script>

<style lang="scss">
@import "assets/scss/_imports.scss";

.article-content {
  background-color: $article-content-bg-color;

  &__thumbnail {
    @include img-fluid;
    min-width: 100%;
    object-fit: cover;
    height: 500px;
    padding: 10px;

    @media (max-width: $screen-md) {
      height: 400px;
      padding: 8px;
    }

    @media (max-width: $screen-sm) {
      height: 300px;
      padding: 0;
    }
  }

  &__header-info {
    display: flex;
    flex-direction: column;
  }

  &__title {
    order: 2;
    padding: 30px 35px;
    font-weight: normal;
    font-size: 1.90rem;

    @media (max-width: $screen-md) {
      padding: 25px 20px;
    }

    @media (max-width: $screen-sm) {
      padding: 15px 20px;
    }
  }

  &__pub-info {
    display: flex;
  }

  &__pub-details {
    display: flex;
    color: $primary-text-color;
  }

  &__pub-date {
    display: block;
    padding-top: 3px;
    margin-left: 20px;
    font-size: 0.85rem;
    font-weight: 300;

    @media (max-width: $screen-sm) {
      margin-left: 15px;
      font-size: 0.75rem;
    }
  }

  &__author-fullname {
    padding: 20px 0 0 20px;
    display: block;
    font-weight: normal;
    font-size: 1.5rem;
    color: $primary-text-color;

    &:hover,
    &:focus {
      color: lighten($primary-text-color, 25%);
    }

    @media (max-width: $screen-sm) {
      font-size: 1.1rem;
      padding: 10px 0 0 15px;
    }
  }

  &__author-avatar-link {
    display: inline-block;
    border-radius: 50%;
    margin-top: -35px;
    padding-left: 30px;
    align-self: flex-start;

    @media (max-width: $screen-md) {
      padding-left: 20px;
      margin-top: -25px;
    }
  }

  &__author-avatar {
    border: 3px solid $author-avatar-border-color;
    border-radius: 50%;
    object-fit: cover;
    height: 120px;
    width: 120px;

    @media (max-width: $screen-md) {
      height: 90px;
      width: 90px;
    }

    @media (max-width: $screen-sm) {
      height: 75px;
      width: 75px;
    }
  }

  &__body {
    padding: 0 30px 30px 30px;
    overflow: auto;
    text-align: justify;

    @media (max-width: $screen-md) {
      padding: 0 20px 30px 20px;
    }

    @media (max-width: $screen-sm) {
      padding: 0 15px 15px 15px;
    }

    p {
      padding: 10px 0;
      line-height: 1.55;
    }

    h1, h2, h3, h4, h5 {
      padding: 15px 0;
      font-weight: normal;
      font-size: 1.5rem;
    }

    ul, ol {
      padding: 0 30px 10px 35px;
      list-style: none;
    }

    li {
      padding: 5px 0;
      position: relative;

      &:before {
        content: "•";
        font-size: 1.5rem;
        position: absolute;
        left: -30px;
        top: 0px;
      }
    }

    code {
      background-color: $code-bg-color;
      padding: 0 3px;
      color: $body-code-color;
    }

    blockquote {
      margin: 30px 0 20px 0;
      padding: 5px 20px;
      font-style: italic;
      position: relative;

      &:before {
        content: '';
        background-color: $blockquoute-decor-color;
        height: 100%;
        position: absolute;
        width: 4px;
        top: 1px;
        left: 0px;
      }
    }

    img {
      @include img-fluid;
      min-width: 80%;
      padding-top: 20px;
      display: block;
      margin: 0 auto;
    }

    img + br + em, img + em {
      margin: 0 auto;
      display: block;
      text-align: center;
      font-size: 0.90rem;
    }

    pre {
      overflow: auto;
      margin: 8px 0;
      display: flex;
      padding: 15px;
      background-color: $code-bg-color;

      code {
        max-width: 50vw;
      }
    }
  }
}
</style>
