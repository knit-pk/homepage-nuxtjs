<template v-if="items">
  <div class="alert-widget">
    <alert-widget-item v-for="(item, index) of items" :key="index" :message="item.message"/>
  </div>
</template>

<script>
import AlertWidgetItem from '~/components/widgets/partials/AlertWidgetItem'

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
  },
  props: {},
  computed: {},
  methods: {},
  mixins: {}
}
</script>

<style lang="scss">
@import "assets/scss/imports.scss";

.alert-widget {
  display: block;
}
</style>
