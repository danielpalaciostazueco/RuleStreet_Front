<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import VehicleCard from '@/components/BusquedaVehiculo/TarjetaVehiculoComponente.vue';

export default defineComponent({
    components: {
        VehicleCard
    },
    props: {
        vehicles: Array as PropType<Array<{ idVehiculo: number; matricula: string; modelo: string; color: string; idCiudadano: number, Photo: string }>>
    }
});
</script>

<template>
    <div class="vehiculo_menu_izquierda_contenedor">
        <div class="vehiculo_contenedor_tarjeta" v-if="vehicles && vehicles.length > 0">
            <VehicleCard v-for="vehicle in vehicles" :key="vehicle.idVehiculo" :vehicle="{ idVehiculo: vehicle.idVehiculo, matricula: vehicle.matricula, modelo: vehicle.modelo, color: vehicle.color, idCiudadano: vehicle.idCiudadano, Photo: vehicle.Photo }" :vehicles="vehicles" />
        </div>
        <p v-else>REALIZA UNA BUSQUEDA PARA MOSTRAR RESULTADOS</p>
    </div>
</template>

<style scoped>
.vehicle_menu_derecha {
    background-color: var(--colorFondoCiudadano2);
    width: 75%;
    display: flex;
    flex-direction: column;
    border-radius: 0.5rem;
    padding-top: 2rem;
    padding-bottom: 2rem;
    gap: 2rem;
}

.vehicle_menu_derecha_titulo {
    display: flex;
    justify-content: center;
    align-items: center;
}

.vehicle_menu_derecha_titulo h2 {
    background-color: var(--colorFondoCiudadano);
    border-radius: 0.7rem;
    height: 2.5rem;
    color: var(--colorTextoTarjeta);
    display: flex;
    align-items: center;
    width: 80%;
    display: flex;
    justify-content: center;
}

.vehicle_perfil {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
}

.vehicle_perfil p {
    color: var(--colorTextoTarjeta);
    font-size: 2.5rem;
}

.vehicle_boton_contenedor {
    display: flex;
    justify-content: center;
}

.vehicle_contenedor_tarjeta{
    display: flex;
    flex-direction: column;
    gap: 2rem;
}

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
vehiculo_menu_izquierda_contenedor {
    display: flex;
    flex-direction: column;
    border-radius: 0.5rem;
    padding-left: 2rem;
    padding-right: 2rem;
    height: 100%;
    overflow-y: auto;
    align-items: center;
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
</style>