<template>
  <div class="page page--mainpage">
    <div class="leftside-wrapper">
      <main class="main-content">
        <article-card-list class="article-card-list--big-main-post"/>
      </main>
      <aside class="aside-down">
        <job-offers-widget/>
        <action-links-widget/>
      </aside>
    </div>
    <aside class="aside-right">
      <alert-widget class="aside-right__widget"/>
      <meetup-calendar-widget class="aside-right__widget"/>
      <projects-widget class="aside-right__widget"/>
    </aside>
  </div>
</template>

<script>
import MeetupCalendarWidget from '~/components/widgets/MeetupCalendarWidget'
import ActionLinksWidget from '~/components/widgets/ActionLinksWidget'
import JobOffersWidget from '~/components/widgets/JobOffersWidget'
import ArticleCardList from '~/components/article/ArticleCardList'
import ProjectsWidget from '~/components/widgets/ProjectsWidget'
import AlertWidget from '~/components/widgets/AlertWidget'

export default {
  layout: 'common',
  components: {
    MeetupCalendarWidget,
    ActionLinksWidget,
    JobOffersWidget,
    ArticleCardList,
    ProjectsWidget,
    AlertWidget
  },
  fetch ({ store, params }) {
    // Retrieves cards from API
    return Promise.all([ store.dispatch('articles/list/getArticleList', { page: 1 }) ])
  }
}
</script>

<style lang="scss">
@import "assets/scss/imports.scss";

.page--mainpage {
  .aside-right {
    .alert-widget {
      @media (max-width: 1060px) {
        display: none;
      }
    }
  }

  .aside-down {
    .job-offers-widget {
      @media (max-width: $screen-md) {
        flex-basis: 100%;
        margin-right: 0;
      }

      @media (min-width: 1059px) {
        margin-right: $default-gutters-width;
      }
    }
  }
}
</style>
