import Vue from 'vue'

Vue.directive('config', {
  bind: function (el, binding, vnode) {
    if (!Vue.$config('showComponents')[vnode.parent.componentOptions.tag]) {
      el.style = Object.assign({}, el.style, {display: 'none'})
    }
  }
})
