<template>
  <button :class="['knit-button', ...buttonClasses]" v-checkConfig>
    <span :class="['knit-button__label', ...labelClasses]">
      <slot/>
    </span>
    <span :class="['knit-button__icon', ...iconClasses]" aria-hidden="true"></span>
  </button>
</template>

<script>
export default {
  data () {
    return {}
  },
  components: {},
  props: {
    buttonClasses: {
      type: Array
    },
    labelClasses: {
      type: Array
    },
    iconClasses: {
      type: Array
    }
  },
  computed: {},
  methods: {},
  mixins: {}
}
</script>

<style lang="scss">
@import "assets/scss/_imports.scss";

.knit-button {
  min-width: 100px;
  transition: background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out;
  color: #333;
  background-color: #f8f8f8;
  text-align: center;
  vertical-align: middle;
  touch-action: manipulation;
  cursor: pointer;
  border: 1px solid #ccc;
  white-space: nowrap;
  padding: 6px 12px;
  font-size: 14px;
  line-height: 1.428571429;
  border-radius: 4px;
  font-family: inherit;

  &:hover,
  &:focus {
    outline: 0;
    color: #333;
    background-color: #dfdfdf;
    border-color: #adadad;
  }

  &:focus {
    box-shadow: 0 0 0 2px rgba(174, 186, 191, 0.5);
  }

  &--big {
    padding: 9px 15px;
  }
}
</style>
