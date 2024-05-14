<script lang="ts">
import { defineComponent, ref, computed, watch, onMounted } from 'vue';
import ReturnButton from '@/components/ComponentesGenerales/BotonPaginaPrincipalComponente.vue';
import { useRoute } from 'vue-router';
import { useListadoPolicias } from '@/stores/storePolicia';
import type { Policia } from '@/stores/storePolicia';
import { useListadoMultas } from '@/stores/storeMulta';

export default defineComponent({
    components: {
        ReturnButton
    },
    setup() {
        const route = useRoute();
        const store = useListadoPolicias();
        const storeMultas = useListadoMultas();
        const policiaId = ref(parseInt(route.params.id as string || '0'));

        const policiaDetails = computed<Policia>(() => {
            return store.infoPolicias.find(p => p.idPolicia === policiaId.value) || {
                idPolicia: 0,
                idCiudadano: 0,
                nombre: '',
                apellidos: '',
                rango: '',
                numeroPlaca: '',
                foto: undefined
            };
        });

        const multas = computed(() => storeMultas.infoMultas);

        watch(() => route.params.id, (newId) => {
            const parsedId = parseInt(newId as string);
            if (parsedId) {
                policiaId.value = parsedId;
                store.cargarDatosPoliciasId(parsedId);
                storeMultas.cargarDatosMultas(parsedId);
            }
        }, { immediate: true });

        onMounted(() => {
            if (policiaId.value) {
                store.cargarDatosPoliciasId(policiaId.value);
                storeMultas.cargarDatosMultas(policiaId.value);
            }
        });

        return {
            policiaDetails,
            policiaId,
            multas
        };
    }
});
</script>


<template>
    <div class="policia_menu_derecha">
        <div class="policia_menu_derecha_titulo">
            <h2>PERFIL DEL POLICIA</h2>
        </div>
        <div class="policia_perfil">
            <p v-if="!policiaId">SELECCIONA UN POLICIA PARA CARGAR LA INFORMACIÓN</p>
            <template v-else>
                <div class="policia_perfil_usuario">
                    <div class="policia_perfil_usuario_izquierda">
                        <img src="https://via.placeholder.com/150" alt="">
                    </div>
                    <div class="policia_perfil_usuario_derecha">
                        <div class="policia_tarjeta">
                            <p>Nombre</p>
                            <p>{{ policiaDetails.ciudadano?.nombre }}</p>
                        </div>
                        <div class="policia_tarjeta">
                            <p>Apellidos</p>
                            <p>{{ policiaDetails.ciudadano?.apellidos }}</p>
                        </div>
                        <div class="policia_tarjeta">
                            <p>Genero</p>
                            <p>{{ policiaDetails.ciudadano?.genero }}</p>
                        </div>
                        <div class="policia_tarjeta">
                            <p>Nacionalidad</p>
                            <p>{{ policiaDetails.ciudadano?.nacionalidad }}</p>
                        </div>
                        <div class="policia_tarjeta">
                            <p>Fecha de nacimiento</p>
                            <p>{{ policiaDetails.ciudadano?.fechaNacimiento }}</p>
                        </div>
                        <div class="policia_tarjeta">
                            <p>ID</p>
                            <p>{{ policiaDetails.idPolicia }}</p>
                        </div>
                        <div class="policia_tarjeta">
                            <p>Número de teléfono</p>
                            <p>{{ policiaDetails.ciudadano?.numeroTelefono }}</p>
                        </div>
                        <div class="policia_tarjeta">
                            <p>Número de cuenta</p>
                            <p>{{ policiaDetails.ciudadano?.numeroCuentaBancaria }}</p>
                        </div>
                        <div class="policia_tarjeta">
                            <p>Trabajo</p>
                            <p>{{ policiaDetails.ciudadano?.trabajo }}</p>
                        </div>
                    </div>
                </div>
                <div class="policia_perfil_info">
                    <div class="policia_perfil_info_izquierda">
                        <h2>RANGO</h2>
                        <div class="policia_perfil_boton">
                            <h2>{{ policiaDetails.rango.nombre }}</h2>
                        </div>
                    </div>
                    <div class="policia_perfil_info_derecha">
                        <h2>NUMERO DE PLACA</h2>
                        <div class="policia_perfil_boton">
                            <h2>{{ policiaDetails.numeroPlaca }}</h2>
                        </div>
                    </div>
                </div>
                <div class="policia_perfil_otros">
                    <div class="policia_perfil_otros_container">
                        <div class="policia_perfil_notasdiv">
                            <div class="policia_perfil_notasdiv_titulo">
                                <svg class="policia_icono" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                    <path
                                        d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H288V368c0-26.5 21.5-48 48-48H448V96c0-35.3-28.7-64-64-64H64zM448 352H402.7 336c-8.8 0-16 7.2-16 16v66.7V480l32-32 64-64 32-32z" />
                                </svg>
                                <p>NOTAS</p>
                            </div>
                            <!-- añadir en el back las notas en el policia -->
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

                    <div class="policia_perfil_otros_container">
                        <div class="policia_perfil_notasdiv">
                            <div class="policia_perfil_notasdiv_titulo">
                                <svg class="policia_icono" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                    <path
                                        d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H288V368c0-26.5 21.5-48 48-48H448V96c0-35.3-28.7-64-64-64H64zM448 352H402.7 336c-8.8 0-16 7.2-16 16v66.7V480l32-32 64-64 32-32z" />
                                </svg>
                                <p>DENUNCIAS</p>
                            </div>
                            <!-- añadir en el back las denuncias en el policia -->
                            <div class="notas_container">
                                <div class="tarjeta_otros">
                                    <p>NO HAY DENUNCIAS REGISTRADAS</p>
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

                    <div class="policia_perfil_otros_container">
                        <div class="policia_perfil_notasdiv">
                            <div class="policia_perfil_notasdiv_titulo">
                                <svg class="policia_icono" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                    <path
                                        d="M96 0C43 0 0 43 0 96V416c0 53 43 96 96 96H384h32c17.7 0 32-14.3 32-32s-14.3-32-32-32V384c17.7 0 32-14.3 32-32V32c0-17.7-14.3-32-32-32H384 96zm0 384H352v64H96c-17.7 0-32-14.3-32-32s14.3-32 32-32zm32-240c0-8.8 7.2-16 16-16H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16zm16 48H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16s7.2-16 16-16z" />
                                </svg>
                                <p>MULTAS</p>
                            </div>
                            <template v-if="multas && multas.length > 0">
                                <div class="notas_container">
                                    <div v-for="multa in multas" :key="multa.idMulta" class="tarjeta_multa">
                                        <div class="tarjeta_otros_cabecera">
                                            <p>{{ new Date(multa.fecha).toLocaleDateString() }} - {{ new
                                                Date(multa.fecha).toLocaleTimeString() }}</p>
                                        </div>
                                        <p>{{ multa.articuloPenal }}</p>
                                        <div class="tarjeta_multa_info">
                                            <p>ID Policía: {{ multa.idPolicia }}</p>
                                            <p>Precio: {{ multa.precio }}</p>
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
                </div>
            </template>
            <return-button />
        </div>
    </div>
</template>

<style>
.policia_menu_derecha {
    background-color: var(--colorFondoCiudadano2);
    width: 70%;
    display: flex;
    flex-direction: column;
    border-radius: 0.5rem;
    padding-top: 2rem;
    padding-bottom: 2rem;
    gap: 2rem;
}

.policia_menu_derecha_titulo {
    display: flex;
    justify-content: center;
    align-items: center;
}

.policia_menu_derecha_titulo h2 {
    background-color: var(--colorFondoCiudadano);
    border-radius: 0.7rem;
    height: 2.5rem;
    color: var(--colorTextoTarjeta);
    display: flex;
    align-items: center;
    width: 80%;
    display: flex;
    justify-content: center;
    font-size: 18px;
}

.policia_perfil_usuario {
    display: flex;
    width: 100%;
    gap: 3rem;
}

.policia_perfil_usuario_izquierda {
    display: flex;
    justify-content: center;
    align-items: center;
}

.policia_perfil_usuario_izquierda img {
    width: 15rem;
    height: 15rem;
}

.policia_perfil_usuario_derecha {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    justify-content: center;
    align-items: center;
    width: 100%;
}

.policia_tarjeta {
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

.policia_tarjeta p {
    font-size: 16px;
}

.policia_perfil_info {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 4rem;
    gap: 3rem;
}

.policia_perfil_info_derecha {
    background-color: var(--colorBusquedaCiudadanoTarjeta);
    width: 50%;
    display: flex;
    justify-content: space-between;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    align-items: center;
    border-radius: 0.7rem;
}

.policia_perfil_info_izquierda {
    background-color: var(--colorBusquedaCiudadanoTarjeta);
    width: 50%;
    display: flex;
    justify-content: space-between;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    align-items: center;
    border-radius: 0.7rem;
}

.policia_perfil_info_izquierda h2 {
    color: var(--colorTextoTarjeta);
}

.policia_perfil_info_derecha h2 {
    color: var(--colorTextoTarjeta);
}

.policia_perfil_boton h2 {
    background-color: var(--colorTituloTarjetaPoliciaRango);
    padding: 0.5rem;
    border-radius: 0.4rem;
}

.policia_perfil_otros {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto;
    gap: 1rem;
    justify-content: center;
    align-items: start;
    width: 100%;
}

.policia_perfil_otros_container {
    display: flex;
    background-color: var(--colorBusquedaCiudadanoTarjeta);
    border-radius: 0.7rem;
    width: 100%;
    height: 20rem;
}

.policia_perfil_otros_container:nth-child(1),
.policia_perfil_otros_container:nth-child(2) {
    grid-row: 1;
}

.policia_perfil_otros_container:nth-child(3) {
    grid-column: 1 / span 2;
    grid-row: 2;
}


.policia_icono {
    width: 2rem;
    height: 1rem;
    fill: var(--colorBlanco);
}

.policia_perfil_notasdiv {
    display: flex;
    width: 100%;
    padding: 1rem;
    gap: 0.5rem;
    flex-direction: column;
}

.policia_perfil_notasdiv p {
    font-size: 16px;
}

.policia_perfil_multas {
    display: flex;
    width: 100%;
    justify-content: flex-end;
}

.policia_perfil_multas p {
    font-size: 16px;
}

.policia_perfil {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
}

.policia_perfil p {
    color: var(--colorTextoTarjeta);
}

.policia_perfil_notasdiv_titulo {
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
