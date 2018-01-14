export default {
  defaultQsObject: {
    published: (process.env.ENV === 'dev' || process.env.ENV === 'debug') ? undefined : true,
    group: ['UserReadLess', 'TagRead', 'CategoryRead', 'ImageReadLess'],
    limit: 5
  },
  datePicker (item) {
    item.publishedAt = item.publishedAt || item.createdAt
    delete item.createdAt
    return item
  },
  props: [
    'publishedAt',
    'description',
    'image.url',
    'published',
    'createdAt',
    'comments',
    'commentsCount',
    'content',
    'author',
    'title',
    'image',
    'code',
    'tags',
    'id',
    '@id'
  ],
  storePath: 'articles'
}
