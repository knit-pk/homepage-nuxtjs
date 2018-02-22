<template>
  <a class="action-link" href="#">
    <span class="action-link__text">{{ linktext }}</span>
    <span :class="[iconClass]" class="action-link__icon"></span>
  </a>
</template>

<script>
export default {
  data () {
    return {}
  },
  components: {},
  props: {
    linktext: {
      type: String,
      default: 'empty'
    },
    iconClass: {
      type: String
    }
  },
  computed: {},
  methods: {},
  mixins: {}
}
</script>

<style lang="scss">
@import "assets/scss/imports.scss";

.action-link {
  $p: &;

  &__text {
    color: $action-link-item-text;
    text-transform: uppercase;
    text-decoration: none;

    @media (max-width: 1110px) and (min-width: $screen-md) {
      font-size: 0.85rem;
    }
  }

  &__icon {
    &:before {
      font-size: 3rem;
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
