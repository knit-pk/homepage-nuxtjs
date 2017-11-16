<template>
  <div class="mainpage">
    <div class="leftside-wrapper">
      <main class="main-content">
        <article-card-list/>
      </main>
      <aside class="aside-down">
        <job-offer-list/>
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
import ArticleCardList from '~/components/ArticleCardList.vue'
import JobOfferList from '~/components/JobOfferList.vue'
import ActionLinks from '~/components/ActionLinks.vue'
import AlertWidget from '~/components/AlertWidget.vue'
import MeetupCalendarWidget from '~/components/MeetupCalendarWidget.vue'
import ProjectsWidget from '~/components/ProjectsWidget.vue'

export default {
  layout: 'common',
  components: {
    MeetupCalendarWidget,
    ArticleCardList,
    ProjectsWidget,
    JobOfferList,
    AlertWidget,
    ActionLinks
  }
}
</script>

<style lang="scss">
@import "assets/scss/_imports.scss";

.mainpage {
  display: flex;
  flex-wrap: wrap;
  padding: $default-gutters-width;
}

.leftside-wrapper {
  flex: 3;
}

.aside-right {
  flex: 1;
  margin: 0;
  margin-left: $default-gutters-width;
}

.aside-down {
  flex-basis: 100%;
  margin-right: $default-gutters-width;
  display: flex;
}
</style>

