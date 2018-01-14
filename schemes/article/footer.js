export default {
  props: {
    likes: {
      type: Number,
      default: 0
    },
    comments: {
      type: Number,
      default: 0
    },
    author: {
      type: Object,
      required: true
    }
  }
}
