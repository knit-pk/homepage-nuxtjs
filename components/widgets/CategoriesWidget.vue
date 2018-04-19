<template>
  <section v-config class="widget categories-widget">
    {{ categoriesList }}
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import _ from 'lodash'

export default {
  components: {},
  mixins: {},
  props: {},
  data () {
    return {}
  },
  computed: {
    ...mapGetters({
      categoriesCodesList: 'view/categories/categoriesCodesList',
    }),
    categoriesList () {
      return _.map(this.categoriesCodesList, code => this.$store.getters['resources/categories'][code])
    },
  },
  methods: {},
}
</script>

<style lang="scss">
@import "assets/scss/_imports";

.categories-widget {
  background-color: #fff;
  height: 500px;
  margin-bottom: $default-gutters-width;
}
</style>
