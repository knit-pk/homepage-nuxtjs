import commonHelper from '~/helpers/common'

export default {
  defaultQsObject: {
    published: commonHelper.isProd() ? true : undefined,
    group: ['UserReadLess', 'TagRead', 'CategoryRead', 'ImageReadLess'],
    limit: 5,
    [`order[${commonHelper.isProd() ? 'publishedAt' : 'createdAt'}]`]: 'DESC',
  },
  datePicker (item) {
    item.publishedAt = item.publishedAt || item.createdAt
    delete item.createdAt
    return item
  },
  props: [
    'commentsCount',
    'publishedAt',
    'description',
    'image.url',
    'published',
    'createdAt',
    'updatedAt',
    'category',
    'comments',
    'ratings',
    'content',
    'author',
    'title',
    'image',
    'code',
    'tags',
    'id',
    '@id',
  ],
  storePath: 'articles',
  mainListName: 'wszystkie',
}
