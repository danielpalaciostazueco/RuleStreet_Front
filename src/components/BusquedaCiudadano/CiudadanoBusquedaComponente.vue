<script lang="ts">
import { defineComponent, ref, onMounted, type Ref } from 'vue';
import CitizenList from '@/components/BusquedaCiudadano/ListaCiudadanosComponente.vue';
import { useListadoCiudadanos } from '@/stores/storeCiudadano';


interface Vehiculo {
  idVehiculo: number;
  matricula: string;
  marca: string;
  modelo: string;
  color: string;
  enColor: string;
  idCiudadano: number;
}
export interface CodigoPenal {
  idCodigoPenal: number;
  articulo: string;
  article: string;
  descripcion: string;
  description: string;
  precio: number;
  sentencia: string;
}
interface Multa {
  idMulta: number;
  idPolicia: number;
  fecha: string;
  precio: number;
  articuloPenal: string;
  descripcion: string;
  description: string;
  pagada: boolean;
  idCiudadano: number;
  codigoPenal: CodigoPenal[];
}

export interface Ciudadano {
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
  numeroTelefono: string;
  numeroCuentaBancaria: string;
  isPoli: boolean;
  isBusquedaYCaptura: boolean;
  imagenUrl: string;
  isPeligroso: boolean;
  diaIntroducidoListaCaptura: Date;
  multas: Multa[];
  vehiculos: Vehiculo[];
  trabajo: string;
}

interface Deudores {
  idCiudadano: number;
  nombre: string;
  apellidos: string;
  dni: string;
  genero: string;
  gender: string;
  nacionalidad: string;
  nationality: string;
  fechaNacimiento: Date;
  cantidad: number;
  imagenUrl: string;
}
export default defineComponent({
  components: {
    CitizenList
  },
  setup() {
    const { infoCiudadanos, cargarDatosCiudadanos } = useListadoCiudadanos();
    const searchQuery = ref('');
    const filteredCitizens: Ref<Ciudadano[]> = ref([]);

    onMounted(async () => {
      await cargarDatosCiudadanos();
    });

    function searchCitizens() {
      if (searchQuery.value.trim()) {
        filteredCitizens.value = infoCiudadanos.filter((citizen: Ciudadano) =>
          citizen.nombre.toLowerCase().includes(searchQuery.value.toLowerCase())
        );
      } else {
        filteredCitizens.value = [];
      }
    }

    return { filteredCitizens, searchCitizens, searchQuery };
  }
});
</script>

<template>
  <div class="ciudadano_menu_izquierda">
    <div class="ciudadano_menu_izquierda_titulo">
      <h2>{{ $t('BusquedaCiudadano.List') }}</h2>
    </div>
    <div class="ciudadano_busqueda">
      <input type="text" placeholder="Ciudadano" v-model="searchQuery">
      <button @click="searchCitizens">
        <svg class="ciudadano_icono" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path
            d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
        </svg>
      </button>
    </div>
    <CitizenList :citizens="filteredCitizens" />
  </div>
</template>


<style scoped>
.ciudadano_menu_izquierda {
  @apply bg-[color:var(--colorFondoCiudadano2)] w-[25%] flex flex-col gap-4 py-4 rounded-lg;
}

.ciudadano_menu_izquierda_titulo {
  @apply flex justify-center items-center;
}

.ciudadano_menu_izquierda_titulo h2 {
  @apply bg-[color:var(--colorFondoCiudadano)] h-8 text-[color:var(--colorTextoTarjeta)] flex items-center w-3/4 flex justify-center text-base rounded-[0.5rem];
}

.ciudadano_busqueda {
  @apply flex items-center justify-center;
}

.ciudadano_busqueda input {
  @apply h-6 bg-[color:var(--colorBusquedaCiudadanoBusqueda)] border border-[color:var(--colorBusquedaCiudadanoBusqueda)] text-[color:var(--colorBlanco)] pl-2 border-solid;
  outline: none;
}

.ciudadano_busqueda input::placeholder {
  @apply text-[color:var(--colorBlanco)];
}

.ciudadano_busqueda button[data-v-845bb2b1] {
  @apply h-6 w-8 bg-[color:var(--colorBotonBusquedaCiudadano)] border-[none];
}

.ciudadano_icono {
  @apply ml-2.5;
  @apply w-3 h-3 fill-[var(--colorSvg)];
  transition: transform 0.3s ease, width 0.3s ease, height 0.3s ease;
}

.ciudadano_lista {
  @apply overflow-y-auto max-h-[30rem];
}

@media (max-width: 1024px) {
  .ciudadano_menu_izquierda {
    @apply w-[100%];
  }

  .ciudadano_menu_izquierda_titulo h2 {
    @apply text-sm;
  }

  .ciudadano_busqueda input {
    @apply text-xs;
  }

  .ciudadano_busqueda button[data-v-845bb2b1] {
    @apply h-6 w-8;
  }

  .ciudadano_icono {
    @apply ml-2.5;
    @apply w-3 h-3 fill-[var(--colorSvg)];
    transition: transform 0.3s ease, width 0.3s ease, height 0.3s ease;
  }

  .ciudadano_lista {
    @apply max-h-[20rem];
  }
}

@media (max-width: 768px) {
  .ciudadano_menu_izquierda {
    @apply p-0.5;
    @apply w-full;
  }

  .ciudadano_menu_izquierda_titulo h2 {
    @apply w-4/5;
    @apply text-xs;
  }

  .ciudadano_busqueda input {
    @apply w-full text-xs;
  }

  .ciudadano_busqueda button {
    @apply w-full h-6;
  }

  .ciudadano_icono {
    @apply w-2.5 h-2.5;
  }

  .ciudadano_lista {
    @apply max-h-[15rem];
  }
}

@media (max-width: 480px) {
  .ciudadano_menu_izquierda {
    @apply w-full py-2;
  }

  .ciudadano_menu_izquierda_titulo h2 {
    @apply text-xs;
  }

  .ciudadano_menu_izquierda_contenedor {
    @apply max-h-[200px] overflow-y-auto;
  }

  .ciudadano_busqueda input {
    @apply w-full text-xs;
  }

  .ciudadano_busqueda button[data-v-845bb2b1] {
    @apply h-6 w-[10%];
  }

  .ciudadano_icono[data-v-845bb2b1] {
    @apply h-2 w-2 ml-2.5;
  }

  .ciudadano_lista {
    @apply max-h-[10rem];
  }
}
</style>