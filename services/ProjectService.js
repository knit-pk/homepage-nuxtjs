import AbstractService from '~/services/AbstractService.js'

class ProjectService extends AbstractService {
  costructor () {
    this.path = '/projects'
  }
  getProjects (query = '', config = {}) {
    return this.http.get(this.qsCompose(this.path, query), config).catch(this.squashError)
  }
  getProjectsByGroup (groups = [], qsObject = {}, options = {}) {
    return this.getProjects(this.qsConcat(this.qsFromArray(groups, 'group'), this.qsFromObject(qsObject), options))
  }
  postProject (project = {}, options = {}) {
    return this.http.post(this.path, project, options)
  }
  getProject (id = '', options = {}) {
    return this.http.get(this.paramCompose(this.path, id), options)
  }
  putProject (id = '', project = {}, options = {}) {
    return this.http.put(this.paramCompose(this.path, id), project, options)
  }
  deleteProject (id = '', options = {}) {
    return this.http.delete(this.paramCompose(this.path, id), options)
  }
}

const projectServiceInstance = new ProjectService()
export default projectServiceInstance
