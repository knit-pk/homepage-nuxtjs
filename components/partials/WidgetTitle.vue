<template>
  <h2 :class="[`${widgetClass}__title`, 'widget-title']">
    <span :class="[`${widgetClass}__title-icon`, 'widget-title__title-icon', widgetIconClass]" aria-hidden="true"></span>
    {{ title }}
    <slot></slot>
  </h2>
</template>

<script>
export default {
  data () {
    return {}
  },
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
  }
}
</script>

<style lang="scss">
@import "assets/scss/imports.scss";

.widget-title {
  position: relative;
  font-size: .99rem;
  padding: 15px 15px;
  font-weight: normal;
  border-bottom: 1px solid $widget-title-border-color;
  display: flex;
  align-items: center;

  &__title-icon {
    margin-right: 10px;
    &:before {
      font-size: 1.4rem;
    }
  }
}
</style>
