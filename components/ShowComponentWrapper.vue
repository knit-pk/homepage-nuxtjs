<template>
    <div v-if="show[$attrs.name]">
      <slot></slot>
    </div>
</template>

<script>
export default {
  data () {
    return {
      show: this.$config('showComponents')
    }
  }
}
</script>
