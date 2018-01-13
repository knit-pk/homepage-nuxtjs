import articleContent from '~/schemes/article/content'

export default {
  props: {
    ...articleContent.props,
    likes: {
      type: Array,
      default: () => []
    },
    id: {
      type: String
    },
    slug: {
      type: String,
      required: true
    },
    comments: {
      type: Array,
      default: () => []
    },
    description: {
      type: String,
      required: true
    }
  }
}
