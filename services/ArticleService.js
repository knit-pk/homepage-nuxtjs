import AbstractService from '~/services/AbstractService.js'

export default class ArticleService extends AbstractService {
  costructor () {
    super()
    this.path = '/articles'
  }
  getArticles (query = '', config = {}) {
    return this.http.get(this.qsCompose(this.path, query), config).catch(this.squashError)
  }
  getArticlesByAuthor (authors = [], qsObject = {}, options = {}) {
    return this.getArticles(this.qsConcat(this.qsFromArray(authors, 'author'), this.qsFromObject(qsObject), options))
  }
  getArticlesByCode (codes = [], qsObject = {}, options = {}) {
    return this.getArticles(this.qsConcat(this.qsFromArray(codes, 'code'), this.qsFromObject(qsObject), options))
  }
  getArticlesPublished (getPublished = true, qsObject = {}, options = {}) {
    return this.getArticles(this.qsConcat(this.qsFromKVPair('published', getPublished), this.qsFromObject(qsObject), options))
  }
  getArticlesByTitle (title = '', qsObject = {}, options = {}) {
    return this.getArticles(this.qsConcat(this.qsFromKVPair('title', title), this.qsFromObject(qsObject), options))
  }
  postArticle (article = {}, options = {}) {
    return this.http.post(this.path, article, options)
  }
  getArticle (id = '', options = {}) {
    return this.http.get(this.paramCompose(this.path, id), options)
  }
  putArticle (id = '', article = {}, options = {}) {
    return this.http.put(this.paramCompose(this.path, id), article, options)
  }
  deleteArticle (id = '', options = {}) {
    return this.http.delete(this.paramCompose(this.path, id), options)
  }
}
