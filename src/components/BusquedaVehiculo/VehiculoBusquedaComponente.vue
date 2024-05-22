<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import VehicleList from '@/components/BusquedaVehiculo/ListaVehiculoComponente.vue';
import { useListadoVehiculos } from '@/stores/storeVehiculo';

export default defineComponent({
  components: {
    VehicleList
  },
  setup() {
    const { infoVehiculos, cargarDatosVehiculos } = useListadoVehiculos();
    const searchQuery = ref('');
    const filteredVehicles = ref([]);

    onMounted(async () => {
      await cargarDatosVehiculos();
    });

    function searchVehicles() {
      if (searchQuery.value.trim()) {
        filteredVehicles.value = infoVehiculos.filter(vehicle =>
          vehicle.matricula.toLowerCase().includes(searchQuery.value.toLowerCase())
        );
      } else {
        filteredVehicles.value = [];
      }
    }

    return { filteredVehicles, searchVehicles, searchQuery };
  }
});
</script>



<template>
  <div class="vehiculo_menu_izquierda">
    <div class="vehiculo_menu_izquierda_titulo">
      <h2>{{ $t('VehiculoBusqueda.List') }}</h2>
    </div>
    <div class="vehiculo_busqueda">
      <input type="text" placeholder="Matrícula del vehículo" v-model="searchQuery">
      <button @click="searchVehicles">
        <svg class="vehiculo_icono" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path
            d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
        </svg>
      </button>
    </div>
    <VehicleList :vehicles="filteredVehicles" />
  </div>
</template>
<style scoped>
vehiculo_menu_izquierda {
  @apply bg-[color:var(--colorFondoCiudadano2)] w-3/12 flex flex-col gap-8 py-8 rounded-lg;
}

.vehiculo_menu_izquierda_titulo {
  @apply flex justify-center items-center;
}

.vehiculo_menu_izquierda_titulo h2 {
  @apply bg-[color:var(--colorFondoCiudadano)] h-10 text-[color:var(--colorTextoTarjeta)] flex items-center w-[90%] flex justify-center rounded-[0.7rem];
}

.vehiculo_busqueda {
  @apply flex items-center justify-center;
}

.vehiculo_busqueda input {
  @apply h-8 bg-[color:var(--colorBusquedaCiudadanoBusqueda)] border border-[color:var(--colorBusquedaCiudadanoBusqueda)] text-[color:var(--colorBlanco)] pl-4 border-solid;
  outline: none;
}

.vehiculo_busqueda input::placeholder {
  @apply text-[color:var(--colorBlanco)];
}

.vehiculo_busqueda button {
  @apply w-8 h-8 bg-[color:var(--colorBotonBusquedaCiudadano)] border-[none] hover:bg-[color:var(--colorBotonBusquedaCiudadanoActivo)] hover:cursor-pointer;
}

.vehiculo_icono {
  @apply w-4 h-4 fill-[var(--colorSvg)] ml-1.5;
  transition: transform 0.3s ease, width 0.3s ease, height 0.3s ease;
}
</style>