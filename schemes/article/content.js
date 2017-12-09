export default {
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
    }
  }
}
