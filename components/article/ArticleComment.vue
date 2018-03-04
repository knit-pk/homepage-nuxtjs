<template>
  <article class="article-comment" v-config>
      <div class="article-comment__inner">
        <a href="#" class="article-comment__avatar-link">
          <img :src="avatarUrl" class="article-comment__author-avatar" :alt="author">
        </a>
        <div class="article-comment__right-side">
          <header class="article-comment__meta">
            <h4><a href="#" class="article-comment__author-name"> {{ author }} </a></h4>
            <time :datetime="createdAt" class="article-comment__datetime"> {{ formatDateToLocalString(createdAt) }} </time>
          </header>
          <p class="article-comment__content"> {{ content }} </p>
          <a v-if="isParent" @click.prevent="handleLoadRepliesClick(parentId)"
             href="#" class="article-comment__replies-link"> {{ loadRepliesLinkLabel }} </a>
        </div>
      </div>
      <section v-if="areRepliesExpanded" class="article-subcomments">
        <h5 class="visualy-hidden"> {{ repliesAmount }} odpowiedzi </h5>
        <slot></slot>
      </section>
    </article>
</template>

<script>
import templateHelper from '~/helpers/templateHelper'

export default {
  data () {
    return {
      areRepliesExpanded: false,
      areRepliesFetched: false
    }
  },
  components: {},
  props: {
    avatarUrl: {
      type: String,
      required: true
    },
    author: {
      type: String,
      required: true
    },
    createdAt: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    repliesAmount: {
      type: Number,
      default: 0
    },
    parentId: {
      type: String
    },
    isParent: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    loadRepliesLinkLabel () {
      if (this.repliesAmount === 1) {
        return this.areRepliesExpanded ? 'Ukryj odpowiedź' : 'Pokaż odpowiedź'
      } else if (this.repliesAmount > 0) {
        return this.areRepliesExpanded ? 'Ukryj odpowiedzi' : `Pokaż wszystkie ${this.repliesAmount} odpowiedzi`
      }
    }
  },
  methods: {
    handleLoadRepliesClick (parentId) {
      if (!this.areRepliesFetched) {
        this.$emit('clicked-load-replies', parentId)
        this.areRepliesFetched = true
      }

      this.areRepliesExpanded = !this.areRepliesExpanded
    }
  },
  mixins: [ templateHelper ]
}
</script>

<style lang="scss">
@import "assets/scss/_imports.scss";

  .article-comment {
    background-color: #fff;
    border-radius: $default-blocks-border-radius;
    padding: 20px 40px;
    font-size: 15px;

    &__inner {
      display: flex;
      font-weight: 300;
    }

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
</style>
