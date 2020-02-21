import Vue from 'vue'
import VueRouter from 'vue-router'
import VcHomePage from "../pages/home/VcHomePage";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: VcHomePage
  }
]

const router = new VueRouter({
  routes
})

export default router
