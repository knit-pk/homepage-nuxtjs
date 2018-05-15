<template>
  <section v-config class="widget action-links">
    <action-links-widget-item
      v-for="(link, index) in links"
      :key ="index"
      :class="['action-links__link-item', link.itemClass]"
      :linktext="link.text"
      :icon-class="link.icon"/>
  </section>
</template>

<script>
import ActionLinksWidgetItem from '~/components/widgets/partials/ActionLinksWidgetItem'

export default {
  components: {
    ActionLinksWidgetItem,
  },
  mixins: {},
  props: {},
  data () {
    return {
      links: [
        {
          text: 'Dodaj nową ofertę pracy!',
          icon: 'fas fa-search',
          itemClass: 'action-link--job-offer',
        },
        {
          text: 'Dodaj nowy projekt i znajdź fantastyczny zespół',
          icon: 'fas fa-users',
          itemClass: 'action-link--project-offer',
        },
        {
          text: 'Dowiedź się więcej o KNIT PK',
          icon: 'fas fa-info-circle',
          itemClass: 'action-link--more-info',
        },
        {
          text: 'Utwórz sekcję i wspólnie poszerzaj swoją wiedzę',
          icon: 'fas fa-code',
          itemClass: 'action-link--new-section',
        },
      ],
    }
  },
  computed: {},
  methods: {},
}
</script>

<style lang="scss">
@import "assets/scss/_imports";

.action-links {
  display: flex;
  flex-wrap: wrap;
  flex-basis: calc(50% - #{$default-gutters-width / 2});
  background-color: $gray-20;
  justify-content: space-between;
  align-content: space-between;
  overflow: hidden;
  position: relative;
  font-size: 1.062rem;
  font-weight: 300;

  &__link-item {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex-basis: calc(50% - #{$default-gutters-width / 2});
    border-radius: $default-blocks-border-radius;
    width: calc(50% - #{$default-gutters-width / 2});
    height: calc(50% - #{$default-gutters-width / 2});
    padding: 20px 18px;
  }
}
</style>
