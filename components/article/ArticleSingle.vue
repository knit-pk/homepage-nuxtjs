<template>
  <article class="article">
    <!-- article breadcrumbs -->
    <article-breadcrumb/>

    <!-- article content-->
    <article-content
      :content="content"
      :published-at="publishedAt"
      :author="author"
      :title="title"
      :thumbnail="thumbnail"/>

    <!-- article footer -->
    <article-footer
      :author="author"
      :likes="likes"
      :comments-count="commentsCount"/>

    <!-- article comments section -->
    <article-comments :articleId="id"/>
  </article>
</template>

<script>
import ArticleBreadcrumb from '~/components/article/ArticleBreadcrumb'
import ArticleComments from '~/components/article/ArticleComments'
import ArticleContent from '~/components/article/ArticleContent'
import ArticleFooter from '~/components/article/ArticleFooter'
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
