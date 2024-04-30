<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue';
import { useListadoVehiculos } from '@/stores/storeVehiculo';
import VehicleList from '@/components/BusquedaVehiculo/ListaVehiculoComponente.vue';

export default defineComponent({
  components: {
    VehicleList
  },
  setup() {
    const store = useListadoVehiculos();

    interface Vehicle {
      idVehiculo: number;
      matricula: string;
      marca: string;
      modelo: string;
      color: string;
      idCiudadano: number;
      Photo: string;
    }

    const searchQuery = ref('');
    const allVehicles = ref<Vehicle[]>([]);  
    const filteredVehicles = ref<Vehicle[]>([]);
    const selectedVehicle = ref<Vehicle | null>(null);  

    onMounted(async () => {
      await store.cargarDatosVehiculos();
      allVehicles.value = store.infoVehiculos.map(vehiculo => ({
        idVehiculo: vehiculo.idVehiculo,
        matricula: vehiculo.matricula,
        marca: vehiculo.marca,
        modelo: vehiculo.modelo,
        color: vehiculo.color,
        idCiudadano: vehiculo.idCiudadano,
        Photo: ''  
      }));
      filteredVehicles.value = [...allVehicles.value];
    });

    watch(searchQuery, (newQuery) => {
      if (newQuery.trim()) {
        filteredVehicles.value = allVehicles.value.filter(vehiculo => vehiculo.matricula.toLowerCase().includes(newQuery.toLowerCase()));
      } else {
        filteredVehicles.value = [...allVehicles.value];
      }
    }, { immediate: true });

    const handleVehicleSelected = (vehicle: Vehicle) => {
      selectedVehicle.value = vehicle;
      console.log(selectedVehicle.value);  
    };

    return {
      searchQuery,
      filteredVehicles,
      handleVehicleSelected
    };
  }
});
</script>

<template>
    <div class="vehiculo_menu_izquierda">
        <div class="vehiculo_menu_izquierda_titulo">
            <h2>LISTA DE VEHICULOS</h2>
        </div>
        <div class="vehiculo_busqueda">
            <input type="text" placeholder="Vehiculo" v-model="searchQuery">
            <button @click="searchVehicles">
                <svg class="vehiculo_icono" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path
                        d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                </svg>
            </button>
        </div>
        <VehicleList :vehicles="filteredVehicles" @vehicle-selected="handleVehicleSelected" />
    </div>
</template>
<style scoped>
.vehiculo_menu_izquierda {
    background-color: var(--colorFondoCiudadano2);
    width: 25%;
    display: flex;
    flex-direction: column;
    border-radius: 0.5rem;
    padding-top: 2rem;
    padding-bottom: 2rem;
    gap: 2rem;
}

.vehiculo_menu_izquierda_titulo {
    display: flex;
    justify-content: center;
    align-items: center;
}

.vehiculo_menu_izquierda_titulo h2 {
    background-color: var(--colorFondoCiudadano);
    border-radius: 0.7rem;
    height: 2.5rem;
    color: var(--colorTextoTarjeta);
    display: flex;
    align-items: center;
    width: 90%;
    display: flex;
    justify-content: center;
}

.vehiculo_busqueda {
    display: flex;
    align-items: center;
    justify-content: center;
}

.vehiculo_busqueda input {
    height: 2rem;
    outline: none;
    background-color: var(--colorBusquedaCiudadanoBusqueda);
    border: 1px solid var(--colorBusquedaCiudadanoBusqueda);
    color: var(--colorBlanco);
    padding-left: 1rem;
}

.vehiculo_busqueda input::placeholder {
    color: var(--colorBlanco);
}

.vehiculo_busqueda button {
    width: 5rem;
    height: 2rem;
    background-color: var(--colorBotonBusquedaCiudadano);
    border: none;
}

.vehiculo_busqueda button:hover {
    background-color: var(--colorBotonBusquedaCiudadanoActivo);
    cursor: pointer;
}

.vehiculo_icono {
    width: 1rem;
    height: 1rem;
    fill: var(--colorSvg);
    transition: transform 0.3s ease, width 0.3s ease, height 0.3s ease;
}
</style>