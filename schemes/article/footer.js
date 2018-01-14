export default {
  props: {
    likes: {
      type: Array,
      default: () => []
    },
    commentsCount: {
      type: Number,
      default: 0
    },
    author: {
      type: Object,
      required: true
    }
  }
}
