<template>
  <div class="projects-widget-item widget-item">
    <div class="projects-widget-item__top-section">
      <img v-if="isUrl(logo)" :src="logo" alt="" class="projects-widget-item__project-logo"/>
      <div v-else :class="['projects-widget-item__project-logo', 'projects-widget-item__project-logo-star', `projects-widget-item__project-logo${defaultCssPostfix(this.logo, '--green')}`, 'flaticon-star']"/>
      <h3 class="projects-widget-item__title"> {{ title }} </h3>
    </div>
    <div class="projects-widget-item__bottom-section">
      <dl class="projects-widget-item__list" aria-label="Informacje o projekcie">
        <div class="projects-widget-item__list-item" v-if="isNotEmpty(tags)">
          <dt class="projects-widget-item__list-item-term" title="Technologie">
            <span class="flaticon-curly-brackets projects-widget-item__list-item-logo" aria-hidden="true"></span>
            <span class="visualy-hidden"> Technologie </span>
          </dt>
          <dd class="projects-widget-item__list-item-definition"> {{ arrayToStringList(tags) }} </dd>
        </div>
        <div class="projects-widget-item__list-item" v-if="maxTeamSize">
          <dt class="projects-widget-item__list-item-term" title="Liczba kolaboratorów">
            <span class="flaticon-user projects-widget-item__list-item-logo" aria-hidden="true"></span>
            <span class="visualy-hidden"> Liczba kolaboratorów </span>
          </dt>
          <dd class="projects-widget-item__list-item-definition">
             Max: {{ maxTeamSize }}, Aktualnie: {{ !currentTeamSize ? 0 : currentTeamSize }}
          </dd>
        </div>
        <div class="projects-widget-item__list-item" v-if="isNotEmpty(url)">
          <dt class="projects-widget-item__list-item-term" title="Repozytorium">
            <span class="flaticon-github-logo projects-widget-item__list-item-logo" aria-hidden="true"></span>
            <span class="visualy-hidden"> Repozytorium </span>
          </dt>
          <dd class="projects-widget-item__list-item-definition">
            <a :href="url" class="projects-widget-item__list-item-link"> {{ url }} </a>
          </dd>
        </div>
      </dl>
    </div>

  </div>
</template>

<script>
import templateHelper from '~/helpers/templateHelper.js'
export default {
  data () {
    return {}
  },
  props: {
    tags: {
      default: [],
      type: Array
    },
    title: {
      default: '',
      type: String
    },
    url: {
      default: '',
      type: String
    },
    maxTeamSize: {
      default: 10,
      type: Number
    },
    currentTeamSize: {
      default: 1,
      type: Number
    },
    logo: {
      default: 'teal',
      type: String
    }
  },
  mixins: [ templateHelper ]
}
</script>

<style lang="scss">
@import "assets/scss/imports.scss";

.projects-widget-item {
  border-bottom: 1px solid $projects-widget-item-border-color;
  padding-bottom: 15px;

  &:hover {
    background-color: $projects-widget-item-hover-bg-color;
  }

  &__top-section {
    display: flex;
    padding: 15px 0 10px 15px;
  }

  &__title {
    align-self: center;
    font-weight: normal;
    margin-left: 15px;
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
  }

  &__list-item {
    padding: 5px 0 0 15px;
  }

  &__list-item-link {
    color: $projects-widget-item-link-color;
  }

  &__list-item-definition {
    display: inline;
  }

  &__list-item-term {
    display: inline;
  }

  &__list-item-logo {
    padding-right: 5px;

    &:before {
      font-size: 0.85rem;
    }
  }
}
</style>
