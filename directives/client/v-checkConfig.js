import Vue from 'vue'

Vue.directive('checkConfig', {
  bind: function (el, binding, vnode) {
    if (!Vue.$config('showComponents')[vnode.parent.componentOptions.tag]) {
      el.style = el.style || {}
      el.style.display = 'none'
    }
  }
})
