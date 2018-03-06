<template>
<section v-config>
  <h3>Liczba komentarzy</h3>
  <form action="">
    <input type="text">
  </form>
    <article-comment v-for="(element, index) in comments" :key="index"
                      :author="element.author.fullname"
                      :avatar-url="element.author.avatar.url"
                      :created-at="element.createdAt"
                      :content="element.text"
                      :replies-amount="element.replies.length"
                      :parent-id="element.id"
                      :is-parent="true"
                      @clicked-load-replies="getReplies">

      <div v-if="element.areRepliesExpanded">
        <article-comment v-for="(element, index) in element.replies" :key="index"
                          :author="element.author.fullname"
                          :avatar-url="element.author.avatar.url"
                          :created-at="element.createdAt"
                          :content="element.text"
                          :is-parent="false"/>
      </div>
    </article-comment>

    <knit-button v-if="commentsAmount < totalItems" @click.native="onLoadCommentsClick()"
                  :buttonClasses="['knit-button--big', 'article-comments__load-button']">
                  Załaduj więcej
    </knit-button>
</section>
</template>

<script>
import ArticleComment from '~/components/article/ArticleComment.vue'
import KnitButton from '~/components/commons/KnitButton.vue'
import KnitService from '~/services/knitService'
import _ from 'lodash'

export default {
  data () {
    return {
      limit: 2,
      comments: [],
      page: 0,
      totalItems: 0
    }
  },
  components: {
    ArticleComment,
    KnitButton
  },
  props: {
    articleId: {
      type: String,
      required: true
    }
  },
  computed: {
    commentsAmount () {
      return this.comments.length
    }
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
        'order[createdAt]': 'DESC'
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
        group: ['UserReadLess']
      }

      KnitService.getCollection(this.$axios, 'comment_replies', qsObject)
        .then(data => {
          const index = _.findIndex(this.comments, comment => comment.id === commentId)
          this.comments[index].replies = data['hydra:member']
          this.comments[index].areRepliesExpanded = true
        })
    }
  },
  mixins: {},
  beforeMount () {
    this.getCommentsPage()
      .then(data => {
        this.totalItems = data['hydra:totalItems']
      })
  }
}
</script>

<style lang="scss">
@import "assets/scss/_imports.scss";

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
  border-left: 2px solid #dddddd;

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
