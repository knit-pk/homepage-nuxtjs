<template>
  <div class="page">
    <div class="leftside-wrapper">
      <main class="main-content">
        <article-card-list class="article-card-list--big-main-post"/>
      </main>
      <aside class="aside-down">
        <job-offers-widget/>
        <action-links/>
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
@import "assets/scss/imports.scss";

.aside-down, .aside-right, .main-content {
  @media (max-width: $screen-sm) {
    padding: 0;
    margin: $default-gutters-width 0 0 0;
  }
}

.aside-right {
  .alert-widget {
    @media (max-width: 1060px) {
      display: none;
    }
  }
}

.leftside-wrapper {
  @media (min-width: 1059px) {
    flex: 1;
  }
}

.aside-down {
  @media (max-width: $screen-xl) {
    justify-content: space-between;
    margin-left: $default-gutters-width;
  }

  @media (min-width: $screen-xl) {
    padding: 0 $default-gutters-width;
  }

  @media (max-width: 1060px) {
    margin-right: $default-gutters-width;
  }

  @media (max-width: $screen-md) {
    flex-basis: calc(50%);
    flex-wrap: wrap;
  }

  @media (max-width: $screen-sm) {
    margin: 0;
  }

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

.aside-right {
  @media (min-width: $screen-xl) {
    margin-left: -$default-gutters-width;
  }

  @media (max-width: 1060px) {
    flex-basis: 100%;
    display: flex;
    justify-content: space-between;

    &__widget {
      flex-basis: calc(50% - 10px);
    }
  }

  @media (max-width: $screen-sm) {
    flex-wrap: wrap;

    &__widget {
      flex-basis: 100%;
      min-width: 365px;
    }
  }
}
</style>
