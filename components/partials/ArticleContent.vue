<template>
  <div class="article-content" style="background-color: white;">
    <header class="article-content__header">
      <img :src="thumbnail" class="article-content__thumbnail"/>
      <div class="article-content__pub-info">
        <h2 class="article-content__title"> {{ title }} </h2>
        <div class="article-content__pub-details">
          <img class="article-content__author-avatar" :src="author.avatar.url" title="Avatar" alt="Autor artykułu"/>
          <div class="article-content__pub-details-block">
          <!-- @TODO: Change to author.fullname -->
            <h3 class="article-content__author-fullname"> {{ author.username }} </h3>
            <span class="article-content__pub-date"> {{ publicationDate }} </span>
          </div>
        </div>
      </div>
    </header>
    <vue-markdown class="article-content__body" :source="content" :postrender="articlePostRender">
    </vue-markdown>
  </div>
</template>

<script>
import articleContentSchema from '~/schemes/article/content'
import templateHelper from '~/helpers/templateHelper'
import ch from '~/helpers/commonHelper'
import VueMarkdown from 'vue-markdown'
import _ from 'lodash'

const mdRegexps = {
  imageRegex: /img src=".+"/g,
  paragraphRegex: /<p(?!r)/g,
  listItemRegex: /<li/g,
  headingRegex: /<h2/g,
  codeRegex: /<code/g,
  preRegex: /<pre/g,
  listRegex: /<ul/g
}

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
  methods: {
    articlePostRender: _.flow([
      ch.beautifyMd(mdRegexps.paragraphRegex, 'class="article-content__body-paragraph"'),
      ch.beautifyMd(mdRegexps.listItemRegex, 'class="article-content__body-list-item"'),
      ch.beautifyMd(mdRegexps.headingRegex, 'class="article-content__body-heading"'),
      ch.beautifyMd(mdRegexps.listRegex, 'class="article-content__body-list"'),
      ch.beautifyMd(mdRegexps.codeRegex, 'class="article-content__body-code"'),
      ch.beautifyMd(mdRegexps.preRegex, 'class="article-content__body-pre"'),
      ch.beautifyMd(mdRegexps.imageRegex, 'class="img-fluid"')
    ])
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
  &__thumbnail {
    @include img-fluid;
  }

  &__pub-info {
    display: flex;
    flex-direction: column;
  }

  &__title {
    order: 2;
    padding: 20px 0 20px 15px;
    margin-left: 15px;
    font-weight: normal;
    font-size: 2rem;
  }

  &__pub-details {
    display: flex;
  }

  &__pub-date {
    display: block;
    padding: 3px 0 0 20px;
    font-size: 0.85rem;
    font-weight: 100;
  }

  &__author-fullname {
    padding: 20px 0 0 20px;
    font-weight: normal;
    font-size: 1.5rem;
  }

  &__author-avatar {
    border: 3px solid white;
    margin-top: -35px;
    margin-left: 30px;
    border-radius: 100%;
    width: auto;
    height: 120px;
  }

  &__body {
    padding: 0 30px 10px 30px;
  }

  &__body-paragraph {
    padding: 10px 0;
  }

  &__body-heading {
    padding: 20px 0 5px 0;
    font-weight: normal;
  }

  &__body-list {
    padding: 0 30px 10px 35px;
    list-style: none;
  }

  &__body-list-item {
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

  &__body-code {
    background-color: #f2f2f2;
    padding: 0 1px;
    color: #111111;
  }

  &__body-pre {
    margin: 8px 0;
    padding: 15px;
    background-color: #f2f2f2;
  }
}
</style>
