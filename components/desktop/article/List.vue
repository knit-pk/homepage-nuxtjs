<template>
  <div>
    <h1>Article List (Page: {{ page }})</h1>

    <div v-if="loading" class="alert alert-info">Loading...</div>
    <!-- <div v-if="deletedItem" class="alert alert-success">{{ deletedItem['@id'] }} deleted.</div> -->
    <div v-if="error" class="alert alert-danger">{{ error }}</div>

    <span v-if="view">
      <button
        type="button"
        class="btn btn-basic btn-sm"
        @click="getPage(1)"
        :disabled="page <= 1"
      >First</button>
      &nbsp;
      <button
        type="button"
        class="btn btn-basic btn-sm"
        @click="getPage(page - 1)"
        :disabled="page <= 1"
      >Previous</button>
      &nbsp;
      <button
        type="button" class="btn btn-basic btn-sm"
        @click="getPage(page + 1)"
        :disabled="totalItems <= page*perPage"
      >Next</button>
      &nbsp;
      <button
        type="button" class="btn btn-basic btn-sm"
        @click="getPage(Math.ceil(totalItems/perPage))"
        :disabled="totalItems <= page*perPage"
      >Last</button>
      &nbsp;
    </span>

    <div class="table-responsive">
        <table class="table table-striped table-hover">
        <thead>
          <tr>
            <th>Id</th>
            <th>code</th>
            <th>title</th>
            <th>content</th>
            <th>category</th>
            <th>tags</th>
            <th>description</th>
            <th>author</th>
            <th>publishedAt</th>
            <th>published</th>
            <th>updatedAt</th>
            <th>createdAt</th>
            <th></th>
            <!-- <th></th> -->
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in items">
            <td><router-link v-if="item" :to="{name: 'articles-id', params: { id: item['id'] }}">{{ item['@id'] }}</router-link></td>
            <td><router-link v-if="item" :to="{name: 'articles-id', params: { id: item['id'] }}">{{ item['code'] }}</router-link></td>
            <td><router-link v-if="item" :to="{name: 'articles-id', params: { id: item['id'] }}">{{ item['title'] }}</router-link></td>
            <td><router-link v-if="item" :to="{name: 'articles-id', params: { id: item['id'] }}">{{ item['content'] }}</router-link></td>
            <td><router-link v-if="item" :to="{name: 'articles-id', params: { id: item['id'] }}">{{ item['category'] }}</router-link></td>
            <td><router-link v-if="item" :to="{name: 'articles-id', params: { id: item['id'] }}">{{ item['tags'] }}</router-link></td>
            <td><router-link v-if="item" :to="{name: 'articles-id', params: { id: item['id'] }}">{{ item['description'] }}</router-link></td>
            <td><router-link v-if="item" :to="{name: 'articles-id', params: { id: item['id'] }}">{{ item['author'] }}</router-link></td>
            <td><router-link v-if="item" :to="{name: 'articles-id', params: { id: item['id'] }}">{{ item['publishedAt'] }}</router-link></td>
            <td><router-link v-if="item" :to="{name: 'articles-id', params: { id: item['id'] }}">{{ item['published'] }}</router-link></td>
            <td><router-link v-if="item" :to="{name: 'articles-id', params: { id: item['id'] }}">{{ item['createdAt'] }}</router-link></td>
            <td><router-link v-if="item" :to="{name: 'articles-id', params: { id: item['id'] }}">{{ item['updatedAt'] }}</router-link></td>
            <td>
              <router-link :to="{name: 'articles-id', params: { id: item['@id'] }}">
                <span class="glyphicon glyphicon-search" aria-hidden="true"/>
                <span class="sr-only">Show</span>
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'

  export default {
    computed: mapGetters({
      error: 'article/list/error',
      items: 'article/list/items',
      loading: 'article/list/loading',
      view: 'article/list/view',
      page: 'article/list/page',
      perPage: 'article/list/perPage',
      totalItems: 'article/list/totalItems'
    }),
    methods: mapActions({
      getPage: 'article/list/getItems'
    }),
    created () {
      // this.$store.dispatch('article/list/getItems')
    }
  }
</script>
