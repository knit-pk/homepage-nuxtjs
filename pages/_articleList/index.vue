<template>
  <div class="page">
    <article-list-header/>
    <div class="left-wrapper">
      <main class="main-content">
        <article-card-list class="article-card-list--big-main-post article-card-list--horizontal-fixed" showMore="true"/>
      </main>
    </div>
    <aside class="right-wrapper">
      <meetup-calendar-widget/>
      <projects-widget/>
    </aside>
  </div>
</template>

<script>
  import MeetupCalendarWidget from '~/components/widgets/MeetupCalendarWidget'
  import ArticleCardList from '~/components/article/ArticleCardList'
  import ProjectsWidget from '~/components/widgets/ProjectsWidget'
  import ArticleListHeader from '~/components/article/ArticleListHeader'
  export default {
    layout: 'common',
    components: {
      MeetupCalendarWidget,
      ArticleCardList,
      ProjectsWidget,
      ArticleListHeader
    },
    fetch ({ store, params }) {
      // Retrieves cards from API
      return Promise.all([ store.dispatch('articles/list/getArticleList', { page: 1, 'category.code': params.articleList, 'order[createdAt]': 'desc' }) ])
    }
  }
</script>

<style lang="scss">
  @import "assets/scss/imports.scss";
  .main-content {
    @media (max-width: $screen-sm) {
      padding: 0;
      margin: $default-gutters-width 0 0 0;
    }
  }
  .left-wrapper {
    flex: 1;
  }
  .right-wrapper {
    flex-basis: 320px;
    margin-left: -$default-gutters-width;
    padding: 20px;
    @media (max-width: 1060px) {
      display: none;
    }
  }
  .page {
    display: flex;
  }
</style>