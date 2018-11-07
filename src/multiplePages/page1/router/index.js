import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '../components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../components/Home')
    },
    {
      path: 'home',
      name: 'Home',
      component: () => import('../components/Home')
    },
    {
      path: 'hello-world',
      name: 'HelloWorld',
      component: HelloWorld
    },
    // 重定向路由，一定要放在所有路由的后面才有效，原理就是以上的路由都匹配不上的时候就重定向到此路由页面
    {
      path: '*',
      redirect: '/'
    }
  ]
})
