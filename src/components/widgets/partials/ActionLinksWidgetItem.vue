<template>
  <a class="action-link" href="#">
    <span class="action-link__text"> {{ linktext }} </span>
    <span :class="['action-link__icon', iconClass]"/>
  </a>
</template>

<script>
export default {
  components: {},
  mixins: {},
  props: {
    linktext: {
      type: String,
      default: 'empty',
    },
    iconClass: {
      type: String,
      default: '',
    },
  },
  data () {
    return {}
  },
  computed: {},
  methods: {},
}
</script>

<style lang="scss">
@import "src/assets/scss/_imports";

.action-link {
  $p: &;

  &__text {
    color: $action-link-item-text;
    text-transform: uppercase;
    text-decoration: none;

    @media (max-width: $screen-sm) {
      font-size: 0.9rem;
    }
  }

  &__icon {
    &::before {
      font-size: 3rem;

      @media (max-width: $screen-md) {
        font-size: 2rem;
      }
    }
  }

  &--job-offer {
    background-color: $action-link-item-job-bgcolor;

    &:hover,
    &:focus {
      background-color: darken($action-link-item-job-bgcolor, 7%);
    }

    #{$p}__icon {
      color: $action-link-item-job-icon-color;
      align-self: flex-start;
    }
  }

  &--project-offer {
    background-color: $action-link-item-project-bgcolor;

    &:hover,
    &:focus {
      background-color: darken($action-link-item-project-bgcolor, 7%);
    }

    #{$p}__icon {
      color: $action-link-item-project-icon-color;
      align-self: flex-end;
    }
  }

  &--more-info {
    background-color: $action-link-item-info-bgcolor;

    &:hover,
    &:focus {
      background-color: darken($action-link-item-info-bgcolor, 6%);
    }

    #{$p}__icon {
      color: $action-link-item-info-icon-color;
      align-self: flex-start;
    }
  }

  &--new-section {
    background-color: $action-link-item-section-bgcolor;

    &:hover,
    &:focus {
      background-color: darken($action-link-item-section-bgcolor, 7%);
    }

    #{$p}__icon {
      color: $action-link-item-section-icon-color;
      align-self: flex-end;
    }
  }
}

</style>
