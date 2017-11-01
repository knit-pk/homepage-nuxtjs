import AbstractService from '~/services/AbstractService.js'

export default class TagService extends AbstractService {
  costructor () {
    super()
    this.path = '/tags'
  }
  getTags (query = '', config = {}) {
    return this.http.get(this.qsCompose(this.path, query), config).catch(this.squashError)
  }
  getTagsByName (name = '', qsObject = {}, options = {}) {
    return this.getTags(this.qsConcat(this.qsFromKVPair('name', name), this.qsFromObject(qsObject)), options)
  }
  postTag (tag = {}, options = {}) {
    return this.http.post(this.path, tag, options)
  }
  getTag (id = '', options = {}) {
    return this.http.get(this.paramCompose(this.path, id), options)
  }
  putTag (id = '', tag = {}, options = {}) {
    return this.http.put(this.paramCompose(this.path, id), tag, options)
  }
  deleteTag (id = '', options = {}) {
    return this.http.delete(this.paramCompose(this.path, id), options)
  }
}
