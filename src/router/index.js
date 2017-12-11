import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home'
import Test from '../components/Test'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/test',
      name: 'Hello',
      component: Test
    },
    {
      path: '/post/:num',
      name: 'Post',
      component: Home
    }
  ]
})
