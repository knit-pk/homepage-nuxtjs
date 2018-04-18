<template>

  <!-- Desktop version -->
  <section v-config v-if="isScrollable" class="widget job-offers-widget job-offers-widget--scrollable">
    <widget-title :title="title" :widget-class="widgetClass" :widget-icon-class="widgetIconClass">
      <b-badge
        pill
        variant="info"
        class="default-badge job-offers-widget__badge"> {{ itemsLength }} </b-badge>
    </widget-title>
    <vue-scrollbar classes="job-offers-widget__scrollbar-wrapper">
      <div v-prevent-parent-scroll class="job-offers-widget__content">
        <job-offers-widget-item
          v-for="(item, index) of items"
          :key="index"
          :title="item.title"
          :employer="item.employer"
          :salary-brackets="item.salaryBrackets"
          :created-at="item.createdAt"
          :currency="item.currency"
          :technology="item.technology"
          :employer-webpage="item.employerWebpage"/>
      </div>
    </vue-scrollbar>
  </section>

  <!-- Mobile version -->
  <section v-config v-else class="widget job-offers-widget">
    <widget-title
      :title="title"
      :widget-class="widgetClass"
      :widget-icon-class="widgetIconClass"/>
    <div class="job-offers-widget__content">
      <job-offers-widget-item
        v-for="(item, index) of items"
        :key="index"
        :title="item.title"
        :employer="item.employer"
        :salary-brackets="item.salaryBrackets"
        :created-at="item.createdAt"
        :currency="item.currency"
        :technology="item.technology"
        :employer-webpage="item.employerWebpage"/>
    </div>
  </section>
</template>

<script>
import JobOffersWidgetItem from '~/components/widgets/partials/JobOffersWidgetItem'
import WidgetTitle from '~/components/widgets/partials/WidgetTitle'
import VueScrollbar from 'vue2-scrollbar'
import { mapGetters } from 'vuex'

export default {
  components: {
    JobOffersWidgetItem,
    WidgetTitle,
    VueScrollbar,
  },
  mixins: {},
  props: {},
  data () {
    return {
      title: 'Oferty pracy',
      widgetClass: 'job-offers-widget',
      widgetIconClass: 'flaticon-handshake',
      items: [
        {
          title: 'full stack developer',
          employer: 'NetGuru',
          salaryBrackets: '3500 - 5000',
          createdAt: 'Fri, 17 Nov 2017 22:04:29 GMT',
          currency: 'PLN',
          technology: 'javascript',
        },
        {
          title: 'python developer',
          employer: 'Ligo Headhunters',
          createdAt: 'Fri, 19 Nov 2018 22:04:29 GMT',
          technology: 'python',
          employerWebpage: 'http://www.ligohr.pl/',
        },
        {
          title: 'junior software engineer',
          employer: 'Nokia',
          createdAt: 'Fri, 25 Nov 2018 22:04:29 GMT',
          technology: 'cplusplus',
          employerWebpage: 'https://www.nokia.com/pl_pl',
        },
        {
          title: 'junior java developer',
          employer: 'Global Logic',
          salaryBrackets: '2200 - 3000',
          createdAt: 'Fri, 10 Nov 2018 22:04:29 GMT',
          currency: 'PLN',
          technology: 'java',
          employerWebpage: 'https://www.globallogic.com/pl/',
        },
        {
          title: 'junior software engineer',
          employer: 'Nokia',
          createdAt: 'Fri, 25 Nov 2018 22:04:29 GMT',
          technology: 'java',
          employerWebpage: 'https://www.nokia.com/pl_pl',
        },
      ],
    }
  },
  computed: {
    itemsLength () {
      return this.items.length
    },
    isScrollable () {
      return this.itemsLength > 4 && !this.isMobile
    },
    ...mapGetters({
      isMobile: 'general/isMobile',
    }),
  },
  methods: {},
}
</script>

<style lang="scss">
@import "assets/scss/_imports";

.job-offers-widget {
  box-sizing: border-box;
  background-color: $job-offers-widget-bg-color;
  height: $job-offers-widget-height;
  border-radius: $default-blocks-border-radius;
  overflow: hidden;
  flex-basis: calc(50% - #{$default-gutters-width / 2});
  margin-right: $default-gutters-width / 2;

  &__scrollbar-wrapper {
    max-height: $job-offers-widget-height - $job-offers-widget-title-height;
  }

  &__badge {
    background-color: $job-offers-widget-badge-bg-color;
    margin-left: 8px;
    margin-top: 1px;
  }

  &__title {
    height: $job-offers-widget-title-height;
    background-color: $job-offers-widget-bg-color;
  }

  &__content {
    background-color: $job-offers-widget-bg-color;
    min-height: $job-offers-widget-height - $job-offers-widget-title-height;
  }
}
</style>
