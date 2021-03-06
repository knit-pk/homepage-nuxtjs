<template>
  <div v-config class="article-content">

    <!-- Header -->
    <header class="article-content__header">
      <img :src="thumbnail" class="article-content__thumbnail" itemprop="image">
      <div class="article-content__header-info">

        <!-- Title -->
        <h2 class="article-content__title" itemprop="headline"> {{ ellipsify(title, 110) }} </h2>
        <div class="article-content__pub-info">

          <!-- Author avatar -->
          <router-link to="/" class="article-content__author-avatar-link">
            <img :src="author.avatar.url" :alt="author.fullname" class="article-content__author-avatar">
          </router-link>
          <div>
            <router-link to="/" class="article-content__author-fullname"> {{ author.fullname }} </router-link>
            <time :datetime="publishedAt" class="article-content__pub-date" itemprop="datePublished">
              {{ publicationDate }}
            </time>
            <meta :content="updatedAt" itemprop="dateModified">
          </div>
        </div>
      </div>
    </header>

    <!-- Body -->
    <vue-markdown :source="content" class="article-content__body"/>

    <!-- Meta -->
    <link :href="mainEntityOfPage" itemprop="mainEntityOfPage">
    <meta :content="description" itemprop="description">

    <!-- Publisher meta -->
    <ArticlePublisherMeta />
  </div>
</template>

<script>
import ArticlePublisherMeta from '~/components/article/ArticlePublisherMeta'
import templateHelper from '~/helpers/template'
import VueMarkdown from 'vue-markdown'

export default {
  components: {
    VueMarkdown,
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
    description: {
      type: String,
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
  },
  data () {
    return {}
  },
  computed: {
    publicationDate () {
      return this.formatDateToLocalString(this.publishedAt)
    },
    mainEntityOfPage () {
      if (process.BROWSER_BUILD) {
        return `${window.location.hostname}${this.$route.path}`
      }
    },
  },
  methods: {},
}
</script>

<style lang="scss">
@import "src/assets/scss/_imports";

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
    font-size: 1.9rem;

    @media (max-width: $screen-md) {
      padding: 25px 20px;
    }

    @media (max-width: $screen-sm) {
      padding: 15px 20px;
      font-size: 1.75rem;
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
      text-align: initial;
    }

    a {
      @include link;
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

    ul {
      list-style: none;

      li {
        position: relative;

        &::before {
          content: "•";
          font-size: 1.5rem;
          position: absolute;
          left: -30px;
          top: 0; // can destroy someting, don't know where to find and test it
        }
      }
    }

    ol {
      list-style-type: decimal;
      margin-left: -13px;

      li {
        position: relative;

        br {
          display: block;
          padding: 5px 0;
          content: " ";
        }
      }
    }

    ul, ol {
      padding: 0 0 10px 35px;

      li {
        padding: 5px 0;

        ul, ol {
          padding: 5px 0 0 35px;
        }
      }
    }

    table {
      color: $table-bg-color;
      border-collapse: collapse;
      border-spacing: 0;
      margin: 0 auto;
    }

    td, th {
      border: 1px solid $table-border-color;
      height: 30px;
      padding: 0 8px;
    }

    th {
      background: $table-header-color;
      font-weight: bold;
    }

    td {
      background: $table-data-color;
      text-align: center;
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

      &::before {
        content: '';
        background-color: $blockquoute-decor-color;
        height: 100%;
        position: absolute;
        width: 4px;
        top: 1px;
        left: 0; // same as above, can destroy something
      }
    }

    img {
      @include img-fluid;
      min-width: 80%;
      padding-top: 20px;
      display: block;
      margin: 0 auto;
    }

    img + em,
    img + br + em {
      margin: 0 auto;
      display: block;
      text-align: center;
      font-size: 0.9rem;
    }

    pre {
      overflow: auto;
      margin: 8px 0;
      display: flex;
      padding: 5px;
      background-color: $code-bg-color;

      code {
        max-width: 50vw;
      }
    }
  }
}
</style>
