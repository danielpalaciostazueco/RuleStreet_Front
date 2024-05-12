<script lang="ts">
import { defineComponent, ref, computed, watch, onMounted } from 'vue';
import ReturnButton from '@/components/ComponentesGenerales/BotonPaginaPrincipalComponente.vue';
import { useRoute } from 'vue-router';
import { useListadoPolicias } from '@/stores/storePolicia';
import type { Policia } from '@/stores/storePolicia';

export default defineComponent({
    components: {
        ReturnButton
    },
    setup() {
        const route = useRoute();
        const store = useListadoPolicias();
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

        watch(() => route.params.id, (newId) => {
            const parsedId = parseInt(newId as string);
            if (parsedId) {
                policiaId.value = parsedId;
                store.cargarDatosPoliciasId(parsedId);
            }
        }, { immediate: true });

        onMounted(() => {
            if (policiaId.value) {
                store.cargarDatosPoliciasId(policiaId.value);
            }
        });

        return {
            policiaDetails,
            policiaId
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
            <p v-if="!policiaId">SELECCIONA UN CIUDADANO PARA CARGAR LA INFORMACIÓN</p>
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
                        <div class="ciudadano_perfil_boton">
                            <p>{{ policiaDetails.rango.nombre }}</p>
                        </div>
                    </div>
                    <div class="policia_perfil_info_derecha">
                        <h2>NUMERO DE PLACA</h2>
                        <div class="ciudadano_perfil_boton">
                            <p>{{ policiaDetails.numeroPlaca }}</p>
                        </div>
                    </div>
                </div>
                <div class="ciudadano_perfil_otros">
                    <div class="ciudadano_perfil_otros_container">
                        <div class="ciudadano_perfil_notasdiv">
                            <svg class="ciudadano_icono" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                <path
                                    d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H288V368c0-26.5 21.5-48 48-48H448V96c0-35.3-28.7-64-64-64H64zM448 352H402.7 336c-8.8 0-16 7.2-16 16v66.7V480l32-32 64-64 32-32z" />
                            </svg>
                            <p>NOTAS</p>
                        </div>
                    </div>
                    <div class="ciudadano_perfil_otros_container">
                        <div class="ciudadano_perfil_notasdiv">
                            <svg class="ciudadano_icono" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                <path
                                    d="M96 0C43 0 0 43 0 96V416c0 53 43 96 96 96H384h32c17.7 0 32-14.3 32-32s-14.3-32-32-32V384c17.7 0 32-14.3 32-32V32c0-17.7-14.3-32-32-32H384 96zm0 384H352v64H96c-17.7 0-32-14.3-32-32s14.3-32 32-32zm32-240c0-8.8 7.2-16 16-16H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16zm16 48H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16s7.2-16 16-16z" />
                            </svg>

                        </div>
                        <div class="ciudadano_perfil_multas">
                            <p>INFORMES</p>
                        </div>
                    </div>
                    <div class="ciudadano_perfil_otros_container">
                        <div class="ciudadano_perfil_notasdiv">
                            <svg class="ciudadano_icono" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                <path
                                    d="M576 128c0-35.3-28.7-64-64-64H64C28.7 64 0 92.7 0 128V384c0 35.3 28.7 64 64 64l352 0 0-128c0-17.7 14.3-32 32-32H576V128zM448 448L576 320H448l0 128zM96 128a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
                            </svg>
                            <p>DENUNCIAS</p>
                        </div>
                    </div>
                    <div class="ciudadano_perfil_otros_container">
                        <div class="ciudadano_perfil_notasdiv">
                            <svg class="ciudadano_icono" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                <path
                                    d="M135.2 117.4L109.1 192H402.9l-26.1-74.6C372.3 104.6 360.2 96 346.6 96H165.4c-13.6 0-25.7 8.6-30.2 21.4zM39.6 196.8L74.8 96.3C88.3 57.8 124.6 32 165.4 32H346.6c40.8 0 77.1 25.8 90.6 64.3l35.2 100.5c23.2 9.6 39.6 32.5 39.6 59.2V400v48c0 17.7-14.3 32-32 32H448c-17.7 0-32-14.3-32-32V400H96v48c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V400 256c0-26.7 16.4-49.6 39.6-59.2zM128 288a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm288 32a32 32 0 1 0 0-64 32 32 0 1 0 0 64z" />
                            </svg>
                            <p>VEHICULOS</p>
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
}

.policia_perfil_info_izquierda {
    background-color: var(--colorBusquedaCiudadanoTarjeta);
    width: 50%;
    display: flex;
    justify-content: space-between;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    align-items: center;
}

.policia_perfil_info_izquierda h2 {
    color: var(--colorTextoTarjeta);
}

.policia_perfil_info_derecha h2 {
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
