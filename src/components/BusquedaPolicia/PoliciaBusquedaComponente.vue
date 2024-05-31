<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { useListadoPolicias } from '@/stores/storePolicia';
import PoliciaList from '@/components/BusquedaPolicia/ListaPoliciaComponente.vue';

export default defineComponent({
  components: {
    PoliciaList
  },
  setup() {
    const store = useListadoPolicias();

    onMounted(() => {
      store.cargarDatosPolicias();
    });

    interface Permiso {
      idPermiso: number;
      nombre: string;
      name: string;
    }

    interface Rango {
      idRango: number;
      nombre: string;
      name: string;
      salario: number;
      isLocal: boolean;
      permisos: Permiso[];
    }

    interface Ciudadano {
      idCiudadano: number;
      nombre: string;
      apellidos: string;
      dni: string;
      genero: string;
      gender: string;
      nacionalidad: string;
      nationality: string;
      fechaNacimiento: Date;
      direccion: string;
      address: string;
      numeroTelefono: number;
      numeroCuentaBancaria: string;
      isPoli: boolean;
      isBusquedaYCaptura: boolean;
      isPeligroso: boolean;
      multas: any[];
      vehiculos: any[];
    }

    interface Policia {
      idPolicia: number;
      idCiudadano: number;
      rango: Rango;
      numeroPlaca: string;
      ciudadano: Ciudadano;
      contrasena?: string;
      isPolicia: boolean;
    }

    const hasSearched = ref(false);
    const searchQuery = ref('');
    const Policia = ref<Policia[]>([]);

    function searchPolicia() {
      hasSearched.value = true;
      if (searchQuery.value.trim()) {
        Policia.value = store.infoPolicias.filter((policia: Policia) =>
          policia.ciudadano.nombre.toLowerCase().includes(searchQuery.value.toLowerCase())
        );
      } else {
        Policia.value = [];
      }
    }

    return {
      hasSearched,
      searchQuery,
      Policia,
      searchPolicia
    };
  }
});

</script>

<template>
  <div class="policia_menu_izquierda">
    <div class="policia_menu_izquierda_titulo">
      <h2>{{ $t('ListadoPolicia.Title') }}</h2>
    </div>
    <div class="policia_busqueda">
      <input type="text" placeholder="Policia" v-model="searchQuery">
      <button @click="searchPolicia">
        <svg class="policia_icono" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path
            d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
        </svg>
      </button>
    </div>
    <PoliciaList :policias="Policia" />
  </div>
</template>
<style scoped>
.policia_menu_izquierda {
  @apply bg-[color:var(--colorFondoCiudadano2)] w-[25%] flex flex-col gap-4 py-4 rounded-lg;
}

.policia_menu_izquierda_titulo {
  @apply flex justify-center items-center;
}

.policia_menu_izquierda_titulo h2 {
  @apply bg-[color:var(--colorFondoCiudadano)] h-8 text-[color:var(--colorTextoTarjeta)] flex items-center w-3/4 flex justify-center text-base rounded-[0.5rem];
}

.policia_busqueda {
  @apply flex items-center justify-center;
}

.policia_busqueda input {
  @apply h-6 bg-[color:var(--colorBusquedaCiudadanoBusqueda)] border border-[color:var(--colorBusquedaCiudadanoBusqueda)] text-[color:var(--colorBlanco)] pl-2 border-solid;
  outline: none;
}

.policia_busqueda input::placeholder {
  @apply text-[color:var(--colorBlanco)];
}

.policia_busqueda button {
  @apply h-6 w-[10%] bg-[color:var(--colorBusquedaCiudadanoPerfilBoton)];
}

.policia_icono {
  @apply h-3 w-3 fill-[var(--colorSvg)] ml-2.5;
  transition: transform 0.3s ease, width 0.3s ease, height 0.3s ease;
}

.policia_lista {
  @apply overflow-y-auto max-h-[30rem];
}

@media (max-width: 1329px) {
  .policia_busqueda button[data-v-bfd5f251] {
    @apply h-6 w-[3%] bg-[color:var(--colorBusquedaCiudadanoPerfilBoton)];
  }
}

@media (max-width: 1024px) {
  .policia_menu_izquierda {
    @apply w-[100%];
  }

  .policia_menu_izquierda_titulo h2 {
    @apply text-sm;
  }

  .policia_busqueda input {
    @apply text-xs;
  }

  .policia_busqueda button[data-v-bfd5f251] {
    @apply h-6 w-[3%] bg-[color:var(--colorBusquedaCiudadanoPerfilBoton)];
  }

  .policia_icono {
    @apply ml-2.5;
    @apply w-3 h-3 fill-[var(--colorSvg)];
    transition: transform 0.3s ease, width 0.3s ease, height 0.3s ease;
  }

  .policia_lista {
    @apply max-h-[20rem];
  }
}

@media (max-width: 768px) {
  .policia_menu_izquierda {
    @apply p-0.5;
    @apply w-full;
  }

  .policia_menu_izquierda_titulo h2 {
    @apply w-4/5;
    @apply text-xs;
  }

  .policia_busqueda input {
    @apply w-full text-xs;
  }

  .policia_busqueda button {
    @apply h-6 w-[5%] bg-[color:var(--colorBusquedaCiudadanoPerfilBoton)];
  }

  .policia_icono[data-v-bfd5f251] {
    @apply h-2.5 w-2.5 ml-1;
  }

  .policia_lista {
    @apply max-h-[15rem];
  }
}

@media (max-width: 480px) {
  .policia_menu_izquierda {
    @apply w-full py-2;
  }

  .policia_menu_izquierda_titulo h2 {
    @apply text-xs;
  }

  .policia_menu_izquierda_contenedor {
    @apply max-h-[200px] overflow-y-auto;
  }

  .policia_busqueda input[data-v-bfd5f251] {
    @apply w-[70%] text-xs leading-4;
  }

  .policia_busqueda button[data-v-bfd5f251][data-v-bfd5f251] {
    @apply h-6 w-[6%] bg-[color:var(--colorBusquedaCiudadanoPerfilBoton)];
  }

  .policia_icono[data-v-845bb2b1] {
    @apply h-2 w-2 ml-2.5;
  }

  .policia_lista {
    @apply max-h-[10rem];
  }
}
</style>
