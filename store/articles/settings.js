import commonHelper from '~/helpers/commonHelper'

const published = commonHelper.isProd() ? true : undefined
const orderBy = commonHelper.isProd() ? 'publishedAt' : 'createdAt'

export default {
  defaultQsObject: {
    published,
    group: ['UserReadLess', 'TagRead', 'CategoryRead', 'ImageReadLess'],
    limit: 5,
    [`order[${orderBy}]`]: 'DESC'
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
    'updatedAt',
    'comments',
    'commentsCount',
    'ratings',
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
