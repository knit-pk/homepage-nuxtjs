import _ from 'lodash'

export default {
  normalizeArticle (acc, article) {
    return _.assign(acc, {
      [ article.code ]: article
    })
  }
}
