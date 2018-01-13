<template>
  <section>
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

        <div v-if="element.isRepliesExpanded">
          <article-comment v-for="(element, index) in element.replies" :key="index"
                           :author="element.author.fullname"
                           :avatar-url="element.author.avatar.url"
                           :created-at="element.createdAt"
                           :content="element.text"
                           :is-parent="false">
          </article-comment>
        </div>
      </article-comment>

      <knit-button v-if="commentsAmount < totalItems" @click.native="onLoadCommentsClick()" 
                   :buttonClasses="['knit-button--big', 'article-comments__load-button']">Załaduj więcej</knit-button>
  </section>
</template>

<script>
  import ArticleComment from '~/components/partials/ArticleComment.vue'
  import KnitButton from '~/components/KnitButton.vue'
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
        const date = _.isEmpty(this.comments) ? new Date().toISOString() : this.comments[this.commentsAmount - 1].createdAt

        const qsObject = {
          group: ['UserReadLess'],
          limit: this.limit,
          'article.id': this.articleId,
          'createdAt[strictly_before]': date,
          'order[createdAt]': 'DESC'
        }

        _.isEmpty()

        return KnitService.getCollection(this.$axios, 'comments', qsObject)
          .then(data => {
            const comments = data['hydra:member']

            _.map(comments, comment => {
              comment.isRepliesExpanded = false
              return comment
            })

            this.comments = [...this.comments, ...comments]
            this.page++

            console.log(data)

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
            this.comments[index].isRepliesExpanded = true

            console.log(data)
          })
      }
    },
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

  .article-comment {
    background-color: #fff;
    border-radius: $default-blocks-border-radius;
    // padding: 20px 40px;
    // display: flex;
    // font-weight: 300;
    // flex-wrap: wrap;
    padding: 20px 40px;
    font-size: 15px;

    &__inner {
      display: flex;
      font-weight: 300;
    }

    // color: #999;
    // font-size: 0.95rem;

    &__avatar-link {
      align-self: flex-start;
      border-radius: 50%;
      display: block;
      margin-right: 15px;
    }

    &__author-avatar {
      width: 45px;
      height: 45px;
      object-fit: cover;
      border-radius: 50%;
    }

    &__right-side {
      flex: 1;
    }

    &__meta {
      display: flex;
      justify-content: space-between;
      padding-bottom: 20px;
    }

    &__author-name {
      color: $primary-text-color;
      font-weight: 400;
    }

    &__datetime {
      font-size: 0.8rem;
    }

    &__content {
      > p {
        margin-bottom: 20px;
      }

      > pre {
        display: block;
        padding: 12px 15px;
        margin: 5px 0 20px 0;
        font-size: 13px;
        line-height: 1.42857143;
        color: #333;
        word-break: break-all;
        word-wrap: break-word;
        background-color: #f5f5f5;
        border: 1px solid #ccc;
        border-radius: 3px;

        > code {
          padding: 0;
          font-size: inherit;
          color: inherit;
          white-space: pre-wrap;
          background-color: transparent;
          border-radius: 0;
        }
      }
    }

    &__replies-link {
      color: $article-comment-replies-link-color;
      display: block;
      margin-top: 10px;
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