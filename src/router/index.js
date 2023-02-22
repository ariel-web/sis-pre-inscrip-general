import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('../pages/Inicio.vue'),
  },
  {
    path: '/postulante/:id/:codigo',
    component: () => import('../pages/DatosPostulante.vue'),

  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
