
<template>
  <section class="projects-widget" v-checkConfig>
    <widget-title :title="title" :widgetClass="widgetClass" :widgetIconClass="widgetIconClass"/>
    <div v-for="(item, index) of items" class="projects-widget__projects-wrapper" :key="index">
      <projects-widget-item :title="item.title" :maxTeamSize="item.maxTeamSize"
        :currentTeamSize="item.currentTeamSize" :url="item.url" :tags="item.tags" :logo="item.logo"/>
    </div>
    <a class="projects-widget__see-more" href="/"> Zobacz więcej </a>
  </section>
</template>

<script>
import ProjectsWidgetItem from '~/components/widgets/partials/ProjectsWidgetItem'
import WidgetTitle from '~/components/widgets/partials/WidgetTitle'

export default {
  data () {
    return {
      title: 'Projekty do których możesz dołączyć',
      widgetClass: 'projects-widget',
      widgetIconClass: 'flaticon-code-fork',
      items: [
        {
          title: 'homepage-nuxtjs',
          maxTeamSize: 10,
          currentTeamSize: 3,
          url: 'https://github.com/pk/homepage-nuxtjs',
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
    ProjectsWidgetItem,
    WidgetTitle
  },
  props: {},
  computed: {},
  methods: {},
  mixins: {}
}
</script>

<style lang="scss">
@import "assets/scss/_imports.scss";

.projects-widget {
  background-color: $projects-widget-bg-color;
  border-radius: $default-blocks-border-radius;

  &__see-more {
    text-align: center;
    display: block;
    padding: 15px 0;
    font-size: .75rem;
    color: $projects-widget-text-color;

    &:hover,
    &:focus {
      color: $projects-widget-text-color;
      background-color: $projects-widget-link-more-hover-color;
      text-decoration: underline;
    }
  }
}
</style>
