<template>
<span>{{title}}</span>
</template>

<script>
import templateHelper from '~/helpers/templateHelper'
import articleSchema from '~/schemes/article'

export default {
  data () {
    return {
      isLiked: false
    }
  },
  computed: {
    likesAmount () {
      return this.likes.length
    },
    commentsAmmout () {
      return this.comments.length
    },
    time () {
      return this.publishedAt || this.createdAt
    }
  },
  props: articleSchema.props,
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

</style>
