<template>
  <section class="meetup-calendar" v-checkConfig>
    Meetup calendar
  </section>
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
  mixins: {}
}
</script>

<style lang="scss">
@import "assets/scss/_imports.scss";

.meetup-calendar {
  background-color: #fff;
  height: 500px;
  margin-bottom: $default-gutters-width;
}
</style>
