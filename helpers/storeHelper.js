export default {
  commitMultiple (commitArray = [], commit = () => {}) {
    for (const commitItem of commitArray) {
      commit(commitItem)
    }
  }
}
