<template>
  <div class="page">
    <div class="leftside-wrapper">
      <main class="main-content">
        <article-card-list/>
      </main>
      <aside class="aside-down">
        <job-offers-widget/>
        <action-links/>
      </aside>
    </div>
    <aside class="aside-right">
      <alert-widget/>
      <meetup-calendar-widget/>
      <projects-widget/>
    </aside>
  </div>
</template>

<script>
import MeetupCalendarWidget from '~/components/MeetupCalendarWidget'
import JobOffersWidget from '~/components/JobOffersWidget'
import ArticleCardList from '~/components/ArticleCardList'
import ProjectsWidget from '~/components/ProjectsWidget'
import ActionLinks from '~/components/ActionLinks'
import AlertWidget from '~/components/AlertWidget'

export default {
  layout: 'common',
  components: {
    MeetupCalendarWidget,
    JobOffersWidget,
    ArticleCardList,
    ProjectsWidget,
    AlertWidget,
    ActionLinks
  },
  fetch ({ store, params }) {
    // Retrieves cards from API
    return Promise.all([ store.dispatch('articles/list/getArticleList', { page: 1 }) ])
  }
}
</script>

<style lang="scss">

</style>


