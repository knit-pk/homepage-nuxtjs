<template>
  <div v-config class="widget alert-widget">
    <alert-widget-item
      v-for="(item, index) of items"
      :key="index"
      :message="item.message"/>
  </div>
</template>

<script>
import AlertWidgetItem from '~/components/widgets/partials/AlertWidgetItem'

export default {
  components: {
    AlertWidgetItem,
  },
  mixins: {},
  props: {},
  data () {
    return {
      items: [
        {
          message: 'Spotkanie sekcji \'Sztuczna Inteligencja\' zostało przeniesione na godz: 19.00',
        },
        {
          message: 'Spotkanie koła o godz 20.00',
        },
      ],
    }
  },
  computed: {},
  methods: {},
}
</script>

<style lang="scss">
@import "src/assets/scss/imports";

.alert-widget {
  display: block;
}
</style>
