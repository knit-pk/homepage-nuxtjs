<template>
  <div class="projects-widget-item widget-item">

    <!-- Projects widget item top section -->
    <div class="projects-widget-item__top-section">
      <img v-if="isUrl(logo)" :src="logo" alt="" class="projects-widget-item__project-logo">
      <div v-else :class="['projects-widget-item__project-logo', 'projects-widget-item__project-logo-star', `projects-widget-item__project-logo${defaultCssPostfix(logo, '--green')}`, 'flaticon-star']"/>
      <h3 class="projects-widget-item__title"> {{ title }} </h3>
    </div>

    <dl class="projects-widget-item__list" aria-label="Informacje o projekcie">

      <!-- Tags -->
      <div v-if="isNotEmpty(tags)" class="projects-widget-item__list-item">
        <dt class="projects-widget-item__list-item-term" title="Technologie">
          <span class="flaticon-curly-brackets projects-widget-item__list-item-logo" aria-hidden="true"/>
          <span class="visualy-hidden"> Technologie </span>
        </dt>
        <dd class="projects-widget-item__list-item-definition"> {{ join(tags, ', ') }} </dd>
      </div>

      <!-- Collaborators -->
      <div v-if="maxTeamSize" class="projects-widget-item__list-item">
        <dt class="projects-widget-item__list-item-term" title="Liczba kolaboratorów">
          <span class="flaticon-user projects-widget-item__list-item-logo" aria-hidden="true"/>
          <span class="visualy-hidden"> Liczba kolaboratorów </span>
        </dt>
        <dd class="projects-widget-item__list-item-definition">
          Max: {{ maxTeamSize }}, Aktualnie: {{ !currentTeamSize ? 0 : currentTeamSize }}
        </dd>
      </div>

      <!-- Repo infos -->
      <div v-if="isNotEmpty(url)" class="projects-widget-item__list-item">
        <dt class="projects-widget-item__list-item-term" title="Repozytorium">
          <span class="flaticon-github-logo projects-widget-item__list-item-logo" aria-hidden="true"/>
          <span class="visualy-hidden"> Repozytorium </span>
        </dt>
        <dd class="projects-widget-item__list-item-definition">
          <a :href="url" class="projects-widget-item__list-item-link link"> {{ url }} </a>
        </dd>
      </div>
    </dl>
  </div>
</template>

<script>
import templateHelper from '~/helpers/template'

export default {
  components: {},
  mixins: [templateHelper],
  props: {
    tags: {
      required: true,
      type: Array,
    },
    title: {
      required: true,
      type: String,
    },
    url: {
      required: true,
      type: String,
    },
    maxTeamSize: {
      default: 10,
      type: Number,
    },
    currentTeamSize: {
      default: 1,
      type: Number,
    },
    logo: {
      default: 'teal',
      type: String,
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
@import "assets/scss/imports";

.projects-widget-item {
  border-bottom: 1px solid $projects-widget-item-border-color;
  padding: 15px;

  &:hover {
    background-color: $projects-widget-item-hover-bg-color;
  }

  &__top-section {
    display: flex;
  }

  &__title {
    align-self: center;
    font-weight: normal;
    margin-left: 15px;
    font-size: 1.1rem;
    font-weight: 300;
  }

  &__project-logo {
    position: relative;
    width: 45px;
    height: 45px;
    border-radius: 100%;
  }

  &__project-logo--teal {
    background-color: #5dc4bf;
  }

  &__project-logo--orange {
    background-color: #dd5826;
  }

  &__project-logo--green {
    background-color: #64bd63;
  }

  &__project-logo-star {
    &:before {
      color: $projects-widget-item-project-star-color;
      position: absolute;
      font-size: 1.5rem;
      top: 9px;
      left: 11px;
    }
  }

  &__list {
    font-size: 0.75rem;
    list-style: none;
    margin-top: 15px;
  }

  &__list-item {
    display: flex;

    &:not(:last-child) {
      margin-bottom: 8px;
    }
  }

  &__list-item-definition {
    font-size: 0.85rem;
    flex: 1;
  }

  &__list-item-logo {
    padding-right: 10px;

    &:before {
      font-size: 0.9rem;
    }
  }
}
</style>
