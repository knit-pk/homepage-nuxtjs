import Vue from 'vue'
import VueConfigManager from 'vue-config-manager'
import componentsConfig from '~/config/components-config'

Vue.use(VueConfigManager, {
  defaults: {
    showComponents: componentsConfig.showComponents
  }
})
