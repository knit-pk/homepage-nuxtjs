<template>
  <default-layout>
    <div class="mainpage">
      <div class="leftside-wrapper">
        <main class="main-content">
          <article-list/>
        </main>
        <aside class="aside-down">
          <knit-job-offer-list/>
          <knit-action-links/>
        </aside>
      </div>
      <aside class="aside-right">
        <knit-meetup-calendar/>
        <knit-project-list/>
      </aside>
    </div>
  </default-layout>
</template>

<script>
import DefaultLayout from '~/layouts/desktop/common/default.vue'
import ArticleList from '~/components/desktop/article/List.vue'

import KnitJobOfferList from '~/components/desktop/KnitJobOfferList.vue'
import KnitActionLinks from '~/components/desktop/KnitActionLinks.vue'
import KnitMeetupCalendar from '~/components/desktop/KnitMeetupCalendar.vue'
import KnitProjectList from '~/components/desktop/KnitProjectList.vue'

export default {
  components: {
    DefaultLayout,
    ArticleList,
    KnitJobOfferList,
    KnitActionLinks,
    KnitMeetupCalendar,
    KnitProjectList
  }
}
</script>

<style lang="scss">
@import "assets/scss/_imports.scss";

.mainpage {
  display: flex;
  flex-wrap: wrap;
  padding: $knit-default-gutters-width;
}

.leftside-wrapper {
  flex: 3;
}

.aside-right {
  flex: 1;
  margin: 0;
  margin-left: $knit-default-gutters-width;
}

.aside-down {
  flex-basis: 100%;
  margin-right: $knit-default-gutters-width;
  display: flex;
}
</style>
