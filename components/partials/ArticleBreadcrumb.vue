<template>
  <div class= "article-breadcrumb">
    <ul class="article-breadcrumb__routes">
      <li v-for="(item, index) in breadcrumbs" :key ="index" class="article-breadcrumb__item">
        <a href="#"> {{ item }} </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      breadcrumbs: [
        'Strona główna',
        'Artykuły',
        'Jak zacząć naukę języka Kotlin'
      ]
    }
  }
}
</script>

<style lang="scss">
@import "assets/scss/_imports.scss";

.article-breadcrumb {
  &__routes {
    list-style: none;
    margin-left: 9px;
    margin-bottom: 10px;
    padding: 4px 0px 11px 0;
  }

  &__routes li {
    display: inline;
  }

  &__routes li+li:before {
    padding: 8px;
    color: $gray-50;
    content: ">\00a0";
  }

  &__routes li a {
    color: $gray-50;
    text-decoration: none;
  }

  &__routes li a:hover {
    text-decoration: underline;
  }

  &__routes li:last-child a{
    font-weight: bold;
    text-decoration: none;
  }
}
</style>
