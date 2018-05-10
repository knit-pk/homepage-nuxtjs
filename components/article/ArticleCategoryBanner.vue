<template>
  <header v-config class="category-banner"/>
</template>

<script>
export default {
  components: {},
  mixins: [],
  props: {},
  data () {
    return {}
  },
  computed: {},
  methods: {},
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
