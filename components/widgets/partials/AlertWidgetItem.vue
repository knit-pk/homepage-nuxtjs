<template>
  <div v-if="show" class="alert-widget-item">
    <button @click="hideMessage" class="alert-widget-item__close-button"> &times; </button>
    <h2 class="alert-widget-item__message-box">
      <span class="alert-widget-item__message-decorator"> Uwaga! </span>
      <span class="alert-widget-item__message"> {{ message }} </span>
    </h2>
  </div>
</template>

<script>
export default {
  data () {
    return {
      show: true
    }
  },
  components: {},
  props: ['message'],
  computed: {},
  methods: {
    hideMessage (event) {
      setTimeout(() => { this.show = false }, 100)
    }
  },
  mixins: {}
}
</script>

<style lang="scss">
@import "assets/scss/imports.scss";

.alert-widget-item {
  position: relative;
  border: 1px solid $alert-widget-border-color;
  border-radius: $default-blocks-border-radius;
  margin-bottom: $default-gutters-width;
  overflow: hidden;

  &__message-box {
    padding: 16px 25px 16px 16px;
    font-size: .86rem;
    font-weight: normal;
    color: $alert-widget-item-text-color;
    background-color: $alert-widget-item-bg-color;
    font-weight: 300;
  }

  &__message-decorator {
    font-weight: 600;
  }

  &__close-button {
    top: 5px;
    right: 5px;
    display: block;
    font-weight: 900;
    font-size: 18px;
    padding: 0 4px;
    position: absolute;
    border: none;
    background-color: transparent;
    color: $alert-widget-button-close-color;
    cursor: pointer;
    outline: 0;

    &:hover,
    &:focus {
      color: $secondary-text-color;
    }
  }
}
</style>
