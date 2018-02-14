<template>
  <div>
    <h1>Article List (Page: {{ page }})</h1>

    <div v-if="loading" class="alert alert-info">Loading...</div>
    <!-- <div v-if="deletedItem" class="alert alert-success">{{ deletedItem['@id'] }} deleted.</div> -->
    <div v-if="error" class="alert alert-danger">{{ error }}</div>

    <span v-if="pagesMap">
      <button
        type="button" class="btn btn-basic btn-sm"
        @click="getPage({ page: page+1 })"
        :disabled="totalItems <= page*perPage"
      >Next</button>
      &nbsp;
    </span>

    <div class="table-responsive">
        <table class="table table-striped table-hover">
        <thead>
          <tr>
            <th>Title</th>
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
          <tr v-for="(item, index) in articles" :key="index">
            <td><router-link v-if="item" :to="{name: 'articles-slug', params: { slug: item['code'] }}">{{ item['title'] }}</router-link></td>
            <td><router-link v-if="item" :to="{name: 'articles-slug', params: { slug: item['code'] }}">{{ item['content'] }}</router-link></td>
            <td><router-link v-if="item" :to="{name: 'articles-slug', params: { slug: item['code'] }}">{{ item['category'] }}</router-link></td>
            <td>
              <ul>
                <li v-for="(tag, index) in item['tags']" :key="index">{{ tag['name'] }}</li>
              </ul>
            </td>
            <td><router-link v-if="item" :to="{name: 'articles-slug', params: { slug: item['code'] }}">{{ item['description'] }}</router-link></td>
            <td><router-link v-if="item" :to="{name: 'articles-slug', params: { slug: item['code'] }}">{{ item['author'] }}</router-link></td>
            <td><router-link v-if="item" :to="{name: 'articles-slug', params: { slug: item['code'] }}">{{ item['publishedAt'] }}</router-link></td>
            <td><router-link v-if="item" :to="{name: 'articles-slug', params: { slug: item['code'] }}">{{ item['published'] }}</router-link></td>
            <td><router-link v-if="item" :to="{name: 'articles-slug', params: { slug: item['code'] }}">{{ item['updatedAt'] }}</router-link></td>
            <td><router-link v-if="item" :to="{name: 'articles-slug', params: { slug: item['code'] }}">{{ item['createdAt'] }}</router-link></td>
            <td>
              <router-link :to="{name: 'articles-slug', params: { slug: item['code'] }}">
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

const storePath = 'articles/list'

export default {
  computed: mapGetters({
    totalItems: `${storePath}/totalItems`,
    pagesMap: `${storePath}/pagesMap`,
    articles: `${storePath}/articles`,
    loading: `${storePath}/loading`,
    perPage: `${storePath}/limit`,
    error: `${storePath}/error`,
    page: `${storePath}/page`
  }),
  methods: mapActions({
    getPage: `${storePath}/getArticleList`
  })
}
</script>
