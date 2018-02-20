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
    },
    likes: {
      type: Array,
      default: () => []
    },
    id: {
      type: String
    },
    slug: {
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
    description: {
      type: String,
      required: true
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
