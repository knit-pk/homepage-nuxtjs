<template>
  <h2 :class="['widget-title', `${widgetClass}__title`]">
    <span :class="['widget-title__title-icon', `${widgetClass}__title-icon`, widgetIconClass]" aria-hidden="true"/>
    {{ title }}
    <slot/>
  </h2>
</template>

<script>
export default {
  components: {},
  mixins: {},
  props: {
    title: {
      default: '',
      type: String,
    },
    widgetClass: {
      default: '',
      type: String,
    },
    widgetIconClass: {
      default: '',
      type: String,
    },
  },
  data () {
    return {}
  },
  computed: {},
  methods: {},
}
</script>

<style lang="scss">
@import "src/assets/scss/imports.scss";

.widget-title {
  position: relative;
  font-size: 0.96rem;
  font-size: 15px;
  padding: 15px;
  border-bottom: 1px solid $widget-title-border-color;
  display: flex;
  align-items: center;
  font-weight: 300;

  &__title-icon {
    margin-right: 10px;

    &::before {
      font-size: 1.3rem;
    }
  }
}
</style>
