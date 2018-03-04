const componentsConfig = require('../../config/components-config')

module.exports = function (node, dir) {
  if (!componentsConfig.showComponents[node.parent.componentOptions.tag]) {
    node.data.style = Object.assign({}, node.data.style, {display: 'none'})
  }
}
