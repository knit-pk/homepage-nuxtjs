<template>
  <div>
    <h1>Show {{ item && item['@id'] }}</h1>

    <div v-if="loading" class="alert alert-info" role="status">Loading...</div>
    <div v-if="error" class="alert alert-danger" role="alert"><span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span> {{ error }}</div>

    <div v-if="item" class="table-responsive">
      <table class="table table-striped table-hover">
        <thead>
          <tr>
            <th>Field</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>code</td>
            <td>{{ item['code'] }}</td>
          </tr>
          <tr>
            <td>title</td>
            <td>{{ item['title'] }}</td>
          </tr>
          <tr>
            <td>content</td>
            <td>{{ item['content'] }}</td>
          </tr>
          <tr>
            <td>category</td>
            <td>{{ item['category'] }}</td>
          </tr>
          <tr>
            <td>tags</td>
            <td>{{ item['tags'] }}</td>
          </tr>
          <tr>
            <td>description</td>
            <td>{{ item['description'] }}</td>
          </tr>
          <tr>
            <td>author</td>
            <td>{{ item['author'] }}</td>
          </tr>
          <tr>
            <td>publishedAt</td>
            <td>{{ item['publishedAt'] }}</td>
          </tr>
          <tr>
            <td>published</td>
            <td>{{ item['published'] }}</td>
          </tr>
          <tr>
            <td>updatedAt</td>
            <td>{{ item['updatedAt'] }}</td>
          </tr>
          <tr>
            <td>createdAt</td>
            <td>{{ item['createdAt'] }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <router-link v-if="item" :to="{ name: 'articles' }" class="btn btn-default">Back to list</router-link>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    computed: mapGetters({
      error: 'article/show/error',
      loading: 'article/show/loading',
      item: 'article/show/item'
    }),
    methods: {},
    created () {
      // this.$store.dispatch('article/show/retrieve', decodeURIComponent(this.$route.params.id))
    },
    beforeDestroy () {
      this.$store.dispatch('article/show/reset')
    }
  }
</script>
