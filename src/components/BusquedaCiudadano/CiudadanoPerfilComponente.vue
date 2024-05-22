<script lang="ts">
import { defineComponent, ref, computed, watch, onMounted } from 'vue';
import ReturnButton from '@/components/ComponentesGenerales/BotonPaginaPrincipalComponente.vue';
import Modal from '@/components/BusquedaCiudadano/CiudadanoMultasComponente.vue';
import { useRoute } from 'vue-router';
import { useListadoCiudadanos } from '@/stores/storeCiudadano';
import { useListadoPolicias } from '@/stores/storePolicia';
import { useI18n } from 'vue-i18n';

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
  fecha: string;
  precio: number;
  articuloPenal: string;
  descripcion: string;
  description: string;
  pagada: boolean;
  idCiudadano: number;
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
}

export default defineComponent({
  components: {
    ReturnButton,
    Modal
  },
  setup() {
    const route = useRoute();
    const store = useListadoCiudadanos();
    const storePolicias = useListadoPolicias();
    const citizenId = ref(parseInt(parseRouteParam(route.params.id) || '0'));
    const showModal = ref(false);

    const { t, locale } = useI18n(); // Movido aquí

    const reloadCitizenDetails = () => {
      if (citizenId.value) {
        store.cargarDatosCiudadanosId(citizenId.value);
      }
    };

    const citizenDetails = computed<Ciudadano>(() => {
      return store.infoCiudadanos.find(c => c.idCiudadano === citizenId.value) || {
        idCiudadano: 0,
        nombre: '',
        apellidos: '',
        dni: '',
        genero: '',
        gender: '',
        nacionalidad: '',
        nationality: '',
        fechaNacimiento: new Date(),
        direccion: '',
        address: '',
        numeroTelefono: '',
        numeroCuentaBancaria: '',
        isPoli: false,
        isBusquedaYCaptura: false,
        isPeligroso: false,
        multas: [],
        vehiculos: []
      };
    });

    const getNombrePolicia = (idPolicia: any) => {
      const policia = storePolicias.infoPolicias.find(p => p.idPolicia === idPolicia);
      return policia ? policia.ciudadano.nombre + " " + policia.ciudadano.apellidos : 'Desconocido';
    };

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

    onMounted(async () => {
      await storePolicias.cargarDatosPolicias();
      if (citizenId.value) {
        store.cargarDatosCiudadanosId(citizenId.value);
      }
    });

    return {
      citizenDetails,
      citizenId,
      showModal,
      openModal,
      reloadCitizenDetails,
      getNombrePolicia,
      locale
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
      <template v-else>
        <div class="ciudadano_perfil_usuario">
          <div class="ciudadano_perfil_usuario_izquierda">
            <img src="https://via.placeholder.com/150" alt="">
          </div>
          <div class="ciudadano_perfil_usuario_derecha">
            <div class="ciudadano_tarjeta">
              <p>{{ $t('PerfilCiudadano.Name') }}</p>
              <p>{{ citizenDetails.nombre }}</p>
            </div>
            <div class="ciudadano_tarjeta">
              <p>{{ $t('PerfilCiudadano.Surname') }}</p>
              <p>{{ citizenDetails.apellidos }}</p>
            </div>
            <div class="ciudadano_tarjeta">
              <p>{{ $t('PerfilCiudadano.Gender') }}</p>
              <p v-if="locale === 'es'">{{ citizenDetails.genero }}</p>
              <p v-if="locale === 'en'">{{ citizenDetails.gender }}</p>
            </div>
            <div class="ciudadano_tarjeta">
              <p>{{ $t('PerfilCiudadano.Nationality') }}</p>
              <p v-if="locale === 'es'">{{ citizenDetails.nacionalidad }}</p>
              <p v-if="locale === 'es'">{{ citizenDetails.nationality }}</p>
              <p v-if="locale === 'en'">{{ citizenDetails.nationality }}</p>
            </div>
            <div class="ciudadano_tarjeta">
              <p>{{ $t('PerfilCiudadano.Birthdate') }}</p>
              <p>{{ citizenDetails.fechaNacimiento }}</p>
            </div>
            <div class="ciudadano_tarjeta">
              <p>ID</p>
              <p>{{ citizenDetails.idCiudadano }}</p>
            </div>
            <div class="ciudadano_tarjeta">
              <p>{{ $t('PerfilCiudadano.PhoneNumber') }}</p>
              <p>{{ citizenDetails.numeroTelefono }}</p>
            </div>
            <div class="ciudadano_tarjeta">
              <p>{{ $t('PerfilCiudadano.AccountNumber') }}</p>
              <p>{{ citizenDetails.numeroCuentaBancaria }}</p>
            </div>
            <div class="ciudadano_tarjeta">
              <p>{{ $t('PerfilCiudadano.Work') }}</p>
              <p>{{ citizenDetails.trabajo }}</p>
            </div>
          </div>
        </div>
        <div class="ciudadano_perfil_botones">
          <div class="ciudadano_perfil_botones_izquierda">
            <h2>{{ $t('PerfilCiudadano.Captura') }}</h2>
            <div class="ciudadano_perfil_boton">
              <input type="radio" id="no_izquierda" value="false" v-model="citizenDetails.isBusquedaYCaptura">
              <label for="no_izquierda">{{ $t('PerfilCiudadano.No') }}</label>
              <input type="radio" id="yes_izquierda" value="true" v-model="citizenDetails.isBusquedaYCaptura">
              <label for="yes_izquierda">{{ $t('PerfilCiudadano.Yes') }}</label>
            </div>
          </div>
          <div class="ciudadano_perfil_botones_derecha">
            <h2>{{ $t('PerfilCiudadano.Peligroso') }}</h2>
            <div class="ciudadano_perfil_boton">
              <input type="radio" id="no_derecha" value="false" v-model="citizenDetails.isPeligroso">
              <label for="no_derecha">{{ $t('PerfilCiudadano.No') }}</label>
              <input type="radio" id="yes_derecha" value="true" v-model="citizenDetails.isPeligroso">
              <label for="yes_derecha">{{ $t('PerfilCiudadano.Yes') }}</label>
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
                <p>{{ $t('PerfilCiudadano.Notas') }}</p>
              </div>
              <!-- añadir en el back las notas en el ciudadano -->
              <div class="notas_container">
                <div class="tarjeta_otros">
                  <p>{{ $t('PerfilCiudadano.NoNotasº') }}</p>
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
                <p>{{ $t('PerfilCiudadano.Multa') }}</p>
                <div class="ciudadano_perfil_multas">
                  <p @click="showModal = true">+ {{ $t('PerfilCiudadano.AddMulta') }}</p>
                </div>
                <Modal :visible="showModal" @update:visible="showModal = $event" @onModalClose="reloadCitizenDetails" />
              </div>
              <template v-if="citizenDetails.multas && citizenDetails.multas.length > 0">
                <div class="notas_container">
                  <div v-for="multa in citizenDetails.multas" :key="multa.idMulta" class="tarjeta_multa"
                    :class="{ 'tarjeta_multa_pagada': multa.pagada }">
                    <div class="tarjeta_otros_cabecera">
                      <p>{{ new Date(multa.fecha).toLocaleDateString() }} - {{ new
                        Date(multa.fecha).toLocaleTimeString() }}</p>
                    </div>
                    <p>{{ multa.codigoPenal.articulo }}</p>
                    <div class="tarjeta_multa_info">
                      <div class="tarjeta_multa_iconos">
                        <p>{{ getNombrePolicia(multa.idPolicia) }}</p>
                        <svg class="tarjeta_multa_icono" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                          <path
                            d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
                        </svg>
                      </div>
                      <div class="tarjeta_multa_iconos">
                        <svg class="tarjeta_multa_icono" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                          <path
                            d="M48.1 240c-.1 2.7-.1 5.3-.1 8v16c0 2.7 0 5.3 .1 8H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H60.3C89.9 419.9 170 480 264 480h24c17.7 0 32-14.3 32-32s-14.3-32-32-32H264c-57.9 0-108.2-32.4-133.9-80H256c17.7 0 32-14.3 32-32s-14.3-32-32-32H112.2c-.1-2.6-.2-5.3-.2-8V248c0-2.7 .1-5.4 .2-8H256c17.7 0 32-14.3 32-32s-14.3-32-32-32H130.1c25.7-47.6 76-80 133.9-80h24c17.7 0 32-14.3 32-32s-14.3-32-32-32H264C170 32 89.9 92.1 60.3 176H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H48.1z" />
                        </svg>
                        <p>{{ multa.codigoPenal.precio }}</p>
                      </div>
                      <div class="tarjeta_multa_iconos">
                        <svg class="tarjeta_multa_icono" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                          <path
                            d="M318.6 9.4c-12.5-12.5-32.8-12.5-45.3 0l-120 120c-12.5 12.5-12.5 32.8 0 45.3l16 16c12.5 12.5 32.8 12.5 45.3 0l4-4L325.4 293.4l-4 4c-12.5 12.5-12.5 32.8 0 45.3l16 16c12.5 12.5 32.8 12.5 45.3 0l120-120c12.5-12.5 12.5-32.8 0-45.3l-16-16c-12.5-12.5-32.8-12.5-45.3 0l-4 4L330.6 74.6l4-4c12.5-12.5 12.5-32.8 0-45.3l-16-16zm-152 288c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3l48 48c12.5 12.5 32.8 12.5 45.3 0l112-112c12.5-12.5 12.5-32.8 0-45.3l-1.4-1.4L272 285.3 226.7 240 168 298.7l-1.4-1.4z" />
                        </svg>
                        <p>{{ multa.codigoPenal.sentencia }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
              <template v-else>
                <div class="notas_container">
                  <div class="tarjeta_multa_titulo">
                    <p>{{ $t('PerfilCiudadano.NoMultas') }}</p>
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
                <p>{{ $t('PerfilCiudadano.Vehicles') }}</p>
              </div>
              <template v-if="citizenDetails.vehiculos && citizenDetails.vehiculos.length > 0">
                <div v-for="vehiculo in citizenDetails.vehiculos" :key="vehiculo.idVehiculo" class="tarjeta_otros">
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
</template>
