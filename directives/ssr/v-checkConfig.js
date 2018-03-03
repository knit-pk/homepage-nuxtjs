const componentsConfig = require('../../config/componentsConfig.json')

module.exports = function (node, dir) {
  if (!componentsConfig.showComponents[node.parent.componentOptions.tag]) {
    node.data.style = node.data.style || {}
    node.data.style.display = 'none'
  }
}
