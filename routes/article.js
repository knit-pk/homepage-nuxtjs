import ArticleList from '../components/article/List.vue'
import ArticleCreate from '../components/article/Create.vue'
import ArticleUpdate from '../components/article/Update.vue'
import ArticleShow from '../components/article/Show.vue'

export default [
  { name: 'ArticleList', path: '/articles/', component: ArticleList },
  { name: 'ArticleCreate', path: '/articles/create', component: ArticleCreate },
  { name: 'ArticleUpdate', path: '/articles/edit/:id', component: ArticleUpdate },
  { name: 'ArticleShow', path: '/articles/show/:id', component: ArticleShow }
]
