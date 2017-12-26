<template>
  <div class="job-offers-widget-item">
    <a href="#" class="job-offers-widget-item__link"></a>
    <div class="job-offers-widget-item__content">
      <span :class="['job-offers-widget-item__technology-icon', devIconClass]" aria-hidden="true"></span>
      <span class="visualy-hidden"> {{ technology }} </span>
      <div class="job-offers-widget-item__left-side">
        <span class="job-offers-widget-item__job-position">
          {{ upper(title) }}
        </span>
        <a v-if="employerWebpage" target="_blank" :href="employerWebpage" class="job-offers-widget-item__employer-link">
          {{ employerName }}
        </a>
        <span v-else class="job-offers-widget-item__employer-name"> {{ employerName }} </span>
      </div>
      <div class="job-offers-widget-item__right-side">
        <span v-if="salaryBrackets" class="flaticon-money job-offers-widget-item__salary-brackets">
          {{ salaryBracketsWithCurrency }}
        </span>
        <span class="job-offers-widget-item__creation-date">
          {{ formatDateToLocalString(createdAt, 'pl', { month: 'short', day: '2-digit', year: 'numeric' }) }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import templateHelper from '~/helpers/templateHelper.js'

export default {
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
    }
  },
  props: {
    createdAt: {
      default: '',
      type: String
    },
    employerWebpage: {
      default: '',
      type: String
    },
    salaryBrackets: {
      default: '',
      type: String
    },
    technology: {
      default: '',
      type: String
    },
    currency: {
      default: '',
      type: String
    },
    employer: {
      default: '',
      type: String
    },
    title: {
      default: '',
      type: String
    }
  },
  mixins: [ templateHelper ]
}
</script>

<style lang="scss">
@import "assets/scss/_imports.scss";

.job-offers-widget-item {
  position: relative;
  font-weight: 300;
  transition: background-color 0.15s ease-in-out;

  &:not(:last-child) {
    border-bottom: 1px solid $job-offers-widget-item-border-color;
  }

  &:hover {
    background-color: $job-offers-widget-item-hover-bg-color;
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
    color: $job-offers-widget-item-employer-link-hover-color;
    font-size: 0.75rem;
    margin-top: 7px;
    font-weight: 400;
    z-index: 10;

    &:hover {
      text-decoration: underline;
    }
  }

   &__employer-name {
    font-size: 0.75rem;
    margin-top: 7px;
  }

  &__salary-brackets {
    font-size: 0.95rem;
    white-space: nowrap;

    &:before {
      color: $job-offers-widget-item-salary-brackets-icon-color;
      font-size: 0.95rem;
    }
  }

  &__creation-date {
    color: $job-offers-widget-item-creation-date-text-color;
    font-size: 0.75rem;
    margin-top: auto;
    padding-top: 10px;
  }
}
</style>
