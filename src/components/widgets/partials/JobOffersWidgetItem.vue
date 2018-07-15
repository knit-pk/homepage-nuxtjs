<template>
  <div class="job-offers-widget-item widget-item">

    <!-- Job offer link -->
    <a href="#" class="job-offers-widget-item__link"/>

    <!-- Job offer content -->
    <div class="job-offers-widget-item__content">
      <span :class="['job-offers-widget-item__technology-icon', devIconClass]" aria-hidden="true"/>
      <span class="visualy-hidden"> {{ technology }} </span>

      <!-- Job offer left side -->
      <div class="job-offers-widget-item__left-side">
        <span class="job-offers-widget-item__job-position">
          {{ upper(title) }}
        </span>
        <a v-if="employerWebpage" :href="employerWebpage" target="_blank" class="job-offers-widget-item__employer-link link">
          {{ employerName }}
        </a>
        <span v-else class="job-offers-widget-item__employer-name"> {{ employerName }} </span>
      </div>

      <!-- Job offer right side -->
      <div class="job-offers-widget-item__right-side">
        <span v-if="salaryBrackets" class="job-offers-widget-item__salary-brackets">
          <span class="job-offers-widget-item__dollar fas fa-dollar-sign"/>
          {{ salaryBracketsWithCurrency }}
        </span>
        <span class="job-offers-widget-item__creation-date">
          {{ formatDateToLocalString(createdAt, 'pl', { month: 'short', day: '2-digit', year: 'numeric' }) }}
        </span>
      </div>
</div></div></template>

<script>
import templateHelper from '~/helpers/template'

export default {
  components: {},
  mixins: [templateHelper],
  props: {
    createdAt: {
      default: '',
      type: String,
    },
    employerWebpage: {
      default: '',
      type: String,
    },
    salaryBrackets: {
      default: '',
      type: String,
    },
    technology: {
      default: '',
      type: String,
    },
    currency: {
      default: '',
      type: String,
    },
    employer: {
      default: '',
      type: String,
    },
    title: {
      default: '',
      type: String,
    },
  },
  data () {
    return {}
  },
  computed: {
    devIconClass () {
      return `devicon-${this.technology}-plain colored`
    },
    employerName () {
      return `@ ${this.employer}`
    },
    salaryBracketsWithCurrency () {
      return `${this.salaryBrackets} ${this.currency}`
    },
  },
  methods: {},
}
</script>

<style lang="scss">
@import "src/assets/scss/_imports";

.job-offers-widget-item {
  position: relative;
  font-weight: 300;
  transition: background-color 0.15s ease-in-out;

  &:not(:last-child) {
    border-bottom: 1px solid $job-offers-widget-item-border-color;
  }

  &__link {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }

  &__content {
    display: flex;
    align-items: center;
    height: ($job-offers-widget-height - $job-offers-widget-title-height) / 4;
    color: $primary-text-color;
    padding: 0 15px;
  }

  &__technology-icon {
    font-size: 2.5rem;
  }

  &__left-side {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    flex: 6;
    justify-content: space-between;
    padding-left: 15px;
  }

  &__right-side {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    flex: 4;
    justify-content: space-between;
    padding-right: 10px;
    min-height: 36px;
    margin-left: 10px;
  }

  &__job-position {
    font-size: 0.9rem;
  }

  &__employer-link {
    font-size: 0.75rem;
    margin-top: 7px;
    font-weight: 400;
    z-index: 10;
  }

  &__employer-name {
    font-size: 0.75rem;
    margin-top: 7px;
  }

  &__salary-brackets {
    font-size: 0.95rem;
    white-space: nowrap;
  }

  &__dollar {
    color: $job-offers-widget-item-salary-brackets-icon-color;
  }

  &__creation-date {
    color: $job-offers-widget-item-creation-date-text-color;
    font-size: 0.75rem;
    margin-top: auto;
    padding-top: 10px;
  }
}
</style>
