import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Winner from '@/components/Winner-list'
import Quiz from '@/components/My-quiz'
import Chance from '@/components/More-chance'
import Rule from '@/components/Rule'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/Winner-list',
      name: 'Winner-list',
      component: Winner
    },
    {
      path: '/My-quiz',
      name: 'My-quiz',
      component: Quiz
    },
    {
      path: '/More-chance',
      name: 'More-chance',
      component: Chance
    },
    {
      path: '/Rule',
      name: 'Rule',
      component: Rule
    }
  ]
})
