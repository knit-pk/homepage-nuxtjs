<template>
  <article class="article" v-config>
    <!-- article breadcrumbs -->
    <article-breadcrumb :breadcrumbs="breadcrumbs"/>

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
      :tags="tags"
      :likes-count="likesCount"
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

const makeArticleBreadcrumbs = (code, title) => [
  {
    text: 'Strona główna',
    path: '/'
  },
  {
    text: 'Artykuły',
    path: '/articles'
  },
  {
    text: title,
    path: `/articles/${code}`
  }
]

export default {
  data () {
    return {}
  },
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
    ratings: {
      type: Array,
      default: () => []
    },
    tags: {
      type: Array,
      default: () => []
    },
    description: {
      type: String,
      required: true
    }
  },
  computed: {
    breadcrumbs () {
      return makeArticleBreadcrumbs(this.slug, this.title)
    },
    likesCount () {
      return this.ratings.length
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
