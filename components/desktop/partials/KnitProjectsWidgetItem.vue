
<template>
  <div class="knit-projects-widget-item">
    <div class="knit-projects-widget-item__top-section">
      <img v-if="isUrl(logo)" :href="logo" alt="" class="knit-projects-widget-item__project-logo"/>
      <div v-else :class="[postfixesToCssClasses('knit-projects-widget-item__project-logo', ['', '-star', defaultCssPostfix(this.logo, '--green')]), 'flaticon-star']"/>
      <h3 class="knit-projects-widget-item__title"> {{ title }} </h3>
    </div>
    <div class="knit-projects-widget-item__bottom-section">
      <dl class="knit-projects-widget-item__list" aria-label="Informacje o projekcie">
        <div class="knit-projects-widget-item__list-item" v-if="isNotEmpty(tags)">
          <dt class="knit-projects-widget-item__list-item-term" title="Technologie">
            <span class="flaticon-curly-brackets knit-projects-widget-item__list-item-logo" aria-hidden="true"></span>
            <span class="visualy-hidden">Technologie</span>
          </dt>
          <dd class="knit-projects-widget-item__list-item-definition"> {{ arrayToStringList(tags) }} </dd>
        </div>
        <div class="knit-projects-widget-item__list-item" v-if="maxTeamSize">
          <dt class="knit-projects-widget-item__list-item-term" title="Liczba kolaboratorów">
            <span class="flaticon-user knit-projects-widget-item__list-item-logo" aria-hidden="true"></span>
            <span class="visualy-hidden">Liczba kolaboratorów</span>
          </dt>
          <dd class="knit-projects-widget-item__list-item-definition">
             Max: {{ maxTeamSize }}, Aktualnie: {{ !currentTeamSize ? 0 : currentTeamSize }}
          </dd>
        </div>
        <div class="knit-projects-widget-item__list-item" v-if="isNotEmpty(url)">
          <dt class="knit-projects-widget-item__list-item-term" title="Repozytorium">
            <span class="flaticon-github-logo knit-projects-widget-item__list-item-logo" aria-hidden="true"></span>
            <span class="visualy-hidden">Repozytorium</span>
          </dt>
          <dd class="knit-projects-widget-item__list-item-definition">
            <a :href="url" class="knit-projects-widget-item__list-item-link"> {{ url }} </a>
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
  props: ['tags', 'title', 'url', 'maxTeamSize', 'currentTeamSize', 'logo'],
  mixins: [templateHelper]
}
</script>

<style lang="scss">
@import "assets/scss/imports.scss";
.knit-projects-widget-item {
  margin-top: -1px;
  border-top: 1px solid $knit-projects-widget-item-border-color;
  border-bottom: 1px solid $knit-projects-widget-item-border-color;
  padding-bottom: 15px;
  &:hover {
    background-color: $knit-projects-widget-item-hover-bg-color;
    cursor: pointer;
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
      color: $knit-projects-widget-item-project-star-color;
      position: absolute;
      font-size: 1.5rem;
      top: 10px;
      left: 10px;
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
    color: $knit-projects-widget-item-link-color;
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
