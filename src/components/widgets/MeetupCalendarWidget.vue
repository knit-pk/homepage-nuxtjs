<template>
  <section v-config class="widget meetup-calendar">
    Meetup calendar
  </section>
</template>

<script>
export default {
  components: {},
  mixins: {},
  props: {},
  data () {
    return {}
  },
  computed: {},
  methods: {},
}
</script>

<style lang="scss">
@import "src/assets/scss/_imports";

.meetup-calendar {
  background-color: #fff;
  height: 500px;
  margin-bottom: $default-gutters-width;
}
</style>
