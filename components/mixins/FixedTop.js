import detectIt from 'detect-it'
import _ from 'lodash'

export default {
  data () {
    return {
      initializeHideHeight: 100,
      hiddenClass: 'fixed-top--hidden',
      defaultDebounceTime: 1000,
      prevScrollY: 0,
      currScrollY: 0,
      fixedTop: null,
      isMobileMenuShown: false,
    }
  },
  components: {},
  props: {},
  computed: {},
  methods: {
    fixedTopFall: _.debounce(function () {
      this.currScrollY = window.scrollY

      if (!this.isMobileMenuShown && this.isEligibleForScroll() && this.isScrollingDown()) {
        this.hideFixedTop()
      } else if (this.isScrollingUp()) {
        this.showFixedTop()
      }

      this.prevScrollY = this.currScrollY
    }, this.defaultDebounceTime),

    hideFixedTop () {
      this.fixedTop.classList.add(this.hiddenClass)
    },

    showFixedTop () {
      this.fixedTop.classList.remove(this.hiddenClass)
    },

    isScrollingDown () {
      return this.currScrollY > this.prevScrollY
    },

    isScrollingUp () {
      return this.currScrollY < this.prevScrollY
    },

    isEligibleForScroll () {
      return this.currScrollY > this.initializeHideHeight
    },
  },
  mixins: {},
  beforeMount () {
    this.fixedTop = document.querySelector('.fixed-top')
    window.addEventListener('scroll', this.fixedTopFall, detectIt.passiveEvents ? { capture: false, passive: true } : false)
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.fixedTopFall)
  },
}
