<template>
  <section class="action-links">
    <action-links-widget-item v-for="(link, index) in links" :key ="index"
      :class="['action-links__link-item', link.itemClass]"
      :linktext="link.text"
      :iconClass="link.icon"/>
  </section>
</template>

<script>
import ActionLinksWidgetItem from '~/components/widgets/partials/ActionLinksWidgetItem'

export default {
  data () {
    return {
      links: [
        {
          text: 'Dodaj nową ofertę pracy!',
          icon: 'flaticon-job-search',
          itemClass: 'action-link--job-offer'
        },
        {
          text: 'Dodaj nowy projekt i znajdź fantastyczny zespół',
          icon: 'flaticon-teamwork',
          itemClass: 'action-link--project-offer'
        },
        {
          text: 'Dowiedź się więcej o KNIT PK',
          icon: 'flaticon-info',
          itemClass: 'action-link--more-info'
        },
        {
          text: 'Utwórz sekcję i wspólnie poszerzaj swoją wiedzę',
          icon: 'flaticon-programming',
          itemClass: 'action-link--new-section'
        }
      ]
    }
  },
  components: {
    ActionLinksWidgetItem
  }
}
</script>

<style lang="scss">
@import "assets/scss/_imports.scss";

.action-links {
  display: flex;
  flex-wrap: wrap;
  flex-basis: calc(50% - #{$default-gutters-width / 2});
  background-color: $gray-20;
  justify-content: space-between;
  align-content: space-between;
  overflow: hidden;
  position: relative;
  font-size: 0.975rem;
  font-weight: 300;

  @media (max-width: $screen-md) {
    margin-top: $default-gutters-width;
    height: 400px;
    flex-basis: 100%;
  }

  &__link-item {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex-basis: calc(50% - #{$default-gutters-width / 2});
    border-radius: $default-blocks-border-radius;
    width: calc(50% - #{$default-gutters-width / 2});
    height: calc(50% - #{$default-gutters-width / 2});
    padding: 20px;
  }
}
</style>
