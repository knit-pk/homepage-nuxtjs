export default {
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
  }
}
