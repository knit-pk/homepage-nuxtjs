import componentsConfig from '~/config/components-config'
import VueConfigManager from 'vue-config-manager'
import Vue from 'vue'

Vue.use(VueConfigManager, {
  defaults: {
    showComponents: componentsConfig.showComponents,
  },
})
