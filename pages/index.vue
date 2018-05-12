<template>
  <div class="page page--mainpage">
    <div class="leftside-wrapper">
      <main class="main-content">
        <article-card-list :articles="mainpageArticlesList"/>
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
import { mapGetters } from 'vuex'
import _ from 'lodash'

export default {
  layout: 'common',
  components: {
    MeetupCalendarWidget,
    ActionLinksWidget,
    JobOffersWidget,
    ArticleCardList,
    ProjectsWidget,
    AlertWidget,
  },
  computed: {
    ...mapGetters({
      mainPageArticlesCodesList: 'view/articles/mainPage',
    }),
    mainpageArticlesList () {
      return _.map(this.mainPageArticlesCodesList, code => this.$store.getters['resources/articles'][code])
    },
  },
  fetch ({ store }) {
    return store.dispatch('view/articles/getMainPage')
  },
}
</script>

<style lang="scss">
@import "assets/scss/imports";

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
          height: auto;
          flex-direction: row;
          align-items: center;
          margin-bottom: 10px;
          padding: 15px;
          flex: 1;
          flex-basis: 100%;
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
