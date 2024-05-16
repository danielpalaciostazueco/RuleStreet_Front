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
  idCiudadano: number;
}

interface Multa {
  idMulta: number;
  idPolicia: number;
  fecha: string;
  precio: number;
  articuloPenal: string;
  descripcion: string;
  pagada: boolean;
  idCiudadano: number;
}

interface Ciudadano {
  idCiudadano: number;
  nombre: string;
  apellidos: string;
  dni: string;
  genero: string;
  nacionalidad: string;
  fechaNacimiento: Date;
  direccion: string;
  numeroTelefono: string;
  numeroCuentaBancaria: string;
  isPoli: boolean;
  isBusquedaYCaptura: boolean;
  isPeligroso: boolean;
  multas: Multa[];
  vehiculos: Vehiculo[];
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
        filteredCitizens.value = infoCiudadanos.filter(citizen =>
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
      <h2>LISTA DE CIUDADANOS</h2>
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

<style>
.ciudadano_menu_izquierda {
  background-color: var(--colorFondoCiudadano2);
  width: 30%;
  display: flex;
  flex-direction: column;
  border-radius: 0.5rem;
  padding-top: 2rem;
  padding-bottom: 2rem;
  gap: 2rem;
}

.ciudadano_menu_izquierda_titulo {
  display: flex;
  justify-content: center;
  align-items: center;
}

.ciudadano_menu_izquierda_titulo h2 {
  background-color: var(--colorFondoCiudadano);
  border-radius: 0.7rem;
  height: 2.5rem;
  color: var(--colorTextoTarjeta);
  display: flex;
  align-items: center;
  width: 80%;
  display: flex;
  justify-content: center;
  font-size: 18px;
}

.ciudadano_busqueda {
  display: flex;
  align-items: center;
  justify-content: center;
}

.ciudadano_busqueda input {
  height: 2rem;
  outline: none;
  background-color: var(--colorBusquedaCiudadanoBusqueda);
  border: 1px solid var(--colorBusquedaCiudadanoBusqueda);
  color: var(--colorBlanco);
  padding-left: 1rem;
}

.ciudadano_busqueda input::placeholder {
  color: var(--colorBlanco);
}

.ciudadano_busqueda button {
  width: 5rem;
  height: 2rem;
  background-color: var(--colorBotonBusquedaCiudadano);
  border: none;
}

.ciudadano_busqueda button:hover {
  background-color: var(--colorBotonBusquedaCiudadanoActivo);
  cursor: pointer;
}

.ciudadano_icono {
  width: 1rem;
  height: 1rem;
  fill: var(--colorSvg);
  transition: transform 0.3s ease, width 0.3s ease, height 0.3s ease;
}
</style>