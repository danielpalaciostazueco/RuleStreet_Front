<script lang="ts">
import { defineComponent, ref, computed, watch, onMounted } from 'vue';
import ReturnButton from '@/components/ComponentesGenerales/BotonPaginaPrincipalComponente.vue';
import { useRoute } from 'vue-router';
import { useListadoVehiculos } from '@/stores/storeVehiculo';

interface Vehicle {
    idVehiculo: number;
    matricula: string;
    marca: string;
    modelo: string;
    color: string;
    idCiudadano: number;
    Photo: string;
    ciudadano: {
        nombre: string;
    };
}

export default defineComponent({
    components: {
        ReturnButton
    },
    setup() {
        const route = useRoute();
        const store = useListadoVehiculos();
        const vehicleid = ref(parseInt(parseRouteParam(route.params.id)));

        const vehicleDetails = computed<Vehicle>(() => {
            return store.infoVehiculos.find(c => c.idVehiculo === vehicleid.value) || {
                idVehiculo: 0,
                matricula: '',
                marca: '',
                modelo: '',
                color: '',
                idCiudadano: 0,
                Photo: '',
                ciudadano: {              
                    nombre: '',                                       
                }
            };
        });
    
        watch(() => route.params.id, (newId) => {
            const parsedId = parseInt(parseRouteParam(newId));
            if (parsedId) {
                vehicleid.value = parsedId;
                store.cargarDatosVehiculosId(parsedId);
            }
        }, { immediate: true });

        onMounted(() => {
            if (vehicleid.value) {
                store.cargarDatosVehiculosId(vehicleid.value);
            }
        });

        return {
            vehicleDetails,
            vehicleid
        };
    }
});

function parseRouteParam(param: string | string[]): string {
    return Array.isArray(param) ? param[0] : param;
}
</script>


<template>
    <div class="ciudadano_menu_derecha">
        <div class="ciudadano_menu_derecha_titulo">
            <h2>PERFIL DEL VEHICULO</h2>
        </div>
        <div class="ciudadano_perfil">
            <p v-if="!vehicleid">SELECIONA UN VEHICULO PARA CARGAR LA INFORMACIÓN</p>
            <template v-else>
                <div class="ciudadano_perfil_usuario">
                <div class="ciudadano_perfil_usuario_izquierda">
                    <img src="https://via.placeholder.com/150" alt="">
                </div>
                <div class="ciudadano_perfil_usuario_derecha">
                    <div class="ciudadano_tarjeta">
                        <p>Matricula</p>
                        <p>{{ vehicleDetails.matricula }}</p>
                    </div>
                    <div class="ciudadano_tarjeta">
                        <p>Modelo</p>
                        <p>{{ vehicleDetails.modelo }}</p>
                    </div>
                    <div class="ciudadano_tarjeta">
                        <p>Marca</p>
                        <p>{{ vehicleDetails.marca }}</p>
                    </div>
                    <div class="ciudadano_tarjeta">
                        <p>Color</p>
                        <p>{{ vehicleDetails.color }}</p>
                    </div>
                    <div class="ciudadano_tarjeta">
                        <p>Dueño</p>
                        <p>{{ vehicleDetails.ciudadano.nombre }}</p>
                    </div>

                </div>
            </div>
            <div class="ciudadano_perfil_botones">
                <div class="ciudadano_perfil_botones_izquierda">
                    <h2>EN BUSQUEDA Y CAPTURA</h2>
                    <div class="ciudadano_perfil_boton">
                        <input type="radio" id="no_izquierda" name="response_izquierda" checked>
                        <label for="no_izquierda">No</label>
                        <input type="radio" id="yes_izquierda" name="response_izquierda">
                        <label for="yes_izquierda">Sí</label>
                    </div>
                </div>
            </div>
            </template>          
            <return-button />
        </div>
    </div>
</template>

<style>
.ciudadano_menu_izquierda_contenedor {
    display: flex;
    flex-direction: column;
    border-radius: 0.5rem;
    padding-left: 2rem;
    padding-right: 2rem;
    height: 100%;
    overflow-y: auto;
    align-items: center;
}

.ciudadano_menu_izquierda_contenedor p {
    color: var(--colorTextoTarjeta);
}

.ciudadano_menu_izquierda_contenedor::-webkit-scrollbar {
    width: 8px;
}

.ciudadano_menu_izquierda_contenedor::-webkit-scrollbar-track {
    background-color: var(--colorFondoCiudadano2);
}

.ciudadano_menu_izquierda_contenedor::-webkit-scrollbar-thumb {
    background-color: var(--colorBlanco);
    border-radius: 4px;
}

.ciudadano_menu_izquierda_contenedor::-webkit-scrollbar-thumb:hover {
    background-color: var(--colorFondoCiudadano);
}

.ciudadano_perfil_usuario {
    display: flex;
    width: 100%;
    gap: 3rem;
}

.ciudadano_perfil_usuario_izquierda {
    display: flex;
    justify-content: center;
    align-items: center;
}

.ciudadano_perfil_usuario_izquierda img {
    width: 15rem;
    height: 15rem;
}

.ciudadano_perfil_usuario_derecha {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    justify-content: center;
    align-items: center;
    width: 100%;
}

.ciudadano_tarjeta {
    background-color: var(--colorBusquedaCiudadanoTarjeta);
    border-radius: 0.7rem;
    width: 12rem;
    height: 4rem;
    display: flex;
    flex-direction: column;
    padding-left: 2rem;
    justify-content: center;
    gap: 0.5rem;
}

.ciudadano_tarjeta p {
    font-size: 16px;
}

.ciudadano_perfil_botones {
    display: flex;
    gap: 2rem;
    background-color: var(--colorBusquedaCiudadanoTarjeta);
    width: 100%;
    height: 8rem;
    border-radius: 0.7rem;
    justify-content: center;
    align-items: center;
}

.ciudadano_perfil_boton input[type="radio"] {
    display: none;
}

.ciudadano_perfil_boton label {
    display: inline-block;
    width: 13rem;
    padding: 10px;
    text-align: center;
    color: var(--colorBlanco);
    background-color: var(--colorBusquedaCiudadanoTarjeta);
    cursor: pointer;
    border: 1px solid var(--colorTextoTarjeta);
    color: var(--colorTextoTarjeta)
}

#no_izquierda:checked+label,
#no_derecha:checked+label {
    background-color: var(--colorBusquedaCiudadanoPerfilBoton);
    color: var(--colorTextoTarjeta)
}

#yes_izquierda:checked+label,
#yes_derecha:checked+label {
    background-color: var(--colorBusquedaCiudadanoPerfilBoton);
    color: var(--colorTextoTarjeta)
}

.ciudadano_perfil_botones_derecha {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
}

.ciudadano_perfil_botones_izquierda {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
}

.ciudadano_perfil_botones_derecha h2 {
    color: var(--colorTextoTarjeta);
}

.ciudadano_perfil_botones_izquierda h2 {
    color: var(--colorTextoTarjeta);
}

.ciudadano_perfil_otros {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    justify-content: center;
    align-items: center;
    width: 100%;
}

.ciudadano_perfil_otros_container {
    display: flex;
    background-color: var(--colorBusquedaCiudadanoTarjeta);
    border-radius: 0.7rem;
    width: 100%;
    height: 20rem;

}

.ciudadano_icono {
    width: 2rem;
    height: 1rem;
}

.ciudadano_perfil_notasdiv {
    display: flex;
    width: 100%;
    padding: 1rem;
    gap: 0.5rem;
}

.ciudadano_perfil_notasdiv p {
    font-size: 16px;
}

.ciudadano_perfil_multas {
    display: flex;
    width: 100%;
    justify-content: flex-end;
    padding: 1rem;
}

.ciudadano_perfil_multas p {
    font-size: 16px;
}

.ciudadano_perfil {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
}

.ciudadano_perfil p {
    color: var(--colorTextoTarjeta);
}
</style>
