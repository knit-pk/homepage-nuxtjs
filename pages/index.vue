<template>
  <div class="page page--mainpage">
    <div class="leftside-wrapper">
      <main class="main-content">
        <article-card-list class="article-card-list--big-main-post"/>
      </main>
      <aside class="aside-down">
        <show-component-wrapper name="job-offers-widget">
          <job-offers-widget/>
        </show-component-wrapper>
        <show-component-wrapper name="action-links-widget">
          <action-links-widget/>
        </show-component-wrapper>
      </aside>
    </div>
    <aside class="aside-right">
      <show-component-wrapper name="alert-widget">
        <alert-widget class="aside-right__widget"/>
      </show-component-wrapper>
      <show-component-wrapper name="meetup-calendar-widget">
        <meetup-calendar-widget class="aside-right__widget"/>
      </show-component-wrapper>
      <show-component-wrapper name="meetup-calendar-widget">
        <projects-widget class="aside-right__widget"/>
      </show-component-wrapper>
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
import ShowComponentWrapper from '~/components/ShowComponentWrapper'

export default {
  layout: 'common',
  components: {
    MeetupCalendarWidget,
    ActionLinksWidget,
    JobOffersWidget,
    ArticleCardList,
    ProjectsWidget,
    AlertWidget,
    ShowComponentWrapper
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
      margin-right: $default-gutters-width;
      flex: 1;

      @media (max-width: $screen-md) {
        flex-basis: calc(65% - #{$default-gutters-width});
      }

      @media (max-width: $screen-sm) {
        margin: 0 10px;
      }
    }

    .action-links {
      @media (max-width: $screen-md) {
        flex-basis: 35%;
        height: 320px;  
        flex-direction: column;
        flex-wrap: nowrap;
      }

      @media (max-width: $screen-sm) {
        padding: 0 10px;
        margin-top: $default-gutters-width;
        flex-basis: 100%;
      }

      &__link-item {
        @media (max-width: $screen-md) {
          flex-basis: 100%;
          height: auto;
          flex-direction: row;
          align-items: center;
          margin-bottom: 10px;
          padding: 15px;
          flex: 1;
          width: 100%;

          &:last-child {
            margin-bottom: 0;
          } 
        }
      }
    }
  }
}
</style>
