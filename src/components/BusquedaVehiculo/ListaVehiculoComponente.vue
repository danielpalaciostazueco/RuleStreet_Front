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
    <p v-else>{{$t('ListadoCiudadano.Title')}}</p>
  </div>
</template>
<style scoped>
.vehiculo_contenedor_tarjeta {
  @apply flex flex-col gap-8;
}

.vehiculo_menu_izquierda_contenedor {
  @apply flex flex-col h-full overflow-y-auto px-8 rounded-lg;
}

.vehiculo_menu_izquierda_contenedor p {
  @apply text-[color:var(--colorTextoTarjeta)];
}

.vehiculo_menu_izquierda_contenedor::-webkit-scrollbar {
  @apply w-2;
}

.vehiculo_menu_izquierda_contenedor::-webkit-scrollbar-track {
  @apply bg-[color:var(--colorFondoCiudadano2)];
}

.vehiculo_menu_izquierda_contenedor::-webkit-scrollbar-thumb {
  @apply bg-[color:var(--colorBlanco)] rounded hover:bg-[color:var(--colorFondoCiudadano)];
}

@media (max-width: 768px) {
  .vehiculo_menu_izquierda_contenedor {
    @apply px-4;
  }
}

@media (max-width: 480px) {
  .vehiculo_menu_izquierda_contenedor {
    @apply px-2;
  }

  .vehiculo_contenedor_tarjeta {
    @apply max-h-40 overflow-y-auto;
  }
}
</style>
