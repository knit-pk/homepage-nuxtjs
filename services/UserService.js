import AbstractService from '~/services/AbstractService.js'

class UserService extends AbstractService {
  costructor () {
    this.path = '/users'
  }
  getUsers (query = '', config = {}) {
    return this.http.get(this.qsCompose(this.path, query), config).catch(this.squashError)
  }
  postUser (user = {}, options = {}) {
    return this.http.post(this.path, user, options)
  }
  getUser (id = '', options = {}) {
    return this.http.get(this.paramCompose(this.path, id), options)
  }
  putUser (id = '', user = {}, options = {}) {
    return this.http.put(this.paramCompose(this.path, id), user, options)
  }
  deleteUser (id = '', options = {}) {
    return this.http.delete(this.paramCompose(this.path, id), options)
  }
}

const userServiceInstance = new UserService()
export default userServiceInstance
