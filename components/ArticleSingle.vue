<template>
  <article class="article">
    <article-breadcrumb/>

    <article-content
      :content="content"
      :published-at="publishedAt"
      :author="author"
      :title="title"
      :thumbnail="thumbnail"/>

    <article-footer
      :author="author"
      :likes="likes"
      :comments="comments"/>
    <article-comments/>
  </article>
</template>

<script>
import ArticleBreadcrumb from '~/components/partials/ArticleBreadcrumb'
import ArticleComments from '~/components/partials/ArticleComments'
import ArticleContent from '~/components/partials/ArticleContent'
import ArticleFooter from '~/components/partials/ArticleFooter'
import articleFullSchema from '~/schemes/article/full'
import templateHelper from '~/helpers/templateHelper'

export default {
  data () {
    return {}
  },
  computed: {},
  components: {
    ArticleBreadcrumb,
    ArticleComments,
    ArticleContent,
    ArticleFooter
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

.article {
  margin-right: $default-gutters-width;
  margin-left: 40px;
}
</style>
