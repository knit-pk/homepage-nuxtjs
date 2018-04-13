<template>
  <article v-config class="article" itemtype="http://schema.org/Article" itemscope>
    <!-- article breadcrumbs -->
    <article-breadcrumb :breadcrumbs="breadcrumbs" />

    <!-- article content-->
    <article-content
      :content="content"
      :published-at="publishedAt"
      :updated-at="updatedAt"
      :author="author"
      :title="title"
      :thumbnail="thumbnail"
      :description="description" />

    <!-- article footer -->
    <article-footer
      :author="author"
      :tags="tags"
      :likes-count="likesCount"
      :comments-count="commentsCount" />

    <!-- article comments section -->
    <article-comments :article-id="id" />
  </article>
</template>

<script>
import ArticleBreadcrumb from '~/components/article/ArticleBreadcrumb'
import ArticleComments from '~/components/article/ArticleComments'
import ArticleContent from '~/components/article/ArticleContent'
import ArticleFooter from '~/components/article/ArticleFooter'
import templateHelper from '~/helpers/template'

export default {
  components: {
    ArticleBreadcrumb,
    ArticleComments,
    ArticleContent,
    ArticleFooter,
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
    tags: {
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
    code: {
      type: String,
      required: true,
    },
  },
  data () {
    return {}
  },
  computed: {
    breadcrumbs () {
      return [
        {
          text: 'Strona Główna',
          path: '/',
        },
        {
          text: this.category.name,
          path: `/artykuly/${this.category.code}`,
        },
        {
          text: this.title,
          path: `/artykuly/${this.code}`,
        },
      ]
    },
    likesCount () {
      return this.ratings.length
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
