import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import mainPage from './components/mainPage.vue'
import productPage from './components/productPage.vue'

const routes = [
  { path: '/', component: mainPage },
  { path: '', component: mainPage },
  { path: '/product/:id', component: productPage, props: true }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const app = createApp(App)
app.use(router)
app.mount('#app')