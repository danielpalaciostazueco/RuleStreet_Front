<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import VehicleCard from '@/components/BusquedaVehiculo/TarjetaVehiculoComponente.vue';
import type { Vehiculo } from '@/stores/storeVehiculo';

export default defineComponent({
  components: {
    VehicleCard
  },
  props: {
    vehicles: Array as PropType<Vehiculo[]>
  }


});
</script>


<template>
  <div class="vehiculo_menu_izquierda_contenedor">
    <div class="vehiculo_contenedor_tarjeta" v-if="vehicles && vehicles.length > 0">
      <VehicleCard v-for="vehicle in vehicles" :key="vehicle.idVehiculo" :vehicle="{
        idVehiculo: vehicle.idVehiculo,
        matricula: vehicle.matricula,
        modelo: vehicle.modelo,
        marca: vehicle.marca,
        color: vehicle.color,
        Photo: vehicle.photo,
        ciudadano: vehicle.ciudadano
      }" />

    </div>
    <p v-else>REALIZA UNA BUSQUEDA PARA MOSTRAR RESULTADOS</p>
  </div>
</template>
<style scoped>
.vehiculo_contenedor_tarjeta {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.vehiculo_menu_izquierda_contenedor {
  display: flex;
  flex-direction: column;
  border-radius: 0.5rem;
  padding-left: 2rem;
  padding-right: 2rem;
  height: 100%;
  overflow-y: auto;
}

.vehiculo_menu_izquierda_contenedor p {
  color: var(--colorTextoTarjeta);
}

.vehiculo_menu_izquierda_contenedor::-webkit-scrollbar {
  width: 8px;
}

.vehiculo_menu_izquierda_contenedor::-webkit-scrollbar-track {
  background-color: var(--colorFondoCiudadano2);
}

.vehiculo_menu_izquierda_contenedor::-webkit-scrollbar-thumb {
  background-color: var(--colorBlanco);
  border-radius: 4px;
}

.vehiculo_menu_izquierda_contenedor::-webkit-scrollbar-thumb:hover {
  background-color: var(--colorFondoCiudadano);
}


@media (max-width: 768px) {
  .vehiculo_menu_izquierda_contenedor {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}

@media (max-width: 480px) {
  .vehiculo_menu_izquierda_contenedor {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }

  .vehiculo_contenedor_tarjeta {
    max-height: 10rem;

    overflow-y: auto;
  }
}
</style>
