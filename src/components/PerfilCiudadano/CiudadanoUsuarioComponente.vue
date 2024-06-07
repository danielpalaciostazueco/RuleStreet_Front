<script lang="ts">
import { defineComponent, ref, watchEffect, onMounted } from 'vue';
import ReturnButton from '@/components/ComponentesGenerales/BotonPaginaPrincipalComponente.vue';
import ConfirmModal from '@/components/BusquedaCiudadano/CiudadanoConfirmacionMultaComponente.vue';
import { useRoute } from 'vue-router';
import { useListadoCiudadanos } from '@/stores/storeCiudadano';
import { useListadoPolicias } from '@/stores/storePolicia';
import { useListadoMultas } from '@/stores/storeMulta';
import { useListadoAuth } from '@/stores/storeAuth';
import { useI18n } from 'vue-i18n';
import PayComponente from './PayComponente.vue';

interface Permiso {
    idPermiso: number;
    nombre: string;
}

interface Rango {
    idRango: number;
    nombre: string;
    salario: number;
    isLocal: boolean;
    permisos: Permiso[];
}

interface CodigoPenal {
    idCodigoPenal: number;
    articulo: string;
    article: string;
    descripcion: string;
    description: string;
    precio: number;
    sentencia: string;
}

interface Policia {
    idPolicia: number;
    idCiudadano: number;
    rango: Rango;
    numeroPlaca: string;
    ciudadano: Ciudadano;
    contrasena: string;
    isPolicia: boolean;
}

interface Vehiculo {
    idVehiculo: number;
    matricula: string;
    marca: string;
    modelo: string;
    color: string;
    enColor: string;
    idCiudadano: number;
}

interface Multa {
    idMulta: number;
    idPolicia: number;
    fecha: Date;
    precio: number;
    articuloPenal: string;
    descripcion: string;
    description: string;
    pagada: boolean;
    idCiudadano: number;
    codigoPenal: CodigoPenal;
}

interface Ciudadano {
    idCiudadano: number;
    nombre: string;
    apellidos: string;
    dni: string;
    genero: string;
    gender: string;
    nacionalidad: string;
    nationality: string;
    fechaNacimiento: Date;
    direccion: string;
    address: string;
    numeroTelefono: string;
    numeroCuentaBancaria: string;
    isPoli: boolean;
    isBusquedaYCaptura: boolean;
    isPeligroso: boolean;
    multas: Multa[];
    vehiculos: Vehiculo[];
    trabajo: string;
}

export default defineComponent({
    components: {
        ReturnButton,
        PayComponente,
        ConfirmModal
    },
    setup() {
        const route = useRoute();
        const store = useListadoCiudadanos();
        const storePolicias = useListadoPolicias();
        const storeMultas = useListadoMultas();
        const storeAuth = useListadoAuth();
        const citizenId = ref<number>(storeAuth.getCitizenIdFromToken());
        console.log('citizenId', citizenId)
        const citizenid2 = citizenId.value;
        const showModal = ref(false);
        const showConfirmModal = ref(false);
        const selectedMultaId = ref(null);
        const selectedMulta = ref<Multa | null>(null);
        const policiaActualId = ref(0);
        const { t, locale } = useI18n();
        const showError = ref(false);
        const errorMessage = ref("");
        const infoCiudadanos = ref<Ciudadano | null>(null);
        const loading = ref(true);

        const getnombrePolicia = (idPolicia: number) => {
            const policia = storePolicias.infoPolicias.find(p => p.idPolicia === idPolicia);
            return policia ? `${policia.ciudadano.nombre} ${policia.ciudadano.apellidos}` : 'Desconocido';
        };


        function formatDate(date: any): string {
            if (!(date instanceof Date)) {
                date = new Date(date);
            }
            if (isNaN(date.getTime())) {
                return '';
            }

            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();

            return `${day}/${month}/${year}`;
        }

        const CargarDatosCiudadanos = async (id: number) => {
            if (id) {
                await store.cargarDatosCiudadanosId(id);
                infoCiudadanos.value = store.infoCiudadano;
                console.log('infoCiudadanos', infoCiudadanos.value);
                loading.value = false;
            }
        };

        watchEffect(async () => {
            if (citizenId.value) {
                loading.value = true;
                await CargarDatosCiudadanos(citizenId.value);
            } else {
                loading.value = true;
                await CargarDatosCiudadanos(citizenid2);
            }
        });

        onMounted(async () => {
            if (citizenId.value) {
                CargarDatosCiudadanos(citizenId.value);
                console.log(citizenId.value)
            } else {
                CargarDatosCiudadanos(citizenid2);
                console.log(citizenid2)
            }
            await storePolicias.cargarDatosPolicias();
            if (storeAuth.infoUsuarios.IdCiudadano) {
                await CargarDatosCiudadanos(storeAuth.infoUsuarios.IdCiudadano);
            }
            await storeAuth.loadPoliceInfo();
            if (storeAuth.infoPoliciasAuth.IdPolicia) {
                policiaActualId.value = storeAuth.infoPoliciasAuth.IdPolicia;
                await storePolicias.cargarDatosPoliciasId(policiaActualId.value);
            }
        });

        const borrarMulta = (idMulta: any) => {
            const permisoBorrarMulta = storePolicias.infoPoli.rango.permisos.some((p: any) => p.nombre === "Borrar multa");
            if (permisoBorrarMulta) {
                selectedMultaId.value = idMulta;
                showConfirmModal.value = true;
            } else {
                errorMessage.value = "No tienes permiso para borrar multas.";
                showError.value = true;
                setTimeout(() => showError.value = false, 3000);
            }
        };

        const confirmDelete = async () => {
            try {
                if (selectedMultaId.value !== null) {
                    await storeMultas.borrarDatosMulta(selectedMultaId.value);
                }
                await CargarDatosCiudadanos(storeAuth.infoUsuarios.IdCiudadano);
                showConfirmModal.value = false;
            } catch (error) {
                console.error('Error al eliminar la multa:', error);
                alert("Error al eliminar la multa.");
                showConfirmModal.value = false;
            }
        };

        const cancelDelete = () => {
            showConfirmModal.value = false;
        };

        const openPayFineModal = (multa: Multa) => {
            selectedMulta.value = multa;
            showModal.value = true;
        };

        function addHours(date: Date, hours: number): Date {
            const newDate = new Date(date);
            newDate.setHours(newDate.getHours() + hours);
            return newDate;
        }

        function formatDateTime(date: any): string {
            if (!(date instanceof Date)) {
                date = new Date(date);
            }
            if (isNaN(date.getTime())) {
                return '';
            }
            date = addHours(date, 2);
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');

            return `${day}/${month}/${year} ${hours}:${minutes}`;
        }

        const ManejarPago = async (multa: Multa, cardData: { cardNumber: string, expirationDate: string, cvv: string }) => {
            console.log('Pago realizado', multa, cardData);
            showModal.value = false;
            multa.pagada = true;
            try {
                await storeMultas.actualizarMulta(multa);
                await CargarDatosCiudadanos(citizenId.value || citizenid2);
                window.location.reload();
            } catch (error) {
                console.error('Error al actualizar la multa:', error);
                alert("Error al actualizar la multa.");
            }
        };


        return {
            citizenId,
            showModal,
            openPayFineModal,
            locale,
            borrarMulta,
            confirmDelete,
            cancelDelete,
            showConfirmModal,
            showError,
            errorMessage,
            infoCiudadanos,
            loading,
            getnombrePolicia,
            selectedMulta,
            showPaymentModal: showModal,
            ManejarPago,
            formatDate,
            formatDateTime
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
            <h2>{{ $t('PerfilCiudadano.Profile') }}</h2>
        </div>
        <div class="ciudadano_perfil">
            <p v-if="!citizenId">{{ $t('PerfilCiudadano.Select') }}</p>
            <template v-if="loading">
                <p>{{ $t('PerfilCiudadano.Loading') }}</p>
            </template>
            <template v-else-if="infoCiudadanos">
                <div class="ciudadano_perfil_usuario">
                    <div class="ciudadano_perfil_usuario_izquierda">

                    </div>
                    <div class="ciudadano_perfil_usuario_derecha">
                        <div class="ciudadano_tarjeta">
                            <p>{{ $t('PerfilCiudadano.Name') }}</p>
                            <p>{{ infoCiudadanos.nombre }}</p>
                        </div>
                        <div class="ciudadano_tarjeta">
                            <p>{{ $t('PerfilCiudadano.Surname') }}</p>
                            <p>{{ infoCiudadanos.apellidos }}</p>
                        </div>
                        <div class="ciudadano_tarjeta">
                            <p>{{ $t('PerfilCiudadano.Gender') }}</p>
                            <p v-if="locale === 'es'">{{ infoCiudadanos.genero }}</p>
                            <p v-if="locale === 'en'">{{ infoCiudadanos.gender }}</p>
                        </div>
                        <div class="ciudadano_tarjeta">
                            <p>{{ $t('PerfilCiudadano.Nationality') }}</p>
                            <p v-if="locale === 'es'">{{ infoCiudadanos.nacionalidad }}</p>
                            <p v-if="locale === 'en'">{{ infoCiudadanos.nationality }}</p>
                        </div>
                        <div class="ciudadano_tarjeta">
                            <p>{{ $t('PerfilCiudadano.Birthdate') }}</p>
                            <p>{{ formatDate(infoCiudadanos.fechaNacimiento) }}</p>
                        </div>
                        <div class="ciudadano_tarjeta">
                            <p>ID</p>
                            <p>{{ infoCiudadanos.idCiudadano }}</p>
                        </div>
                        <div class="ciudadano_tarjeta">
                            <p>{{ $t('PerfilCiudadano.PhoneNumber') }}</p>
                            <p>{{ infoCiudadanos.numeroTelefono }}</p>
                        </div>
                        <div class="ciudadano_tarjeta">
                            <p>{{ $t('PerfilCiudadano.AccountNumber') }}</p>
                            <p>{{ infoCiudadanos.numeroCuentaBancaria }}</p>
                        </div>
                        <div class="ciudadano_tarjeta">
                            <p>{{ $t('PerfilCiudadano.Work') }}</p>
                            <p>{{ infoCiudadanos.trabajo }}</p>
                        </div>
                    </div>
                </div>
                <div class="ciudadano_perfil_otros">
                    <div class="ciudadano_perfil_otros_container">
                        <div class="ciudadano_perfil_notasdiv">
                            <div class="ciudadano_perfil_notasdiv_titulo">
                                <svg class="ciudadano_icono" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                    <path
                                        d="M96 0C43 0 0 43 0 96V416c0 53 43 96 96 96H384h32c17.7 0 32-14.3 32-32s-14.3-32-32-32V384c17.7 0 32-14.3 32-32V32c0-17.7-14.3-32-32-32H384 96zm0 384H352v64H96c-17.7 0-32-14.3-32-32s14.3-32 32-32zm32-240c0-8.8 7.2-16 16-16H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16zm16 48H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16s7.2-16 16-16z" />
                                </svg>
                                <p>{{ $t('PerfilCiudadano.Multa') }}</p>
                            </div>
                            <div class="multas-container"
                                v-if="infoCiudadanos?.multas && infoCiudadanos.multas.length > 0">
                                <div v-for="multa in infoCiudadanos.multas" :key="multa.idMulta" class="tarjeta_multa"
                                    :class="{ 'tarjeta_multa_pagada': multa.pagada }">
                                    <div class="tarjeta_otros_cabecera">
                                        <p>{{ formatDateTime(multa.fecha) }}</p>
                                    </div>
                                    <p>{{ multa.codigoPenal.articulo }}</p>
                                    <div class="tarjeta_multa_info">
                                        <div class="tarjeta_multa_iconos">
                                            <p>{{ getnombrePolicia(multa.idPolicia) }}</p>
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
                                            <p>{{ multa.codigoPenal.precio }}</p>
                                        </div>
                                        <div class="tarjeta_multa_iconos">
                                            <svg class="tarjeta_multa_icono" xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 512 512">
                                                <path
                                                    d="M318.6 9.4c-12.5-12.5-32.8-12.5-45.3 0l-120 120c-12.5 12.5-12.5 32.8 0 45.3l16 16c12.5 12.5 32.8 12.5 45.3 0l4-4L325.4 293.4l-4 4c-12.5 12.5-12.5 32.8 0 45.3l16 16c12.5 12.5 32.8 12.5 45.3 0l120-120c12.5-12.5 12.5-32.8 0-45.3l-16-16c-12.5-12.5-32.8-12.5-45.3 0l-4 4L330.6 74.6l4-4c12.5-12.5 12.5-32.8 0-45.3l-16-16zm-152 288c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3l48 48c12.5 12.5 32.8 12.5 45.3 0l112-112c12.5-12.5 12.5-32.8 0-45.3l-1.4-1.4L272 285.3 226.7 240 168 298.7l-1.4-1.4z" />
                                            </svg>
                                            <p>{{ multa.codigoPenal.sentencia }}</p>
                                        </div>
                                        <button v-if="!multa.pagada" @click="openPayFineModal(multa)">Pagar
                                            Multa</button>
                                    </div>
                                </div>
                            </div>
                            <p v-else>{{ $t('PerfilCiudadano.NoMultas') }}</p>
                        </div>
                    </div>
                    <div class="ciudadano_perfil_otros_container">
                        <div class="ciudadano_perfil_notasdiv">
                            <div class="ciudadano_perfil_notasdiv_titulo">
                                <svg class="ciudadano_icono" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                    <path
                                        d="M135.2 117.4L109.1 192H402.9l-26.1-74.6C372.3 104.6 360.2 96 346.6 96H165.4c-13.6 0-25.7 8.6-30.2 21.4zM39.6 196.8L74.8 96.3C88.3 57.8 124.6 32 165.4 32H346.6c40.8 0 77.1 25.8 90.6 64.3l35.2 100.5c23.2 9.6 39.6 32.5 39.6 59.2V400v48c0 17.7-14.3 32-32 32H448c-17.7 0-32-14.3-32-32V400H96v48c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V400 256c0-26.7 16.4-49.6 39.6-59.2zM128 288a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm288 32a32 32 0 1 0 0-64 32 32 0 1 0 0 64z" />
                                </svg>
                                <p>{{ $t('PerfilCiudadano.Vehicles') }}</p>
                            </div>
                            <template v-if="infoCiudadanos?.vehiculos && infoCiudadanos.vehiculos.length > 0">
                                <div v-for="vehiculo in infoCiudadanos.vehiculos" :key="vehiculo.idVehiculo"
                                    class="tarjeta_otros">
                                    <p>{{ vehiculo.marca }} / {{ vehiculo.matricula }}</p>
                                </div>
                            </template>
                            <template v-else>
                                <div class="tarjeta_otros">
                                    <p>{{ $t('PerfilCiudadano.NoVehicles') }}</p>
                                </div>
                            </template>
                        </div>
                    </div>
                </div>
            </template>
            <return-button />
        </div>
    </div>
    <pay-componente :visible="showPaymentModal" @close="showPaymentModal = false" :multa="selectedMulta"
        @pay="ManejarPago" />
</template>

<style scoped>
.payment-modal {
    position: fixed;
    z-index: 1000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    justify-content: center;
    align-items: center;
}

.payment-modal-content {
    background-color: #2c3e50;
    color: #ecf0f1;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
    max-width: 500px;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.close {
    color: #ecf0f1;
    float: right;
    font-size: 28px;
    font-weight: bold;
}

.close:hover,
.close:focus {
    color: #bdc3c7;
    text-decoration: none;
    cursor: pointer;
}

.form-group {
    margin-bottom: 15px;
}

.form-group label {
    display: block;
    margin-bottom: 5px;
}

.form-group input {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
    border: 1px solid #34495e;
    border-radius: 5px;
    background-color: #34495e;
    color: #ecf0f1;
}

.button-container {
    display: flex;
    justify-content: center;
    margin-top: 20px;
}

button {
    background-color: #2980b9;
    color: white;
    padding: 10px 20px;
    border: none;
    cursor: pointer;
    border-radius: 5px;
}

button:hover {
    background-color: #3498db;
}

.tarjeta_multa_pagada {
    background-color: var(--colorBusquedaCiudadanoPerfilOtrosMultaPagada) !important;
    color: var(--colorBlanco) !important;
}

.ciudadano_menu_derecha {
    @apply mb-5;
    @apply flex w-[70%] flex-col gap-8 bg-[color:var(--colorFondoCiudadano2)] ml-[15%] mt-[5%] py-8 rounded-lg;
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
    @apply grid grid-cols-custom gap-4 justify-center items-center w-full;
}

.ciudadano_tarjeta {
    @apply bg-[color:var(--colorBusquedaCiudadanoTarjeta)] w-48 h-16 flex flex-col justify-center gap-2 pl-8 rounded-[0.7rem];
}

.ciudadano_tarjeta p {
    @apply text-base;
}

.ciudadano_perfil_botones {
    @apply flex gap-8 bg-[color:var(--colorBusquedaCiudadanoTarjeta)] w-full h-32 justify-center items-center rounded-[0.7rem];
}

.ciudadano_perfil_boton input[type="radio"] {
    @apply hidden;
}

.ciudadano_perfil_boton label {
    @apply inline-block w-52 text-center text-[color:var(--colorBlanco)] bg-[color:var(--colorBusquedaCiudadanoTarjeta)] cursor-pointer border border-[color:var(--colorTextoTarjeta)] text-[color:var(--colorTextoTarjeta)] p-2.5 border-solid;
}

#no_izquierda:checked+label,
#no_derecha:checked+label {
    @apply bg-[color:var(--colorBusquedaCiudadanoPerfilBoton)] text-[color:var(--colorTextoTarjeta)];
}

#yes_izquierda:checked+label,
#yes_derecha:checked+label {
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
    @apply grid grid-cols-custom2 gap-4 justify-center items-center w-full;
}

.ciudadano_perfil_otros_container {
    @apply flex h-80 w-full bg-[color:var(--colorBusquedaCiudadanoTarjeta)] mt-5 rounded-[0.7rem];
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
    @apply bg-[color:var(--colorBusquedaCiudadanoPerfilOtrosTarjeta)] flex flex-col justify-center gap-4 pl-8 pl-4 p-2 mb-4 rounded-[0.7rem];
}

.tarjeta_multa_titulo {
    @apply bg-[color:var(--colorBusquedaCiudadanoPerfilOtrosTarjeta)] flex flex-col justify-center gap-4 pl-8 pl-4 p-2 rounded-[0.7rem];
}

.tarjeta_multa_Pagada {
    @apply bg-[color:var(--colorBusquedaCiudadanoPerfilOtrosMultaPagada)] flex flex-col justify-center gap-4 pl-8 pl-4 p-2 mb-4 rounded-[0.7rem];
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

.multas-container {
    @apply h-80 overflow-y-auto pr-4;
}

.multas-container::-webkit-scrollbar {
    @apply w-2;
}

.multas-container::-webkit-scrollbar-thumb {
    @apply bg-[color:var(--colorBlanco)] rounded hover:bg-[color:var(--colorFondoCiudadano)];
}

.ciudadano_boton {
    @apply flex h-8 w-20 items-center justify-center bg-[color:var(--colorBotonBusquedaCiudadano)] text-[color:var(--colorTextoTarjeta)] no-underline mt-2.5;
}

@media (max-width: 1407px) {

    .ciudadano_perfil_usuario {
        @apply flex w-full gap-12 flex-col;
    }

    .ciudadano_perfil_botones[data-v-a5cac0f2] {
        @apply flex h-32 w-full items-center justify-center gap-8 bg-[color:var(--colorBusquedaCiudadanoTarjeta)] mt-5 rounded-[0.7rem];
    }

    .ciudadano_perfil_boton {
        @apply flex w-6/12 mb-2.5;
    }

    .ciudadano_perfil_otros {
        @apply grid grid-cols-custom2 gap-4 justify-center items-center w-full;
    }

    .ciudadano_boton {
        @apply flex h-8 w-20 items-center justify-center bg-[color:var(--colorBotonBusquedaCiudadano)] text-[color:var(--colorTextoTarjeta)] no-underline mt-2.5;
    }
}

@media (max-width: 1124px) {
    .ciudadano_menu_derecha {
        @apply flex w-[70%] flex-col gap-8 bg-[color:var(--colorFondoCiudadano2)] ml-0 py-8 rounded-lg;
    }

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

    .ciudadano_perfil_botones {
        @apply h-auto flex-col gap-4 mt-4;
    }

    .ciudadano_perfil_otros_container {
        @apply flex h-80 w-full bg-[BusquedaCiudadanoTarjeta] mt-4 rounded-[0.7rem];
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
    }

    .ciudadano_perfil_otros {
        @apply grid-cols-1;
    }

    .notas_container {
        @apply p-2;
    }

    .tarjeta_otros,
    .tarjeta_multa,
    .tarjeta_multa_Pagada {
        @apply h-auto p-2;
    }

    .ciudadano_perfil_otros_container[data-v-a5cac0f2] {
        @apply flex h-80 w-full bg-[color:var(--colorBusquedaCiudadanoTarjeta)] mt-4 rounded-[0.7rem];
    }

    .ciudadano_busqueda[data-v-845bb2b1] {
        @apply gap-1;

    }
}

@media (max-width: 480px) {
    .ciudadano_menu_derecha {
        @apply w-full;
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

    .ciudadano_perfil_botones {
        @apply flex-col h-auto gap-2;
    }

    .ciudadano_perfil_otros {
        @apply grid-cols-1;
    }

    .notas_container {
        @apply p-2;
    }

    .tarjeta_otros,
    .tarjeta_multa,
    .tarjeta_multa_Pagada {
        @apply h-auto p-2;
    }

    .ciudadano_perfil_boton label[data-v-a5cac0f2] {
        @apply inline-block w-52 cursor-pointer border border-[color:var(--colorTextoTarjeta)] bg-[color:var(--colorBusquedaCiudadanoTarjeta)] text-center text-[color:var(--colorBlanco)] text-[color:var(--colorTextoTarjeta)] ml-5 p-2.5 border-solid;
    }

    #no_izquierda:checked+label[data-v-a5cac0f2],
    #no_derecha:checked+label[data-v-a5cac0f2] {
        @apply bg-[color:var(--colorBusquedaCiudadanoPerfilBoton)] text-[color:var(--colorTextoTarjeta)] ml-5;
    }

    .ciudadano_boton[data-v-edd735a0] {
        @apply flex h-8 w-20 items-center justify-center bg-[color:var(--colorBotonBusquedaCiudadano)] text-[color:var(--colorTextoTarjeta)] no-underline mt-4;
    }

    .ciudadano_busqueda {
        @apply gap-1;
        /* flex-direction: column; */
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

    .ciudadano_perfil_boton label[data-v-a5cac0f2] {
        @apply inline-block w-52 cursor-pointer border border-[color:var(--colorTextoTarjeta)] bg-[color:var(--colorBusquedaCiudadanoTarjeta)] text-center text-[color:var(--colorBlanco)] text-[color:var(--colorTextoTarjeta)] ml-5 p-2.5 border-solid;
    }

    #no_izquierda:checked+label[data-v-a5cac0f2],
    #no_derecha:checked+label[data-v-a5cac0f2] {
        @apply bg-[color:var(--colorBusquedaCiudadanoPerfilBoton)] text-[color:var(--colorTextoTarjeta)] ml-5;
    }

    .ciudadano_perfil_usuario_derecha {
        @apply grid-cols-1;
    }

    .ciudadano_perfil_botones[data-v-a5cac0f2][data-v-a5cac0f2] {
        @apply h-[19rem] flex-col gap-2 mt-4;
    }

    .ciudadano_perfil_otros {
        @apply grid-cols-1;
    }

    .ciudadano_perfil_otros_container[data-v-a5cac0f2] {
        @apply flex h-80 w-full bg-[color:var(--colorBusquedaCiudadanoTarjeta)] mt-4 rounded-[0.7rem];
    }

    .notas_container {
        @apply p-2;
    }

    .tarjeta_otros,
    .tarjeta_multa,
    .tarjeta_multa_Pagada {
        @apply h-auto p-2;
    }

    .ciudadano_perfil_usuario_izquierda img {
        @apply w-40 h-40;
    }

    .ciudadano_boton[data-v-edd735a0] {
        @apply flex h-8 w-20 items-center justify-center bg-[color:var(--colorBotonBusquedaCiudadano)] text-[color:var(--colorTextoTarjeta)] no-underline mt-4;
    }

    .ciudadano_busqueda {
        @apply gap-1;
    }
}
</style>