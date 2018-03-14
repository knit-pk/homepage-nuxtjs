<template>
  <h2 :class="['widget-title', `${widgetClass}__title`]">
    <span :class="[widgetIconClass, 'widget-title__title-icon', `${widgetClass}__title-icon`]" aria-hidden="true"></span>
    {{ title }}
    <slot></slot>
  </h2>
</template>

<script>
export default {
  data () {
    return {}
  },
  components: {},
  props: {
    title: {
      default: '',
      type: String
    },
    widgetClass: {
      default: '',
      type: String
    },
    widgetIconClass: {
      default: '',
      type: String
    }
  },
  computed: {},
  methods: {},
  mixins: {}
}
</script>

<style lang="scss">
@import "assets/scss/imports.scss";

.widget-title {
  position: relative;
  font-size: .96rem;
  font-size: 15px;
  padding: 15px;
  font-weight: normal;
  border-bottom: 1px solid $widget-title-border-color;
  display: flex;
  align-items: center;
  font-weight: 300;

  &__title-icon {
    margin-right: 10px;

    &:before {
      font-size: 1rem;
    }
  }
}
</style>
