<template v-if="items">
  <div class="alert-widget">
    <div class="alert-widget__item-block" v-for="(item, index) of items" :key="index">
      <alert-widget-item :message="item.message"/>
    </div>
  </div>
</template>

<script>
import AlertWidgetItem from '~/components/partials/AlertWidgetItem'

export default {
  data () {
    return {
      items: [
        {
          message: 'Spotkanie sekcji \'Sztuczna Inteligencja\' zostało przeniesione na godz: 19.00'
        },
        {
          message: 'Spotkanie koła o godz 20.00'
        }
      ]
    }
  },
  components: {
    AlertWidgetItem
  }
}
</script>

<style lang="scss">
</style>
