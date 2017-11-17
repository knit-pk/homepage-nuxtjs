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
  methods: {
    hideMessage (event) {
      const widgetItem = event.target.parentNode
      widgetItem.classList.add('fade-out')
      // @TODO: Use template helper here + add some animation for display none
      setTimeout(() => { this.show = false }, 700)
    }
  },
  props: ['message']
}
</script>

<style lang="scss">
@import "assets/scss/imports.scss";

.alert-widget-item {
  position: relative;

  &__message-box {
    padding: 20px;
    font-size: .85rem;
    font-weight: normal;
    color: $alert-widget-item-text-color;
    background-color: $alert-widget-item-bg-color;
    margin-bottom: $default-gutters-width;
  }

  &__message-decorator {
    font-weight: 900;
  }

  &__close-button {
    top: 7px;
    right: 7px;
    display: block;
    font-weight: 900;
    position: absolute;
    border: none;
    background-color: $alert-widget-item-bg-color;
    color: $secondary-text-color;
    cursor: pointer;

    &:focus,
    &:active {
      border: none;
      background: none;
      outline: none;
      padding: 0;
    }
  }
}
</style>
