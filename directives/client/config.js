export default function (Vue) {
  Vue.directive('config', {
    bind (el, binding, vnode) {
      if (process.env.NODE_ENV === 'production' && !Vue.$config('showComponents')[vnode.parent.componentOptions.tag]) {
        el.style.display = 'none'
      }
    }
  })
}
