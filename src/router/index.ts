import { createRouter, createWebHistory } from 'vue-router';

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
    path: '/busquedaVehiculo/:id?',
    name: 'busquedaVehiculo',
    component: () => import('../views/BusquedaVehiculoView.vue'),
  },
  {
    path: '/busquedaCiudadano/:id?', 
    name: 'busquedaCiudadano',
    component: () => import('../views/BusquedaCiudadanoView.vue'),
    props: true
  },

   {
    path: '/busquedaPolicia/',
    name: 'busquedaPolicia',
    component: () => import('../views/BusquedaPoliciaView.vue'),
  },
  {
    path: '/busquedaPolicia/:id?', 
    name: 'busquedaPolicia',
    component: () => import('../views/BusquedaPoliciaView.vue'),
    props: true
  },
  {
    path: '/notFound',
    name: '404',
    component: () => import('../views/404View.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue'),
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/RegisterView.vue'),
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