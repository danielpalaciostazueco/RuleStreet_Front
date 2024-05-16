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

<style scoped>
.ciudadano_menu_derecha {
  @apply bg-[color:var(--colorFondoCiudadano2)] w-[70%] flex flex-col gap-8 py-8 rounded-lg;
}

.ciudadano_menu_derecha_titulo {
  @apply flex justify-center items-center;
}

.ciudadano_menu_derecha_titulo h2 {
  @apply bg-[color:var(--colorFondoCiudadano)] h-10 text-[color:var(--colorTextoTarjeta)] flex items-center w-4/5 flex justify-center text-lg rounded-[0.7rem];
}

.ciudadano_perfil_usuario {
  @apply flex w-full gap-12;
}

.ciudadano_perfil_usuario_izquierda {
  @apply flex justify-center items-center;
}

.ciudadano_perfil_usuario_izquierda img {
  @apply w-60 h-60;
}

.ciudadano_perfil_usuario_derecha {
  @apply grid grid-cols-[repeat(3,1fr)] gap-4 justify-center items-center w-full;
}

.ciudadano_tarjeta {
  @apply bg-[color:var(--colorBusquedaCiudadanoTarjeta)] w-48 h-16 flex flex-col justify-center gap-2 pl-8 rounded-[0.7rem];
}

.ciudadano_tarjeta p {
  @apply text-base;
}

.ciudadano_perfil_botones {
  @apply flex gap-8 bg-[color:var(--colorBusquedaCiudadanoTarjeta)] w-full h-32 justify-center items-center rounded-[0.7rem];
  margin-top: 1rem;
}

.ciudadano_perfil_boton input[type="radio"] {
  @apply hidden;
}

.ciudadano_perfil_boton label {
  @apply inline-block w-52 text-center text-[color:var(--colorBlanco)] bg-[color:var(--colorBusquedaCiudadanoTarjeta)] cursor-pointer border border-[color:var(--colorTextoTarjeta)] text-[color:var(--colorTextoTarjeta)] p-2.5 border-solid;
}

#no_izquierda:checked + label,
#no_derecha:checked + label {
  @apply bg-[color:var(--colorBusquedaCiudadanoPerfilBoton)] text-[color:var(--colorTextoTarjeta)];
}

#yes_izquierda:checked + label,
#yes_derecha:checked + label {
  @apply bg-[color:var(--colorBusquedaCiudadanoPerfilBoton)] text-[color:var(--colorTextoTarjeta)];
}

.ciudadano_perfil_botones_derecha {
  @apply flex flex-col items-center gap-4;
}

.ciudadano_perfil_botones_izquierda {
  @apply flex flex-col items-center gap-4;
}

.ciudadano_perfil_botones_derecha h2 {
  @apply text-[color:var(--colorTextoTarjeta)];
}

.ciudadano_perfil_botones_izquierda h2 {
  @apply text-[color:var(--colorTextoTarjeta)];
}

.ciudadano_perfil_otros {
  @apply grid grid-cols-[repeat(2,1fr)] gap-4 justify-center items-center w-full;
}

.ciudadano_perfil_otros_container {
  @apply flex bg-[color:var(--colorBusquedaCiudadanoTarjeta)] w-full h-80 rounded-[0.7rem];
}

.ciudadano_icono {
  @apply w-8 h-4;
}

.ciudadano_perfil_notasdiv {
  @apply flex w-full gap-2 flex-col p-4;
}

.ciudadano_perfil_notasdiv p {
  @apply text-base;
}

.ciudadano_perfil_multas {
  @apply flex w-full justify-end;
}

.ciudadano_perfil_multas p {
  @apply text-base;
}

.ciudadano_perfil {
  @apply flex items-center justify-center flex-col justify-between h-full p-8;
}

.ciudadano_perfil p {
  @apply text-[color:var(--colorTextoTarjeta)];
}

.ciudadano_perfil_notasdiv_titulo {
  @apply flex;
}

.notas_container {
  @apply w-full h-full overflow-y-auto flex gap-4 flex-col;
}

.notas_container::-webkit-scrollbar {
  @apply w-2;
}

.notas_container::-webkit-scrollbar-thumb {
  @apply bg-[color:var(--colorBlanco)] rounded hover:bg-[color:var(--colorFondoCiudadano)];
}

.tarjeta_otros {
  @apply bg-[color:var(--colorBusquedaCiudadanoPerfilOtrosTarjeta)] min-h-[2rem] flex flex-col justify-center gap-4 pl-8 pl-4 p-2 rounded-[0.7rem];
}

.tarjeta_otros_cabecera {
  @apply flex justify-between;
}

.tarjeta_otros_cabecera h1 {
  @apply text-[color:var(--colorTextoTarjeta)];
}

.tarjeta_multa {
  @apply bg-[color:var(--colorBusquedaCiudadanoPerfilOtrosTarjeta)] h-40 flex flex-col justify-center gap-4 pl-8 pl-4 p-2 rounded-[0.7rem];
}

.tarjeta_multa_titulo {
  @apply bg-[color:var(--colorBusquedaCiudadanoPerfilOtrosTarjeta)] flex flex-col justify-center gap-4 pl-8 pl-4 p-2 rounded-[0.7rem];
}

.tarjeta_multa_pagada {
  @apply bg-[color:var(--colorBusquedaCiudadanoPerfilOtrosMultaPagada)] h-40 flex flex-col justify-center gap-4 pl-8 pl-4 p-2 rounded-[0.7rem];
}

.tarjeta_multa_info {
  @apply flex gap-4 justify-end;
}

.tarjeta_multa_icono {
  @apply fill-[var(--colorBlanco)] w-6 h-4;
}

.tarjeta_multa_iconos {
  @apply flex items-center;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .ciudadano_menu_derecha {
    @apply w-full;
  }

  .ciudadano_perfil_usuario {
    @apply flex-col gap-4;
  }

  .ciudadano_perfil_usuario_derecha {
    @apply grid-cols-2;
  }

  .ciudadano_tarjeta {
    @apply w-full;
  }

  .ciudadano_perfil_otros {
    @apply grid-cols-1;
  }

  .ciudadano_perfil_botones[data-v-a5cac0f2] {
  @apply h-auto flex-col gap-4 mt-4;
  margin-top: 1rem;
}
.ciudadano_perfil_otros_container[data-v-a5cac0f2] {
  @apply flex h-80 w-full bg-[color:var(--colorBusquedaCiudadanoTarjeta)] mt-4 rounded-[0.7rem];
}
}

@media (max-width: 768px) {
  .ciudadano_menu_derecha {
    @apply w-full;
  }

  .ciudadano_menu_derecha_titulo h2 {
    @apply text-sm;
  }

  .ciudadano_tarjeta p {
    @apply text-sm;
  }

  .ciudadano_perfil_usuario_derecha {
    @apply grid-cols-1;
  }

  .ciudadano_perfil_botones[data-v-a5cac0f2] {
  @apply h-auto flex-col gap-2 mt-4;
  margin-top: 1rem;
}

  .ciudadano_perfil_otros {
    @apply grid-cols-1;
  }

  .notas_container {
    @apply p-2;
  }

  .tarjeta_otros, .tarjeta_multa, .tarjeta_multa_pagada {
    @apply h-auto p-2;
  }

  .ciudadano_perfil_otros_container[data-v-a5cac0f2] {
  @apply flex h-80 w-full bg-[color:var(--colorBusquedaCiudadanoTarjeta)] mt-[2re] mt-4 rounded-[0.7rem];
}
}

@media (max-width: 480px) {
  .ciudadano_menu_derecha {
    @apply w-full;
  }

  #no_izquierda:checked + label[data-v-4a66fcd6], #no_derecha:checked + label[data-v-4a66fcd6] {
    background-color: var(--colorBusquedaCiudadanoPerfilBoton);
    color: var(--colorTextoTarjeta);
    margin-left: 20px;
}
  .ciudadano_menu_derecha_titulo h2 {
    @apply text-xs;
  }

  .ciudadano_tarjeta p {
    @apply text-xs;
  }
  .ciudadano_boton[data-v-edd735a0] {
    display: flex;
    height: 2rem;
    width: 5rem;
    align-items: center;
    justify-content: center;
    background-color: var(--colorBotonBusquedaCiudadano);
    color: var(--colorTextoTarjeta);
    text-decoration-line: none;
    margin-top: 1rem;
  }

  .ciudadano_perfil_boton label[data-v-4a66fcd6] {
    display: inline-block;
    width: 13rem;
    cursor: pointer;
    border-width: 1px;
    border-style: solid;
    border-color: var(--colorTextoTarjeta);
    background-color: var(--colorBusquedaCiudadanoTarjeta);
    padding: 0.625rem;
    text-align: center;
    color: var(--colorBlanco);
    color: var(--colorTextoTarjeta);
    margin-left: 20px;
}
  .ciudadano_perfil_usuario_derecha {
    @apply grid-cols-1;
  }

  .ciudadano_perfil_botones[data-v-4a66fcd6] {
        height: 10rem;
        flex-direction: column;
        gap: 0.5rem;
        margin-top: 1rem;
    }
  .ciudadano_perfil_otros {
    @apply grid-cols-1;
  }

  .notas_container {
    @apply p-2;
  }

  .tarjeta_otros, .tarjeta_multa, .tarjeta_multa_pagada {
    @apply h-auto p-2;
  }
}

@media (max-width: 400px) {
  .ciudadano_menu_derecha {
    @apply w-full py-4 gap-4;
  }

  .ciudadano_menu_derecha_titulo h2 {
    @apply text-xs;
  }

  .ciudadano_tarjeta p {
    @apply text-xs;
  }

  .ciudadano_perfil_usuario_derecha {
    @apply grid-cols-1;
  }

  .ciudadano_perfil_botones[data-v-a5cac0f2] {
  @apply h-auto flex-col gap-2 mt-4;
}

  .ciudadano_perfil_otros {
    @apply grid-cols-1;
  }

  .ciudadano_perfil_otros_container[data-v-a5cac0f2] {
  @apply flex h-80 w-full bg-[color:var(--colorBusquedaCiudadanoTarjeta)] mt-[1rem,] mt-4 rounded-[0.7rem];
}

  .notas_container {
    @apply p-2;
  }

  .tarjeta_otros, .tarjeta_multa, .tarjeta_multa_pagada {
    @apply h-auto p-2;
  }

  .ciudadano_perfil_usuario_izquierda img {
    @apply w-40 h-40;
  }
}
</style>