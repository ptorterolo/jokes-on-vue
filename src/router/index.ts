import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CategoryView from '../views/CategoryView.vue'
import JokesView from '../views/JokesView.vue'
import FavoritesView from '../views/FavoritesView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/jokes',
      children: [
        { path: '', component: JokesView, name: 'jokes' },
        { path: 'favorites', component: FavoritesView, name: 'favorites' },
        {
          path: 'category/:category',
          name: 'jokesByCategory',
          component: CategoryView,
          props: true
        }
      ]
    }
  ]
})

export default router
