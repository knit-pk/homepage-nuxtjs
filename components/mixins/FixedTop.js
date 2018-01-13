import _ from 'lodash'

export default {
  data () {
    return {
      hiddenClass: 'fixed-top--hidden',
      defaultDebounceTime: 200,
      prevScrollY: 0,
      fixedTop: null
    }
  },

  methods: {
    fixedTopFall: _.debounce(function () {
      this.isScrolledDown() ?
        this.hideFixedTop() :
        this.unhideFixedTop()

      this.prevScrollY = window.scrollY
    }, this.defaultDebounceTime),

    isScrolledDown () {
      return window.scrollY > this.prevScrollY
    },

    hideFixedTop () {
      this.fixedTop.classList.add(this.hiddenClass)
    },

    unhideFixedTop () {
      this.fixedTop.classList.remove(this.hiddenClass)
    }
  },

  beforeMount () {
    this.fixedTop = document.querySelector('.fixed-top')
    window.addEventListener('scroll', this.fixedTopFall)
  },

  beforeDestroy () {
    window.removeEventListener('scroll', this.fixedTopFall)
  }
}
