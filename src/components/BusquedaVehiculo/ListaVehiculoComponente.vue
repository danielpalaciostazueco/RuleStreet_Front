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
                Photo: vehicle.Photo,  
                ciudadano: vehicle.ciudadano
            }" />

        </div>
        <p v-else>REALIZA UNA BUSQUEDA PARA MOSTRAR RESULTADOS</p>
    </div>
</template>

<style scoped>

.vehicle_menu_derecha {
  @apply bg-[color:var(--colorFondoCiudadano2)] w-9/12 flex flex-col gap-8 py-8 rounded-lg;
}
.vehicle_menu_derecha_titulo {
  @apply flex justify-center items-center;
}
.vehicle_menu_derecha_titulo h2 {
  @apply bg-[color:var(--colorFondoCiudadano)] h-10 text-[color:var(--colorTextoTarjeta)] flex items-center w-4/5 flex justify-center rounded-[0.7rem];
}
.vehicle_perfil {
  @apply flex items-center justify-center flex-col justify-between h-full p-8;
}
.vehicle_perfil p {
  @apply text-[color:var(--colorTextoTarjeta)] text-[2.5rem];
}
.vehicle_boton_contenedor {
  @apply flex justify-center;
}
.vehicle_contenedor_tarjeta {
  @apply flex flex-col gap-8;
}
.vehiculo_menu_izquierda {
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
  @apply w-20 h-8 bg-[color:var(--colorBotonBusquedaCiudadano)] border-[none] hover:bg-[color:var(--colorBotonBusquedaCiudadanoActivo)] hover:cursor-pointer;
}
.vehiculo_icono {
  @apply w-4 h-4 fill-[var(--colorSvg)];
  transition: transform 0.3s ease, width 0.3s ease, height 0.3s ease;
}
vehiculo_menu_izquierda_contenedor {
  @apply flex flex-col h-full overflow-y-auto items-center px-8 rounded-lg;

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

</style>