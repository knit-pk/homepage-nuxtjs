<template>
  <div>
    <h1>New Article</h1>

    <div v-if="loading" class="alert alert-info" role="status">Loading...</div>
    <div v-if="error" class="alert alert-danger" role="alert"><span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span> {{ error }}</div>

    <ArticleForm :handle-submit="create" :values="item" :errors="violations"></ArticleForm>
    <router-link :to="{ name: 'ArticleList' }" class="btn btn-default">Back to list</router-link>
  </div>
</template>

<script>
  import ArticleForm from './Form.vue';
  import { createNamespacedHelpers } from 'vuex';

  const { mapActions, mapGetters } = createNamespacedHelpers('article/create');

  export default {
    components: {
      ArticleForm
    },
    data: function() {
      return {
        item: {}
      }
    },
    computed: mapGetters([
      'error',
      'loading',
      'created',
      'violations'
    ]),
    methods: {
      create: function(item) {
        this.$store.dispatch('article/create/create', item);
      }
    },
    watch: {
      created: function (created) {
        if (created) {
          this.$router.push({ name: 'ArticleUpdate', params: { id: created['@id']} });
        }
      }
    }
  }
</script>
