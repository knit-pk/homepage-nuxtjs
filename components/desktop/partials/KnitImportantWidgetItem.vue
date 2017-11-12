<template>
  <div v-if="show" class="knit-important-widget-item">
    <button @click="hideMessage" class="knit-important-widget-item__close-button"> &#10060; </button>
    <h2 class="knit-important-widget-item__message-box">
      <span class="knit-important-widget-item__message-decorator"> Uwaga! </span>
      <span class="knit-important-widget-item__message"> {{ importantMessage }} </span>
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
  props: ['importantMessage']
}
</script>

<style lang="scss">
@import "assets/scss/imports.scss";

.knit-important-widget-item {
  position: relative;
  &__message-box {
    padding: 20px;
    font-size: .85rem;
    font-weight: normal;
    color: $knit-important-widget-item-text-color;
    background-color: $knit-important-widget-item-bg-color;
    margin-bottom: $knit-default-gutters-width;
  }
  &__message-decorator {
    font-weight: 900;
  }
  &__close-button {
    top: 7px;
    right: 7px;
    display: block;
    font-size: .65rem;
    font-weight: 900;
    position: absolute;
    border: none;
    background-color: $knit-important-widget-item-bg-color;
    color: $knit-secondary-text-color;
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
