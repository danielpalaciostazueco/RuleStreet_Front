import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
  },
  {
    path: '/perfilCiudadano/:id?',
    name: 'perfilCiudadano',
    component: () => import('../views/PerfilCiudadanoView.vue'),
  },
  {
    path: '/busquedaVehiculo/:id?',
    name: 'busquedaVehiculo',
    component: () => import('../views/BusquedaVehiculoView.vue'),
  },
  {
    path: '/ayuntamientoEvento',
    name: 'ayuntamientoEvento',
    component: () => import('@/views/AyuntamientoEventoView.vue'),
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
    path: '/busquedaCaptura',
    name: 'busquedaCaptura',
    component: () => import('../views/BusquedaCapturaView.vue'),
  },
  {
    path: '/graficaBusquedaCaptura',
    name: 'graficaBusquedaCaptura',
    component: () => import('../views/GraficaBusquedaCapturaView.vue'),
  },
  {
    path: '/busquedaDeudores',
    name: 'busquedaDeudores',
    component: () => import('../views/BusquedaDeudoresView.vue'),
  },
  {
    path: '/agentes/:id?',
    name: 'busquedaPolicia',
    component: () => import('../views/BusquedaPoliciaView.vue'),
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
  {
    path: '/codigoPenal',
    name: 'codigoPenal',
    component: () => import('../views/CodigoPenalView.vue'),
  },
  
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});


router.beforeEach((to, from, next) => {
  if (to.name === 'busquedaCiudadano' && localStorage.getItem('tokenPolicia') === null) {
    if (from.name !== 'home') {
      next({ name: 'home' });
    } else {
      next(false); 
    }
  } else {
    next(); 
  }
});

router.beforeEach((to, from, next) => {
  if (to.name === 'busquedaVehiculo' && localStorage.getItem('tokenPolicia') === null) {
    if (from.name !== 'home') {
      next({ name: 'home' });
    } else {
      next(false);
    }
  } else {
    next(); 
  }
});


router.beforeEach((to, from, next) => {
  if (to.name === 'busquedaPolicia' && localStorage.getItem('tokenPolicia') === null) {
    if (from.name !== 'home') {
      next({ name: 'home' });
    } else {
      next(false);
    }
  } else {
    next(); 
  }
});



router.beforeEach((to, from, next) => {
  if (to.name === 'perfilCiudadano' && localStorage.getItem('tokenUsuario') === null) {
    if (from.name !== 'home') {
      next({ name: 'home' });
    } else {
      next(false);
    }
  } else {
    next(); 
  }
});

router.beforeEach((to, from, next) => {
  if (to.name === 'ayuntamientoDashboard' && localStorage.getItem('tokenAyuntamiento') === null) {
    if (from.name !== 'home') {
      next({ name: 'home' });
    } else {
      next(false);
    }
  } else {
    next(); 
  }
});

router.beforeEach((to, from, next) => {
  if (to.name === 'busquedaDeudores' && localStorage.getItem('tokenPolicia') === null) {
    if (from.name !== 'home') {
      next({ name: 'home' });
    } else {
      next(false);
    }
  } else {
    next(); 
  }
});

export default router;