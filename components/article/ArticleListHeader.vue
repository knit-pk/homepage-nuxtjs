<template>
    <div class="list-header">
        <div class="list-name">
            {{listName}}
        </div>
    </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  const storePath = 'articles/list'
  export default {
    data () {
      return {}
    },
    computed: {
      ...mapGetters({
        listName: `${storePath}/listName`
      })
    }
  }
</script>

<style lang="scss">
    @import "assets/scss/imports.scss";
    .list-header {
        width: 100%;
        height: 300px;
        background: #8B0000;
        padding: 20px;
        margin: $default-gutters-width $default-gutters-width 0;
        display: flex;
        flex-direction: column-reverse;
        flex-wrap: nowrap;
        justify-content: flex-start;
        align-content: stretch;
        align-items: flex-start;
        .list-name {
            font-size: 46px;
            color: #fff;
            text-transform: uppercase;
            order: 0;
            flex: 0 1 auto;
            align-self: auto;
        }
        @media (max-width: $screen-sm) {
            margin: $default-gutters-width 0 0 0;
        }
    }
</style>