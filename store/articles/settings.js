export default {
  defaultQsObject: {
    published: (process.env.ENV === 'dev' || process.env.ENV === 'debug') ? undefined : true,
    group: ['UserReadLess', 'TagRead', 'CategoryRead'],
    limit: 5
  },
  props: [
    'author.avatar',
    'author.username',
    'publishedAt',
    'description',
    'thumbnail',
    'published',
    'createdAt',
    'comments',
    'content',
    'title',
    'image',
    'code',
    'tags',
    '@id'
  ],
  storePath: 'articles'
}
