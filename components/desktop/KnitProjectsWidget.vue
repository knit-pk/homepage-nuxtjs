
<template>
  <section class="knit-projects-widget">
    <h2 class="knit-projects-widget__title">
    <span class="knit-projects-widget__title-icon flaticon-code-fork" aria-hidden="true"></span>
      Projekty do których możesz dołączyć
    </h2>
    <div v-for="(item, index) of items" class="knit-projects-widget__projects-wrapper" :key='index'>
      <knit-projects-widget-item :title="item.title" :maxTeamSize="item.maxTeamSize"
        :currentTeamSize="item.currentTeamSize" :url="item.url" :tags="item.tags" :logo="item.logo"/>
    </div>
    <a class="knit-projects-widget__see-more" href="/">
      Zobacz więcej
    </a>
  </section>
</template>

<script>
import KnitProjectsWidgetItem from '~/components/desktop/partials/KnitProjectsWidgetItem'
export default {
  data () {
    return {
      items: [
        {
          title: 'homepage-nuxtjs',
          maxTeamSize: 10,
          currentTeamSize: 3,
          url: 'https://github.com/knit-pk/homepage-nuxtjs',
          tags: ['PHP', 'JavaScript', 'Nuxt.js', 'Vue.js'],
          logo: 'teal'
        },
        {
          title: 'knit-api',
          maxTeamSize: 8,
          currentTeamSize: 5,
          url: 'https://github.com/knit-pk/api-v1-php',
          tags: ['PHP', 'Docker']
        },
        {
          title: 'knit-homepage-panel',
          maxTeamSize: 20,
          currentTeamSize: 3,
          url: 'https://github.com/knit-pk/api-admin-v1-reactjs',
          tags: ['Redux', 'Reactjs'],
          logo: 'orange'
        }
      ]
    }
  },
  components: {
    KnitProjectsWidgetItem
  }
}
</script>

<style lang="scss">
@import "assets/scss/_imports.scss";
.knit-projects-widget {
  background-color: $knit-projects-widget-bg-color;
  &__title {
    font-size: .99rem;
    padding: 15px 10px;
    font-weight: normal;
  }
  &__title-icon {
    &:before {
      font-size: 1.4rem;
    }
  }
  &__see-more {
    text-align: center;
    display: block;
    padding: 15px 0;
    font-size: .75rem;
    color: $knit-projects-widget-text-color;
    &:active, &:focus {
      color: $knit-projects-widget-text-color;
    }
  }
}
</style>
