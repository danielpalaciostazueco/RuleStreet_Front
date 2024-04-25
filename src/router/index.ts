import { createRouter, createWebHistory } from 'vue-router';
// import { useAuthStore } from '@/store/LoginStore';

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
  },
  {
    path: '/busquedaCiudadano',
    name: 'busquedaCiudadano',
    component: () => import('../views/BusquedaCiudadanoView.vue'),
  },
  {
    path: '/busquedaVehiculo',
    name: 'busquedaVehiculo',
    component: () => import('../views/BusquedaVehiculoView.vue'),
  },
  
  {
    path: '/notFound',
    name: '404',
    component: () => import('../views/404View.vue'),
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