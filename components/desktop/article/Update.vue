<template>
  <div>
    <h1>Edit {{ item && item['@id'] }}</h1>

    <div v-if="created" class="alert alert-success" role="status">{{ created['@id'] }} created.</div>
    <div v-if="updated" class="alert alert-success" role="status">{{ updated['@id'] }} updated.</div>
    <div v-if="retrieveLoading || updateLoading || deleteLoading"class="alert alert-info" role="status">Loading...</div>
    <div v-if="retrieveError" class="alert alert-danger" role="alert"><span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span> {{ retrieveError }}</div>
    <div v-if="updateError" class="alert alert-danger" role="alert"><span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span> {{ updateError }}</div>
    <div v-if="deleteError" class="alert alert-danger" role="alert"><span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span> {{ deleteError }}</div>

    <ArticleForm v-if="item" :handle-submit="update" :values="item" :errors="violations" :initialValues="retrieved"></ArticleForm>
    <router-link v-if="item" :to="{ name: 'ArticleList' }" class="btn btn-default">Back to list</router-link>
    <button @click="del" class="btn btn-danger">Delete</button>
  </div>
</template>

<script>
  import ArticleForm from './Form.vue';
  import { mapGetters } from 'vuex';

  export default {
    created () {
      this.$store.dispatch('article/update/retrieve', decodeURIComponent(this.$route.params.id));
    },
    components: {
      ArticleForm
    },
    computed: {
      ...mapGetters({
        retrieveError: 'article/update/retrieveError',
        retrieveLoading: 'article/update/retrieveLoading',
        updateError: 'article/update/updateError',
        updateLoading: 'article/update/updateLoading',
        deleteError: 'article/del/error',
        deleteLoading: 'article/del/loading',
        created: 'article/create/created',
        deleted: 'article/del/deleted',
        retrieved: 'article/update/retrieved',
        updated: 'article/update/updated',
        violations: 'article/update/violations'
      })
    },
    data: function() {
      return {
        item: {}
      }
    },
    methods: {
      update (values) {
        this.$store.dispatch('article/update/update', {item: this.retrieved, values: values });
      },
      del () {
        if (window.confirm('Are you sure you want to delete this item?'))
          this.$store.dispatch('article/del/delete', this.retrieved);
      },
      reset () {
        this.$store.dispatch('article/update/reset');
        this.$store.dispatch('article/del/reset');
        this.$store.dispatch('article/create/reset');

      }
    },
    watch: {
      deleted: function (deleted) {
        if (deleted) {
          this.$router.push({ name: 'ArticleList' });
        }
      }
    },
    beforeDestroy() {
      this.reset();
    }
  }
</script>
