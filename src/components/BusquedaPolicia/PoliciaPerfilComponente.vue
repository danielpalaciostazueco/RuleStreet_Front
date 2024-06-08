<script lang="ts">
import { defineComponent, ref, computed, watch, onMounted, reactive } from 'vue';
import ReturnButton from '@/components/ComponentesGenerales/BotonPaginaPrincipalComponente.vue';
import { useRoute } from 'vue-router';
import { useListadoPolicias } from '@/stores/storePolicia';
import { useListadoMultas, type Multa } from '@/stores/storeMulta';
import { useI18n } from 'vue-i18n';
import type { Vehiculo } from '@/types/types';

interface Permiso {
  idPermiso: number;
  nombre: string;
  name: string;
}

interface Rango {
  idRango: number;
  nombre: string;
  name: string;
  salario: number;
  isLocal: boolean;
  permisos: Permiso[];
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
  numeroTelefono: number;
  numeroCuentaBancaria: string;
  isPoli: boolean;
  isBusquedaYCaptura: boolean;
  isPeligroso: boolean;
  multas: Multa[];
  vehiculos: Vehiculo[];
  trabajo: string;
  imagenUrl: string;
}

interface Policia {
  idPolicia: number;
  idCiudadano: number;
  rango: Rango;
  numeroPlaca: string;
  ciudadano: Ciudadano;
  contrasena?: string;
  isPolicia: boolean;
}

export default defineComponent({
  components: {
    ReturnButton
  },
  setup() {

    const route = useRoute();
    const store = useListadoPolicias();
    const storeMultas = useListadoMultas();
    const policiaId = ref(parseInt(route.params.id as string || '0'));
    const infoPolicias = reactive<Array<Policia>>([]);
    const { t, locale } = useI18n();
    const policiaDetails = ref<Policia | null>(null);

    const CargarDatosPolicias = async (id: number) => {
      await store.cargarDatosPoliciasId(id);
      infoPolicias.splice(0, infoPolicias.length);
      infoPolicias.push(store.infoPoli);
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

    const multas = computed(() => storeMultas.infoMultas);

    watch(() => route.params.id, (newId) => {
      const parsedId = parseInt(newId as string);
      if (parsedId) {
        policiaId.value = parsedId;
        CargarDatosPolicias(parsedId);
        storeMultas.cargarDatosMultas(parsedId);
      }
    }, { immediate: true });


    onMounted(() => {
      if (policiaId.value) {
        CargarDatosPolicias(policiaId.value);
        storeMultas.cargarDatosMultas(policiaId.value);
      }
    });

    return {
      policiaDetails,
      policiaId,
      multas,
      locale,
      formatDate,
      infoPolicias
    };
  }
});
</script>



<template>
  <div class="policia_menu_derecha">
    <div class="policia_menu_derecha_titulo">
      <h2>{{ $t('PerfilPolicia.Profile') }}</h2>
    </div>
    <div class="policia_perfil">
      <p v-if="!policiaId">{{ $t('PerfilPolicia.Select') }}</p>
      <template v-else>
        <div class="policia_perfil_usuario">
          <div class="policia_perfil_usuario_izquierda">
            <img src="https://via.placeholder.com/150" alt="">
          </div>
          <div class="policia_perfil_usuario_derecha">
            <div class="policia_tarjeta">
              <p>{{ $t('PerfilPolicia.Name') }}</p>
              <p>{{ infoPolicias[0].ciudadano?.nombre }}</p>
            </div>
            <div class="policia_tarjeta">
              <p>{{ $t('PerfilPolicia.Surname') }}</p>
              <p>{{ infoPolicias[0].ciudadano?.apellidos }}</p>
            </div>
            <div class="policia_tarjeta">
              <p>{{ $t('PerfilPolicia.Gender') }}</p>
              <p v-if="locale === 'es'">{{ infoPolicias[0].ciudadano?.genero }}</p>
              <p v-if="locale === 'en'">{{ infoPolicias[0].ciudadano?.gender }}</p>
            </div>
            <div class="policia_tarjeta">
              <p>{{ $t('PerfilPolicia.Nationality') }}</p>
              <p v-if="locale === 'es'">{{ infoPolicias[0].ciudadano?.nacionalidad }}</p>
              <p v-if="locale === 'en'">{{ infoPolicias[0].ciudadano?.nationality }}</p>
            </div>
            <div class="policia_tarjeta">
              <p>{{ $t('PerfilPolicia.Birthdate') }}</p>
              <p>{{ formatDate(infoPolicias[0].ciudadano?.fechaNacimiento) }}</p>
            </div>
            <div class="policia_tarjeta">
              <p>ID</p>
              <p>{{ infoPolicias[0].idPolicia }}</p>
            </div>
            <div class="policia_tarjeta">
              <p>{{ $t('PerfilPolicia.PhoneNumber') }}</p>
              <p>{{ infoPolicias[0].ciudadano?.numeroTelefono }}</p>
            </div>
            <div class="policia_tarjeta">
              <p>{{ $t('PerfilPolicia.AccountNumber') }}</p>
              <p>{{ infoPolicias[0].ciudadano?.numeroCuentaBancaria }}</p>
            </div>
            <div class="policia_tarjeta">
              <p>{{ $t('PerfilPolicia.Work') }}</p>
              <p>{{ infoPolicias[0].ciudadano?.trabajo }}</p>
            </div>
          </div>
        </div>
        <div class="policia_perfil_info">
          <div class="policia_perfil_info_izquierda">
            <h2>{{ $t('PerfilPolicia.Rango') }}</h2>
            <div class="policia_perfil_boton">
              <h2 v-if="locale === 'es'">{{ infoPolicias[0].rango.nombre }}</h2>
              <h2 v-if="locale === 'en'">{{ infoPolicias[0].rango.name }}</h2>
            </div>
          </div>
          <div class="policia_perfil_info_derecha">
            <h2>{{ $t('PerfilPolicia.NumeroPlaca') }}</h2>
            <div class="policia_perfil_boton">
              <h2>{{ infoPolicias[0].numeroPlaca }}</h2>
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
                <p>{{ $t('PerfilPolicia.Notas') }}</p>
              </div>
              <!-- añadir en el back las notas en el policia -->
              <div class="notas_container">
                <div class="tarjeta_otros">
                  <p>{{ $t('PerfilPolicia.NoNotas') }}</p>
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
                <p>{{ $t('PerfilPolicia.Multa') }}</p>
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
                      <p>{{ $t('PerfilPolicia.IdPolicia') }} {{ multa.idPolicia }}</p>
                      <p>{{ $t('PerfilPolicia.Precio') }} {{ multa.precio }}</p>
                    </div>
                  </div>
                </div>
              </template>
              <template v-else>
                <div class="notas_container">
                  <div class="tarjeta_multa_titulo">
                    <p>{{ $t('PerfilPolicia.NoMultas') }}</p>
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
  @apply bg-[color:var(--colorFondoCiudadano2)] w-[70%] flex flex-col gap-8 py-8 rounded-lg;
}

.policia_menu {
  @apply flex w-full gap-8;
}

.policia_menu_derecha_titulo {
  @apply flex justify-center items-center;
}

.policia_menu_derecha_titulo h2 {
  @apply bg-[color:var(--colorFondoCiudadano)] h-10 text-[color:var(--colorTextoTarjeta)] flex items-center w-4/5 flex justify-center text-lg rounded-[0.7rem];
}

.policia_perfil_usuario {
  @apply flex w-full gap-12;
}

.policia_perfil_usuario_izquierda {
  @apply flex justify-center items-center;
}

.policia_perfil_usuario_izquierda img {
  @apply w-60 h-60;
}

.policia_perfil_usuario_derecha {
  @apply grid grid-cols-custom gap-4 justify-center items-center w-full;
}

.policia_tarjeta {
  @apply bg-[color:var(--colorBusquedaCiudadanoTarjeta)] w-48 h-16 flex flex-col justify-center gap-2 pl-8 rounded-[0.7rem];
}

.policia_tarjeta p {
  @apply text-base;
}

.policia_perfil_info {
  @apply flex justify-center w-full h-16 gap-12;
}

.policia_perfil_info_derecha {
  @apply bg-[color:var(--colorBusquedaCiudadanoTarjeta)] w-6/12 flex justify-between items-center px-2 rounded-[0.7rem];
}

.policia_perfil_info_izquierda {
  @apply bg-[color:var(--colorBusquedaCiudadanoTarjeta)] w-6/12 flex justify-between items-center px-2 rounded-[0.7rem];
}

.policia_perfil_info_izquierda h2 {
  @apply text-[color:var(--colorTextoTarjeta)];
}

.policia_perfil_info_derecha h2 {
  @apply text-[color:var(--colorTextoTarjeta)];
}

.policia_perfil_boton h2 {
  @apply bg-[color:var(--colorTituloTarjetaPoliciaRango)] p-2 rounded-[0.4rem];
}

.policia_perfil_otros {
  @apply grid grid-cols-[1fr_1fr] grid-rows-[auto_auto] gap-4 justify-center w-full;
  align-items: start;
}

.policia_perfil_otros_container {
  @apply flex bg-[color:var(--colorBusquedaCiudadanoTarjeta)] w-full h-80 rounded-[0.7rem];
}

.policia_perfil_otros_container:nth-child(1),
.policia_perfil_otros_container:nth-child(2) {
  @apply row-[1];
}

.policia_perfil_otros_container:nth-child(3) {
  @apply col-[1_/_span_2] row-[2];
}

.policia_icono {
  @apply w-8 h-4 fill-[var(--colorBlanco)];
}

.policia_perfil_notasdiv {
  @apply flex w-full gap-2 flex-col p-4;
}

.policia_perfil_notasdiv p {
  @apply text-base;
}

.policia_perfil_multas {
  @apply flex w-full justify-end;
}

.policia_perfil_multas p {
  @apply text-base;
}

.policia_perfil {
  @apply flex items-center justify-center flex-col justify-between h-full p-8;
}

.policia_perfil p {
  @apply text-[color:var(--colorTextoTarjeta)];
}

.policia_perfil_notasdiv_titulo {
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

@media (max-width: 1375px) {
  .policia_perfil{
    gap: 2rem
  }
  .policia_perfil_usuario {
    @apply flex w-full gap-12 flex-nowrap flex-col;
  }

  .policia_perfil_info {
    @apply flex justify-center w-full h-16 gap-12 mt-[15px];
  }

  .policia_perfil_otros {
    @apply grid grid-cols-[1fr_1fr] grid-rows-[auto_auto] gap-4 justify-center w-full mt-2.5;
    align-items: start;
  }

  .policia_menu_derecha {
    @apply bg-[color:var(--colorFondoCiudadano2)] flex flex-col gap-8 w-full py-8 rounded-lg;
  }
}

@media (max-width: 1306px) {
  .policia_menu {
    @apply flex w-full flex-col gap-8;
  }

  .policia_menu_izquierda {
    @apply w-full;
  }
}

@media (max-width: 697px) {
  .policia_perfil_usuario_derecha {
    @apply flex grid-cols-custom gap-4 justify-center items-center w-full flex-col;
  }
}

@media (max-width: 500px) {
  .policia_perfil_info {
    @apply flex justify-center w-full h-16 gap-12 flex-col mt-16;
  }

  .policia_perfil_info_izquierda {
    @apply bg-[color:var(--colorBusquedaCiudadanoTarjeta)] w-full flex justify-between items-center px-2 rounded-[0.7rem];
  }

  .policia_perfil_info_derecha {
    @apply bg-[color:var(--colorBusquedaCiudadanoTarjeta)] w-full flex justify-between items-center px-2 rounded-[0.7rem];
  }

  .policia_perfil_boton {
    @apply w-[23%];
  }

  .policia_perfil_otros {
    @apply flex grid-cols-[1fr_1fr] grid-rows-[auto_auto] gap-4 justify-center w-full flex-col mt-2.5 mt-[50px];
    align-items: start;
  }
}
</style>
