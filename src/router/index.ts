import { createRouter, createWebHistory } from "vue-router";
import { useListadoPolicias, type Permiso } from "@/stores/storePolicia";
import { useListadoAuth } from "@/stores/storeAuth";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/HomeView.vue"),
  },
  {
    path: "/perfilCiudadano",
    name: "perfilCiudadano",
    component: () => import("../views/CiudadanoUsuarioView.vue"),
  },
  {
    path: "/busquedaVehiculo/:id?",
    name: "busquedaVehiculo",
    component: () => import("../views/BusquedaVehiculoView.vue"),
  },
  {
    path: "/ayuntamientoEvento",
    name: "ayuntamientoEvento",
    component: () => import("@/views/AyuntamientoEventoView.vue"),
  },
  {
    path: "/ayuntamientoDashboard",
    name: "ayuntamientoDashboard",
    component: () => import("@/views/DashboardAyuntamientoView.vue"),
  },
  {
    path: "/busquedaCiudadano/:id?",
    name: "busquedaCiudadano",
    component: () => import("../views/BusquedaCiudadanoView.vue"),
    props: true,
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/LoginView.vue"),
  },
  {
    path: "/loginPolicia",
    name: "loginPolicia",
    component: () => import("../views/LoginPoliciaView.vue"),
  },
  {
    path: "/loginAyuntamiento",
    name: "loginAyuntamiento",
    component: () => import("../views/LoginAyuntamientoView.vue"),
  },
  {
    path: "/register",
    name: "register",
    component: () => import("@/views/RegisterView.vue"),
  },
  {
    path: "/busquedaCaptura",
    name: "busquedaCaptura",
    component: () => import("../views/BusquedaCapturaView.vue"),
  },
  {
    path: "/graficaBusquedaCaptura",
    name: "graficaBusquedaCaptura",
    component: () => import("../views/GraficaBusquedaCapturaView.vue"),
  },
  {
    path: "/busquedaDeudores",
    name: "busquedaDeudores",
    component: () => import("../views/BusquedaDeudoresView.vue"),
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
    path: "/:catchAll(.*)",
    redirect: "/notFound",
  },
  {
    path: "/codigoPenal",
    name: "codigoPenal",
    component: () => import("../views/CodigoPenalView.vue"),
  },
  {
    path: "/gestionPolicia",
    name: "gestionPolicia",
    component: () => import("../views/GestionPoliciaView.vue"),
  },
  {
    path: '/rangos/:id?',
    name: "rangos",
    component: () => import("../views/RangoView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

const permisosMapear: { [key: string]: number[] } = {
  busquedaCiudadano: [ 4, 5, 6],
  busquedaPolicia: [ 4, 5, 6],
  gestionPolicia: [5, 6],
  rangos: [6]
};



router.beforeEach(async (to, from, next) => {
  const storeAuth = useListadoAuth();
  const storePolicia = useListadoPolicias();
  const tokenPolicia = localStorage.getItem('tokenPolicia');

  if (to.name === 'busquedaCiudadano') {
    if (tokenPolicia === null) {
      if (from.name !== 'home') {
        next({ name: 'home' });
      } else {
        next(false);
      }
      return;
    }

    if (storeAuth.infoPoliciasAuth.IdPolicia !== 0) {
      await storePolicia.cargarDatosPoliciasId(storeAuth.infoPoliciasAuth.IdPolicia);
    }

    const permisosUsuario = storePolicia.infoPoli.rango.permisos.map((permiso: Permiso) => permiso.idPermiso);
    const permisosRequeridos = permisosMapear[to.name] || [];

    const tienePermisos = permisosRequeridos.find(permiso => permisosUsuario.includes(permiso));

    if (tienePermisos == undefined) {
      next({ name: 'home' });
      alert('No tienes permisos')
    } else {
      next();
    }
  } else {
    next();
  }
});

router.beforeEach(async (to, from, next) => {
  const storeAuth = useListadoAuth();
  const storePolicia = useListadoPolicias();
  const tokenPolicia = localStorage.getItem('tokenPolicia');

  if (to.name === 'gestionPolicia') {
    if (tokenPolicia === null) {
      if (from.name !== 'home') {
        next({ name: 'home' });
      } else {
        next(false);
      }
      return;
    }

    if (storeAuth.infoPoliciasAuth.IdPolicia !== 0) {
      await storePolicia.cargarDatosPoliciasId(storeAuth.infoPoliciasAuth.IdPolicia);
    }

    const permisosUsuario = storePolicia.infoPoli.rango.permisos.map((permiso: Permiso) => permiso.idPermiso);
    const permisosRequeridos = permisosMapear[to.name] || [];

    const tienePermisos = permisosRequeridos.find(permiso => permisosUsuario.includes(permiso));

    if (tienePermisos == undefined) {
      next({ name: 'home' });
      alert('No tienes permisos')
    } else {
      next();
    }
  } else {
    next();
  }
});


router.beforeEach((to, from, next) => {
  if (
    to.name === "graficaBusquedaCaptura" &&
    localStorage.getItem("tokenPolicia") === null
  ) {
    if (from.name !== "home") {
      next({ name: "home" });
    } else {
      next(false);
    }
  } else {
    next();
  }
});

router.beforeEach(async (to, from, next) => {
  const storeAuth = useListadoAuth();
  const storePolicia = useListadoPolicias();
  const tokenPolicia = localStorage.getItem('tokenPolicia');

  if (to.name === 'rangos') {
    if (tokenPolicia === null) {
      if (from.name !== 'home') {
        next({ name: 'home' });
      } else {
        next(false);
      }
      return;
    }

    if (storeAuth.infoPoliciasAuth.IdPolicia !== 0) { 
      await storePolicia.cargarDatosPoliciasId(storeAuth.infoPoliciasAuth.IdPolicia);  
    }

    const permisosUsuario = storePolicia.infoPoli.rango.permisos.map((permiso: Permiso) => permiso.idPermiso);
    const permisosRequeridos = permisosMapear[to.name] || [];

    const tienePermisos = permisosRequeridos.find(permiso => permisosUsuario.includes(permiso));

    if (tienePermisos == undefined) {
      next({ name: 'home' });
      alert('No tienes permisos')
    } else {
      next();
    }
  } else {
    next();
  }
});

router.beforeEach((to, from, next) => {
  if (
    to.name === "busquedaVehiculo" &&
    localStorage.getItem("tokenPolicia") === null
  ) {
    if (from.name !== "home") {
      next({ name: "home" });
    } else {
      next(false);
    }
  } else {
    next();
  }
});


router.beforeEach(async (to, from, next) => {
  const storeAuth = useListadoAuth();
  const storePolicia = useListadoPolicias();
  const tokenPolicia = localStorage.getItem('tokenPolicia');

  if (to.name === 'busquedaPolicia') {
    if (tokenPolicia === null) {
      if (from.name !== 'home') {
        next({ name: 'home' });
      } else {
        next(false);
      }
      return;
    }

    if (storeAuth.infoPoliciasAuth.IdPolicia !== 0) {
      await storePolicia.cargarDatosPoliciasId(storeAuth.infoPoliciasAuth.IdPolicia);
    }

    const permisosUsuario = storePolicia.infoPoli.rango.permisos.map((permiso: Permiso) => permiso.idPermiso);
    const permisosRequeridos = permisosMapear[to.name] || [];

    const tienePermisos = permisosRequeridos.find(permiso => permisosUsuario.includes(permiso));

    if (tienePermisos == undefined) {
      next({ name: 'home' });
      alert('No tienes permisos')
    } else {
      next();
    }
  } else {
    next();
  }
});


router.beforeEach((to, from, next) => {
  if (
    to.name === "perfilCiudadano" &&
    localStorage.getItem("tokenUsuario") === null
  ) {
    if (from.name !== "home") {
      next({ name: "home" });
    } else {
      next(false);
    }
  } else {
    next();
  }
});

router.beforeEach((to, from, next) => {
  if (
    to.name === "ayuntamientoDashboard" &&
    localStorage.getItem("tokenAyuntamiento") === null
  ) {
    if (from.name !== "home") {
      next({ name: "home" });
    } else {
      next(false);
    }
  } else {
    next();
  }
});

router.beforeEach((to, from, next) => {
  if (
    to.name === "busquedaDeudores" &&
    localStorage.getItem("tokenPolicia") === null
  ) {
    if (from.name !== "home") {
      next({ name: "home" });
    } else {
      next(false);
    }
  } else {
    next();
  }
});

export default router;
