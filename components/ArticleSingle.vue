<template>
  <article class="article">
    <article-content/>
    <article-footer/>
    <article-comments/>
  </article>
</template>

<script>
import ArticleContent from '~/components/partials/ArticleContent'
import ArticleFooter from '~/components/partials/ArticleFooter'
import ArticleComments from '~/components/ArticleComments'
import templateHelper from '~/helpers/templateHelper'
import articleSchema from '~/schemes/article'

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
    time () {
      return this.publishedAt || this.createdAt
    }
  },
  components: {
    ArticleContent,
    ArticleFooter,
    ArticleComments
  },
  props: articleSchema.props,
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

.article {
  margin-right: $default-gutters-width;
  margin-left: 40px;
}
</style>
