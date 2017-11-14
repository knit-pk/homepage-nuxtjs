<template>
  <default-layout>
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
  </default-layout>
</template>

<script>
import MeetupCalendarWidget from '~/components/desktop/MeetupCalendarWidget.vue'
import ArticleCardList from '~/components/desktop/ArticleCardList.vue'
import ProjectsWidget from '~/components/desktop/ProjectsWidget.vue'
import DefaultLayout from '~/layouts/desktop/common/default.vue'
import JobOfferList from '~/components/desktop/JobOfferList.vue'
import AlertWidget from '~/components/desktop/AlertWidget.vue'
import ActionLinks from '~/components/desktop/ActionLinks.vue'

export default {
  components: {
    MeetupCalendarWidget,
    ArticleCardList,
    ProjectsWidget,
    DefaultLayout,
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
