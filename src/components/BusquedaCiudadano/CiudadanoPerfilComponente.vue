<script lang="ts">
import { defineComponent, ref, computed, watch, onMounted } from 'vue';
import ReturnButton from '@/components/ComponentesGenerales/BotonPaginaPrincipalComponente.vue';
import Modal from '@/components/BusquedaCiudadano/CiudadanoMultasComponente.vue';
import { useRoute } from 'vue-router';
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
        ReturnButton,
        Modal
    },
    setup() {
        const route = useRoute();
        const store = useListadoCiudadanos();
        const citizenId = ref(parseInt(parseRouteParam(route.params.id) || '0'));
        const showModal = ref(false);

        const citizenDetails = computed<Ciudadano>(() => {
            return store.infoCiudadanos.find(c => c.idCiudadano === citizenId.value) || {
                idCiudadano: 0,
                nombre: '',
                apellidos: '',
                dni: '',
                genero: '',
                nacionalidad: '',
                fechaNacimiento: new Date(),
                direccion: '',
                numeroTelefono: '',
                numeroCuentaBancaria: '',
                isPoli: false,
                isBusquedaYCaptura: false,
                isPeligroso: false,
                multas: [],
                vehiculos: []
            };
        });

        const openModal = () => {
            showModal.value = true;
        };

        watch(() => route.params.id, (newId) => {
            const parsedId = parseInt(parseRouteParam(newId));
            if (parsedId) {
                citizenId.value = parsedId;
                store.cargarDatosCiudadanosId(parsedId);
            }
        }, { immediate: true });

        onMounted(() => {
            if (citizenId.value) {
                store.cargarDatosCiudadanosId(citizenId.value);
            }
        });

        return {
            citizenDetails,
            citizenId,
            showModal,
            openModal
        };
    }
});

function parseRouteParam(param: string | string[]): string {
    return Array.isArray(param) ? param[0] : param || '0';
}
</script>

<template>
    <div class="ciudadano_menu_derecha">
        <div class="ciudadano_menu_derecha_titulo">
            <h2>PERFIL DEL CIUDADANO</h2>
        </div>
        <div class="ciudadano_perfil">
            <p v-if="!citizenId">SELECCIONA UN CIUDADANO PARA CARGAR LA INFORMACIÓN</p>
            <template v-else>
                <div class="ciudadano_perfil_usuario">
                    <div class="ciudadano_perfil_usuario_izquierda">
                        <img src="https://via.placeholder.com/150" alt="">
                    </div>
                    <div class="ciudadano_perfil_usuario_derecha">
                        <div class="ciudadano_tarjeta">
                            <p>Nombre</p>
                            <p>{{ citizenDetails.nombre }}</p>
                        </div>
                        <div class="ciudadano_tarjeta">
                            <p>Apellidos</p>
                            <p>{{ citizenDetails.apellidos }}</p>
                        </div>
                        <div class="ciudadano_tarjeta">
                            <p>Genero</p>
                            <p>{{ citizenDetails.genero }}</p>
                        </div>
                        <div class="ciudadano_tarjeta">
                            <p>Nacionalidad</p>
                            <p>{{ citizenDetails.nacionalidad }}</p>
                        </div>
                        <div class="ciudadano_tarjeta">
                            <p>Fecha de nacimiento</p>
                            <p>{{ citizenDetails.fechaNacimiento }}</p>
                        </div>
                        <div class="ciudadano_tarjeta">
                            <p>ID</p>
                            <p>{{ citizenDetails.idCiudadano }}</p>
                        </div>
                        <div class="ciudadano_tarjeta">
                            <p>Número de teléfono</p>
                            <p>{{ citizenDetails.numeroTelefono }}</p>
                        </div>
                        <div class="ciudadano_tarjeta">
                            <p>Número de cuenta</p>
                            <p>{{ citizenDetails.numeroCuentaBancaria }}</p>
                        </div>
                        <div class="ciudadano_tarjeta">
                            <p>Trabajo</p>
                            <p>{{ citizenDetails.trabajo }}</p>
                        </div>
                    </div>
                </div>
                <div class="ciudadano_perfil_botones">
                    <div class="ciudadano_perfil_botones_izquierda">
                        <h2>EN BUSQUEDA Y CAPTURA</h2>
                        <div class="ciudadano_perfil_boton">
                            <input type="radio" id="no_izquierda" value="false"
                                v-model="citizenDetails.isBusquedaYCaptura">
                            <label for="no_izquierda">No</label>
                            <input type="radio" id="yes_izquierda" value="true"
                                v-model="citizenDetails.isBusquedaYCaptura">
                            <label for="yes_izquierda">Sí</label>
                        </div>
                    </div>
                    <div class="ciudadano_perfil_botones_derecha">
                        <h2>PELIGROSO</h2>
                        <div class="ciudadano_perfil_boton">
                            <input type="radio" id="no_derecha" value="false" v-model="citizenDetails.isPeligroso">
                            <label for="no_derecha">No</label>
                            <input type="radio" id="yes_derecha" value="true" v-model="citizenDetails.isPeligroso">
                            <label for="yes_derecha">Sí</label>
                        </div>
                    </div>
                </div>
                <div class="ciudadano_perfil_otros">
                    <div class="ciudadano_perfil_otros_container">
                        <div class="ciudadano_perfil_notasdiv">
                            <div class="ciudadano_perfil_notasdiv_titulo">
                                <svg class="ciudadano_icono" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                    <path
                                        d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H288V368c0-26.5 21.5-48 48-48H448V96c0-35.3-28.7-64-64-64H64zM448 352H402.7 336c-8.8 0-16 7.2-16 16v66.7V480l32-32 64-64 32-32z" />
                                </svg>
                                <p>NOTAS</p>
                            </div>
                            <!-- añadir en el back las notas en el ciudadano -->
                            <div class="notas_container">
                                <div class="tarjeta_otros">
                                    <p>NO HAY NOTAS REGISTRADAS</p>
                                </div>
                                <div class="tarjeta_otros">
                                    <div class="tarjeta_otros_cabecera">
                                        <h1>Nota 1</h1>
                                        <p>1/5/24</p>
                                    </div>
                                    <p>Este usuario tiene una nota</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="ciudadano_perfil_otros_container">
                        <div class="ciudadano_perfil_notasdiv">
                            <div class="ciudadano_perfil_notasdiv_titulo">
                                <svg class="ciudadano_icono" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                    <path
                                        d="M96 0C43 0 0 43 0 96V416c0 53 43 96 96 96H384h32c17.7 0 32-14.3 32-32s-14.3-32-32-32V384c17.7 0 32-14.3 32-32V32c0-17.7-14.3-32-32-32H384 96zm0 384H352v64H96c-17.7 0-32-14.3-32-32s14.3-32 32-32zm32-240c0-8.8 7.2-16 16-16H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16zm16 48H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16s7.2-16 16-16z" />
                                </svg>
                                <p>MULTAS</p>
                                <div class="ciudadano_perfil_multas">
                                    <p @click="showModal = true">+ AÑADIR MULTA</p>
                                </div>
                                <Modal :visible="showModal" @update:visible="showModal = $event" />

                            </div>
                            <template v-if="citizenDetails.multas && citizenDetails.multas.length > 0">
                                <div class="notas_container">
                                    <div v-for="multa in citizenDetails.multas" :key="multa.idMulta"
                                        class="tarjeta_multa" :class="{ 'tarjeta_multa_pagada': multa.pagada }">
                                        <div class="tarjeta_otros_cabecera">
                                            <p>{{ new Date(multa.fecha).toLocaleDateString() }} - {{ new
                                                Date(multa.fecha).toLocaleTimeString() }}</p>
                                        </div>
                                        <p>{{ multa.articuloPenal }}</p>
                                        <div class="tarjeta_multa_info">
                                            <div class="tarjeta_multa_iconos">
                                                <!-- añadir informacion del policia en el back en la parte de multas -->
                                                <p>{{ multa.idPolicia }}</p>
                                                <svg class="tarjeta_multa_icono" xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 448 512">
                                                    <path
                                                        d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
                                                </svg>
                                            </div>
                                            <div class="tarjeta_multa_iconos">
                                                <svg class="tarjeta_multa_icono" xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 320 512">
                                                    <path
                                                        d="M48.1 240c-.1 2.7-.1 5.3-.1 8v16c0 2.7 0 5.3 .1 8H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H60.3C89.9 419.9 170 480 264 480h24c17.7 0 32-14.3 32-32s-14.3-32-32-32H264c-57.9 0-108.2-32.4-133.9-80H256c17.7 0 32-14.3 32-32s-14.3-32-32-32H112.2c-.1-2.6-.2-5.3-.2-8V248c0-2.7 .1-5.4 .2-8H256c17.7 0 32-14.3 32-32s-14.3-32-32-32H130.1c25.7-47.6 76-80 133.9-80h24c17.7 0 32-14.3 32-32s-14.3-32-32-32H264C170 32 89.9 92.1 60.3 176H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H48.1z" />
                                                </svg>
                                                <p>{{ multa.precio }}</p>
                                            </div>
                                            <div class="tarjeta_multa_iconos">
                                                <!-- cambiar esto por meses cuando se junte codigo penal y multas en el back -->
                                                <svg class="tarjeta_multa_icono" xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 512 512">
                                                    <path
                                                        d="M318.6 9.4c-12.5-12.5-32.8-12.5-45.3 0l-120 120c-12.5 12.5-12.5 32.8 0 45.3l16 16c12.5 12.5 32.8 12.5 45.3 0l4-4L325.4 293.4l-4 4c-12.5 12.5-12.5 32.8 0 45.3l16 16c12.5 12.5 32.8 12.5 45.3 0l120-120c12.5-12.5 12.5-32.8 0-45.3l-16-16c-12.5-12.5-32.8-12.5-45.3 0l-4 4L330.6 74.6l4-4c12.5-12.5 12.5-32.8 0-45.3l-16-16zm-152 288c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3l48 48c12.5 12.5 32.8 12.5 45.3 0l112-112c12.5-12.5 12.5-32.8 0-45.3l-1.4-1.4L272 285.3 226.7 240 168 298.7l-1.4-1.4z" />
                                                </svg>
                                                <p>{{ multa.pagada ? 'Pagada' : 'Pendiente' }}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </template>
                            <template v-else>
                                <div class="notas_container">
                                    <div class="tarjeta_multa_titulo">
                                        <p>NO HAY MULTAS REGISTRADAS</p>
                                    </div>
                                </div>
                            </template>
                        </div>
                    </div>

                    <div class="ciudadano_perfil_otros_container">
                        <div class="ciudadano_perfil_notasdiv">
                            <!-- añadir en el back las denuncias en el ciudadano -->
                            <div class="ciudadano_perfil_notasdiv_titulo">
                                <svg class="ciudadano_icono" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                    <path
                                        d="M576 128c0-35.3-28.7-64-64-64H64C28.7 64 0 92.7 0 128V384c0 35.3 28.7 64 64 64l352 0 0-128c0-17.7 14.3-32 32-32H576V128zM448 448L576 320H448l0 128zM96 128a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
                                </svg>
                                <p>DENUNCIAS</p>
                            </div>
                            <div class="tarjeta_otros">
                                <p>NO HAY DENUNCIAS REGISTRADAS</p>
                            </div>
                            <div class="tarjeta_otros">
                                <p>Investigacion de venta de drogas #121</p>
                            </div>
                        </div>
                    </div>

                    <div class="ciudadano_perfil_otros_container">
                        <div class="ciudadano_perfil_notasdiv">
                            <div class="ciudadano_perfil_notasdiv_titulo">
                                <svg class="ciudadano_icono" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                    <path
                                        d="M135.2 117.4L109.1 192H402.9l-26.1-74.6C372.3 104.6 360.2 96 346.6 96H165.4c-13.6 0-25.7 8.6-30.2 21.4zM39.6 196.8L74.8 96.3C88.3 57.8 124.6 32 165.4 32H346.6c40.8 0 77.1 25.8 90.6 64.3l35.2 100.5c23.2 9.6 39.6 32.5 39.6 59.2V400v48c0 17.7-14.3 32-32 32H448c-17.7 0-32-14.3-32-32V400H96v48c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V400 256c0-26.7 16.4-49.6 39.6-59.2zM128 288a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm288 32a32 32 0 1 0 0-64 32 32 0 1 0 0 64z" />
                                </svg>
                                <p>VEHICULOS</p>
                            </div>
                            <template v-if="citizenDetails.vehiculos && citizenDetails.vehiculos.length > 0">
                                <div v-for="vehiculo in citizenDetails.vehiculos" :key="vehiculo.idVehiculo"
                                    class="tarjeta_otros">
                                    <p>{{ vehiculo.marca }} / {{ vehiculo.matricula }}</p>
                                </div>
                            </template>
                            <template v-else>
                                <div class="tarjeta_otros">
                                    <p>NO HAY VEHICULOS REGISTRADOS</p>
                                </div>
                            </template>
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
    background-color: var(--colorFondoCiudadano2);
    width: 75%;
    display: flex;
    flex-direction: column;
    border-radius: 0.5rem;
    padding-top: 2rem;
    padding-bottom: 2rem;
    gap: 2rem;
}

.ciudadano_menu_derecha_titulo {
    display: flex;
    justify-content: center;
    align-items: center;
}

.ciudadano_menu_derecha_titulo h2 {
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
    flex-direction: column;
}

.ciudadano_perfil_notasdiv p {
    font-size: 16px;
}

.ciudadano_perfil_multas {
    display: flex;
    width: 100%;
    justify-content: flex-end;
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

.ciudadano_perfil_notasdiv_titulo {
    display: flex;
}

.notas_container {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    display: flex;
    gap: 1rem;
    flex-direction: column;
}

.notas_container::-webkit-scrollbar {
    width: 8px;
}

.notas_container::-webkit-scrollbar-thumb {
    background-color: var(--colorBlanco);
    border-radius: 4px;
}

.notas_container::-webkit-scrollbar-thumb:hover {
    background-color: var(--colorFondoCiudadano);
}

.tarjeta_otros {
    background-color: var(--colorBusquedaCiudadanoPerfilOtrosTarjeta);
    border-radius: 0.7rem;
    min-height: 2rem;
    display: flex;
    padding-left: 2rem;
    flex-direction: column;
    justify-content: center;
    padding: 0.5rem;
    padding-left: 1rem;
    gap: 1rem;
}

.tarjeta_otros_cabecera {
    display: flex;
    justify-content: space-between;
}

.tarjeta_otros_cabecera h1 {
    color: var(--colorTextoTarjeta);
}

.tarjeta_multa {
    background-color: var(--colorBusquedaCiudadanoPerfilOtrosTarjeta);
    border-radius: 0.7rem;
    height: 10rem;
    display: flex;
    padding-left: 2rem;
    flex-direction: column;
    justify-content: center;
    padding: 0.5rem;
    padding-left: 1rem;
    gap: 1rem;
}

.tarjeta_multa_titulo {
    background-color: var(--colorBusquedaCiudadanoPerfilOtrosTarjeta);
    border-radius: 0.7rem;
    display: flex;
    padding-left: 2rem;
    flex-direction: column;
    justify-content: center;
    padding: 0.5rem;
    padding-left: 1rem;
    gap: 1rem;
}

.tarjeta_multa_pagada {
    background-color: var(--colorBusquedaCiudadanoPerfilOtrosMultaPagada);
    border-radius: 0.7rem;
    height: 10rem;
    display: flex;
    padding-left: 2rem;
    flex-direction: column;
    justify-content: center;
    padding: 0.5rem;
    padding-left: 1rem;
    gap: 1rem;
}

.tarjeta_multa_info {
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
}

.tarjeta_multa_icono {
    fill: var(--colorBlanco);
    width: 1.5rem;
    height: 1rem;
}

.tarjeta_multa_iconos {
    display: flex;
    align-items: center;
}
</style>
