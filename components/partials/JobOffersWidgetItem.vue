<template>
  <div class="job-offers-widget-item">
    <a href="XDD">
    <span :class="['job-offers-widget-item__technology-icon', devIconClass]" :aria-hidden="true"></span>
    <div class="job-offers-widget-item__left-side">
      <span class="job-offers-widget-item__offer-title job-offers-widget-item__left-side-element">
          {{ upper(title) }}
      </span>
      <a v-if="employerWebpage" target="_blank" :href="employerWebpage" class="job-offers-widget-item__employer-name job-offers-widget-item__employer-link job-offers-widget-item__left-side-element">
        {{ employerName }}
      </a>
      <span v-else class="job-offers-widget-item__employer-name job-offers-widget-item__left-side-element"> {{ employerName }} </span>
    </div>
    <div class="job-offers-widget-item__right-side">
      <span :class="['job-offers-widget-item__salary-brackets', 'job-offers-widget-item__right-side-element', { 'flaticon-money': salaryBrackets }]">
        {{ salaryBracketsWithCurrency }}
      </span>
      <span class="job-offers-widget-item__offer-expiration job-offers-widget-item__right-side-element">
        {{ formatDateToLocalString(offerExpiration, 'pl', { month: 'short', day: '2-digit', year: 'numeric' }) }}
      </span>
    </div>
    </a>
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
    offerExpiration: {
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
  a {
    display: block;
  }
  display: flex;
  align-items: center;
  height: ($job-offers-widget-height - $job-offers-widget-title-height) / 4;
  color: $primary-text-color;

  &:hover {
    background-color: $job-offers-widget-item-hover-bg-color;
  }

  &:not(:last-child) {
    border-bottom: 1px solid $job-offers-widget-item-border-color;
  }

  &__left-side, &__right-side {
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  &__left-side-element {
    margin-left: 15px;
  }

  &__right-side-element {
    text-align: end;
    margin-right: 30px;
    height: 15px;
  }

  &__salary-brackets {
    &:before {
      color: $job-offers-widget-item-salary-brackets-text-color;
    }
  }

  &__offer-expiration {
    color: $job-offers-widget-item-offer-expiration-text-color;
    font-size: 0.75rem;
    align-self: flex-end;
    margin-top: 15px;
  }

  &__employer-name {
    font-size: 0.75rem;
    margin-top: 5px;
  }

  &__employer-link {
    color: $job-offers-widget-item-employer-link-hover-color;
  }

  &__technology-icon {
    font-size: 2.5rem;
    margin-left: 15px;
  }

  &__offer-title {
    font-size: 0.85rem;
  }
}
</style>
