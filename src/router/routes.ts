import HomeView from '../views/HomeView.vue'
import CategoryView from '../views/CategoryView.vue'
import JokesView from '../views/JokesView.vue'
import FavoritesView from '../views/FavoritesView.vue'

export default [
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
