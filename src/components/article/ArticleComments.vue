<template>
  <section v-config>
    <!-- Single comment -->
    <article-comment
      v-for="(element, index) in comments"
      :key="index"
      :author="element.author.fullname"
      :avatar-url="element.author.avatar.url"
      :created-at="element.createdAt"
      :content="element.text"
      :replies-amount="element.replies.length"
      :parent-id="element.id"
      :is-parent="true"
      @clicked-load-replies="getReplies">

      <!-- Subcomments -->
      <div v-if="element.areRepliesExpanded">
        <article-comment
          v-for="(element, index) in element.replies"
          :key="index"
          :author="element.author.fullname"
          :avatar-url="element.author.avatar.url"
          :created-at="element.createdAt"
          :content="element.text"
          :is-parent="false"/>
      </div>
    </article-comment>

    <!-- Fetch more comments -->
    <knit-button
      v-if="commentsAmount < totalItems"
      :button-classes="['knit-button--big', 'article-comments__load-button']"
      @click.native="onLoadCommentsClick()">
      Załaduj więcej
    </knit-button>
  </section>
</template>

<script>
import ArticleComment from '~/components/article/ArticleComment'
import KnitButton from '~/components/commons/KnitButton'
import KnitService from '~/services/knitService'
import _ from 'lodash'

export default {
  components: {
    ArticleComment,
    KnitButton,
  },
  mixins: {},
  props: {
    articleId: {
      type: String,
      required: true,
    },
  },
  data () {
    return {
      limit: 2,
      comments: [],
      page: 0,
      totalItems: 0,
    }
  },
  computed: {
    commentsAmount () {
      return this.comments.length
    },
  },
  beforeMount () {
    this.getCommentsPage()
      .then(data => {
        this.totalItems = data['hydra:totalItems']
      })
  },
  methods: {
    onLoadCommentsClick () {
      document.activeElement.blur()
      this.getCommentsPage()
    },
    getCommentsPage () {
      const qsObject = {
        group: ['UserReadLess'],
        limit: this.limit,
        'article.id': this.articleId,
        'order[createdAt]': 'DESC',
      }

      if (!_.isEmpty(this.comments)) {
        const date = this.comments[this.commentsAmount - 1].createdAt
        _.assign(qsObject, { 'createdAt[strictly_before]': date })
      }

      return KnitService.getCollection(this.$axios, 'comments', qsObject)
        .then(data => {
          const comments = _.map(data['hydra:member'], comment => {
            comment.areRepliesExpanded = false
            return comment
          })

          this.comments = [...this.comments, ...comments]
          this.page++

          return data
        })
    },
    getReplies (commentId) {
      const qsObject = {
        'comment.id': commentId,
        'order[createdAt]': 'ASC',
        group: ['UserReadLess'],
      }

      KnitService.getCollection(this.$axios, 'comment_replies', qsObject)
        .then(data => {
          const index = _.findIndex(this.comments, comment => comment.id === commentId)
          this.comments[index].replies = data['hydra:member']
          this.comments[index].areRepliesExpanded = true
        })
    },
  },
}
</script>

<style lang="scss">
@import "src/assets/scss/_imports";

.article-comments {
  &__load-button {
    display: block;
    margin: 0 auto;
    margin-top: 20px;
  }
}

.article-subcomments {
  flex-basis: 100%;
  margin: 40px 0 0 60px;
  border-left: 2px solid #ddd;

  .article-comment {
    padding: 0 30px 0 20px;
    margin-bottom: 40px;
  }

  .article-comment__author-avatar {
    width: 35px;
    height: 35px;
  }
}
</style>
