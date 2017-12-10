<template>
  <div class="article-content">
    <header class="article-content__header">
      <img :src="thumbnail" class="article-content__thumbnail"/>
      <div class="article-content__pub-info">
        <h2 class="article-content__title"> {{ title }} </h2>
        <router-link to="/" class="article-content__pub-details">
          <img class="article-content__author-avatar" :src="author.avatar.url" :alt="author.fullname"/>
          <div class="article-content__pub-details-block">
            <span class="article-content__author-fullname"> {{ author.fullname }} </span>
            <span class="article-content__pub-date"> {{ publicationDate }} </span>
          </div>
        </router-link>
      </div>
    </header>
    <vue-markdown class="article-content__body" :source="content"/>
  </div>
</template>

<script>
import articleContentSchema from '~/schemes/article/content'
import templateHelper from '~/helpers/templateHelper'
import VueMarkdown from 'vue-markdown'
import _ from 'lodash'

export default {
  data () {
    return {}
  },
  computed: {
    publicationDate () {
      const date = new Date(this.publishedAt)
      const month = _.capitalize(date.toLocaleString('pl', { month: 'long' }))
      const day = date.toLocaleString('pl', { day: 'numeric' })
      const year = date.toLocaleString('pl', { year: 'numeric' })

      return `${month} ${day}, ${year}`
    }
  },
  mixins: [ templateHelper ],
  components: {
    VueMarkdown
  },
  props: articleContentSchema.props
}
</script>

<style lang="scss">
@import "assets/scss/_imports.scss";

.article-content {
  background-color: $article-content-bg-color;

  &__thumbnail {
    @include img-fluid;
    padding: 10px;
  }

  &__pub-info {
    display: flex;
    flex-direction: column;
  }

  &__title {
    order: 2;
    padding: 20px 0 5px 15px;
    margin-left: 15px;
    font-weight: normal;
    font-size: 2rem;
  }

  &__pub-details {
    display: flex;
    color: $primary-text-color;
  }

  &__pub-date {
    display: block;
    padding: 3px 0 0 20px;
    font-size: 0.85rem;
    font-weight: 100;
  }

  &__author-fullname {
    padding: 20px 0 0 20px;
    display: block;
    font-weight: normal;
    font-size: 1.5rem;
  }

  &__author-avatar {
    border: 3px solid $author-avatar-border-color;
    margin-top: -35px;
    margin-left: 30px;
    border-radius: 100%;
    width: auto;
    height: 120px;
  }

  &__body {
    padding: 0 30px 30px 30px;
    text-align: justify;

    p {
      padding: 10px 0;
      line-height: 1.55;
    }

    h1, h2, h3 {
      padding: 25px 0 5px 0;
      font-weight: normal;
      font-size: 1.5rem;
    }

    ul {
      padding: 0 30px 10px 35px;
      list-style: none;
    }

    li {
      padding: 5px 0;
      position: relative;

      &:before {
        content:"•";
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
      padding-top: 20px;
    }

    img + br + em, img + em {
      margin: 0 auto;
      display: block;
      text-align: center;
      font-size: 0.90rem;
    }

    pre {
      margin: 8px 0;
      padding: 15px;
      background-color: $code-bg-color;
    }
  }
}
</style>
