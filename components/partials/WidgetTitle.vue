<template>
  <h2 :class="`${widgetClass}__title`">
    <span :class="[`${widgetClass}__title-icon`, widgetIconClass]" aria-hidden="true"></span>
    {{ title }}
    <slot></slot>
  </h2>
</template>

<script>
export default {
  data () {
    return {}
  },
  props: ['title', 'widgetClass', 'widgetIconClass']
}
</script>

<style lang="scss">
@import "assets/scss/imports.scss";

</style>
