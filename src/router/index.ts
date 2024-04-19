import { createRouter, createWebHistory } from 'vue-router';
// import { useAuthStore } from '@/store/LoginStore';

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/PaginaPublicaView.vue'),
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/notFound',
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;