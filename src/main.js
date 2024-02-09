import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import mainPage from './components/mainPage.vue'

const routes = [
  { path: '/', component: mainPage },
  { path: '', component: mainPage },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const app = createApp(App)
app.use(router)
app.mount('#app')