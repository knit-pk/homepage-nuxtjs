<template>
<header class="category-banner" v-config>
</header>
</template>

<script>
export default {
  data () {
    return {}
  },
  components: {},
  props: {},
  computed: {},
  methods: {},
  mixins: []
}
</script>

<style lang="scss">
@import "assets/scss/_imports";

.category-banner {
  height: 400px;
  width: 100%;
  background-color: red;

  @media (max-width: $screen-xl) {
    height: 300px;
    margin: 0 10px;
  }

  @media (max-width: $screen-sm) {
    margin: 0 10px;
  }
}
</style>
