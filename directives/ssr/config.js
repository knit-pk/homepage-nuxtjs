const componentsConfig = require('../../config/components-config')
const _ = require('lodash')

module.exports = function (node, dir) {
  if (process.env.NODE_ENV === 'production' && !componentsConfig.showComponents[ node.parent.componentOptions.tag ]) {
    node.data.style = _.assign({}, node.data.style, { display: 'none' })
  }
}
