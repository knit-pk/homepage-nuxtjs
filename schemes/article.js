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
      type: String,
      required: true
    },
    thumbnail: {
      type: String,
      required: false, // @TODO: Mark as a required when API would be ready to handle it
      default: '/temporary/card-photo-0.jpg'
    },
    authorAvatar: {
      type: String,
      required: false, // @TODO: Mark as a required when API would be ready to handle it
      default: '/temporary/article-author.png'
    },
    createdAt: {
      type: String,
      default: '',
      required: true
    },
    publishedAt: {
      type: String,
      default: '',
      required: true
    },
    likes: {
      type: Array,
      default: () => []
    },
    slug: {
      type: String,
      required: true
    },
    comments: {
      type: Array,
      default: () => []
    }
  }
}
