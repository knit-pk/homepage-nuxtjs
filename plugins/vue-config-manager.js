import Vue from 'vue'
import VueConfigManager from 'vue-config-manager'
import componentsConfig from '~/config/componentsConfig.json'

Vue.use(VueConfigManager, {
  defaults: {
    showComponents: componentsConfig.showComponents
  }
})
