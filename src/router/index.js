import Vue from 'vue'
import VueRouter from 'vue-router'
// 路由懒加载
const Home = () => import('../views/Home/Home')
const Category = () => import('../views/Category/Category')
const Cart = () => import('../views/Cart/Cart')
const person = () => import('../views/User/UserInfo')
const Detail = () =>import('../views/detail/Detail')

//解决导航中的vue-route重复点报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location){
  return originalPush.call(this,location).catch(err => err)
}
Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    redirect:'/home'
  },
  {
    path:'/home',
    component: Home
  },
  {
    path:'/category',
    component: Category
  },
  {
    path:'/cart',
    component:Cart
  },
  {
    path:'/peruser',
    component:person
  },
  {
    path: '/detail/:iid',
    name:'Detail',
    component: Detail
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
