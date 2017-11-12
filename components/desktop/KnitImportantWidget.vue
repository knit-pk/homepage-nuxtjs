<template>
  <div class="knit-important-widget">
    <div class="knit-important-widget__item-block" v-if="items" v-for="item of items">
      <knit-important-widget-item :importantMessage="item.importantMessage"/>
    </div>
  </div>
</template>

<script>
import KnitImportantWidgetItem from '~/components/desktop/partials/KnitImportantWidgetItem'

export default {
  data () {
    return {
      items: [
        {
          importantMessage: 'Spotkanie sekcji \'Sztuczna Inteligencja\' zostało przeniesione na godz: 19.00'
        },
        {
          importantMessage: 'Spotkanie koła o godz 20.00'
        }
      ]
    }
  },
  components: {
    KnitImportantWidgetItem
  }
}
</script>

<style lang="scss">
.knit-important-widget {
  overflow: hidden;
}
</style>
