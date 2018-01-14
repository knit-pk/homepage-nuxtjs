<template>
  <article class="article-comment">
      <div class="article-comment__inner">
        <a href="#" class="article-comment__avatar-link">
          <img :src="avatarUrl" class="article-comment__author-avatar" :alt="author">
        </a>
        <div class="article-comment__right-side">
          <header class="article-comment__meta">
            <h4><a href="#" class="article-comment__author-name">{{ author }}</a></h4>
            <time :datetime="createdAt" class="article-comment__datetime">{{ formatDateToLocalString(createdAt) }}</time>
          </header>
          <p class="article-comment__content">{{ content }}</p>
          <a v-if="isParent" @click.prevent="handleLoadRepliesClick(parentId)" 
            href="#" class="article-comment__replies-link">{{ loadRepliesLinkLabel }}</a>
          <!-- <a v-else-if="repliesAmount > 0" @click.prevent="handleLoadRepliesClick(parentId)" 
            href="#" class="article-comment__replies-link">Zobacz wszystkie {{ repliesAmount }} odpowiedzi</a> -->
        </div>
      </div>
      <section v-if="areRepliesExpanded" class="article-subcomments">
        <h5 class="visualy-hidden">{{ repliesAmount }} odpowiedzi</h5>
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

</style>

