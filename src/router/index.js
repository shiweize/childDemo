import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: "/subapp/test",
    name: 'demo',
    component: () => import('../components/Demo.vue'),
    meta: { title: "demo",keepAlive: false },
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default routes
