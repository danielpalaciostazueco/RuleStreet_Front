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
    path: '/ayuntamientoEventos',
    name: 'ayuntamientoEventos',
    component: () => import('../views/AyuntamientoView.vue'),
  },
  {
    path: '/ayuntamientoDashboard',
    name: 'ayuntamientoDashboard',
    component: () => import('@/views/DashboardAyuntamientoView.vue'),
  },
  {
    path: '/busquedaCiudadano/:id?', 
    name: 'busquedaCiudadano',
    component: () => import('../views/BusquedaCiudadanoView.vue'),
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
    path: '/loginPolicia',
    name: 'loginPolicia',
    component: () => import('../views/LoginPoliciaView.vue'),
  },
  {
    path: '/loginAyuntamiento',
    name: 'loginAyuntamiento',
    component: () => import('../views/LoginAyuntamientoView.vue'),
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
  {
    path: '/busquedaCaptura',
    name: 'busquedaCaptura',
    component: () => import('../views/BusquedaCapturaView.vue'),
  },
  {
    path: '/busquedaDeudores',
    name: 'busquedaDeudores',
    component: () => import('../views/BusquedaDeudoresView.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;