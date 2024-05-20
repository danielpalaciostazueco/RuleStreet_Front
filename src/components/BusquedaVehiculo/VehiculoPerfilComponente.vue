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
  <div class="vehiculo_menu_derecha">
    <div class="vehiculo_menu_derecha_titulo">
      <h2>{{$t('PerfilVehiculo.Profile')}}</h2>
    </div>
    <div class="vehiculo_perfil">
      <p v-if="!vehicleid">{{$t('PerfilVehiculo.Select')}}</p>
      <template v-else>
        <div class="vehiculo_perfil_usuario">
          <div class="vehiculo_perfil_usuario_izquierda">
            <img src="https://via.placeholder.com/150" alt="">
          </div>
          <div class="vehiculo_perfil_usuario_derecha">
            <div class="vehiculo_tarjeta">
              <p>{{$t('PerfilVehiculo.Placa')}}</p>
              <p>{{ vehicleDetails.matricula }}</p>
            </div>
            <div class="vehiculo_tarjeta">
              <p>{{$t('PerfilVehiculo.Model')}}</p>
              <p>{{ vehicleDetails.modelo }}</p>
            </div>
            <div class="vehiculo_tarjeta">
              <p>{{$t('PerfilVehiculo.Brans')}}</p>
              <p>{{ vehicleDetails.marca }}</p>
            </div>
            <div class="vehiculo_tarjeta">
              <p>{{$t('PerfilVehiculo.Color')}}</p>
              <p>{{ vehicleDetails.color }}</p>
            </div>
            <div class="vehiculo_tarjeta">
              <p>{{$t('PerfilVehiculo.Dueno')}}</p>
              <p>{{ vehicleDetails.ciudadano.nombre }}</p>
            </div>

          </div>
        </div>
        <div class="vehiculo_perfil_botones">
          <div class="vehiculo_perfil_botones_izquierda">
            <h2>{{$t('PerfilVehiculo.BusquedaCaptura')}}</h2>
            <div class="vehiculo_perfil_boton">
              <input type="radio" id="no_izquierda" name="response_izquierda" checked>
              <label for="no_izquierda">{{$t('PerfilVehiculo.No')}}</label>
              <input type="radio" id="yes_izquierda" name="response_izquierda">
              <label for="yes_izquierda">{{$t('PerfilVehiculo.Yes')}}</label>
            </div>
          </div>
        </div>
      </template>
      <return-button />
    </div>
  </div>
</template>
<style scoped>
.vehiculo_menu_derecha {
  @apply bg-[color:var(--colorFondoCiudadano2)] w-9/12 flex flex-col gap-8 py-8 rounded-lg;
}

.vehiculo_menu_derecha_titulo {
  @apply flex justify-center items-center;
}

.vehiculo_menu_derecha_titulo h2 {
  @apply bg-[color:var(--colorFondoCiudadano)] h-10 text-[color:var(--colorTextoTarjeta)] flex items-center w-4/5 flex justify-center rounded-[0.7rem];
}

.vehiculo_perfil {
  @apply flex items-center justify-center flex-col justify-between h-full p-8;
}

.vehiculo_perfil p {
  @apply text-[color:var(--colorTextoTarjeta)];
}

.vehiculo_perfil_usuario {
  @apply flex w-full gap-12;
}

.vehiculo_perfil_usuario_izquierda {
  @apply flex justify-center items-center;
}

.vehiculo_perfil_usuario_izquierda img {
  @apply w-60 h-60;
}

.vehiculo_perfil_usuario_derecha {
  @apply grid grid-cols-[repeat(3, 1fr)] gap-4 justify-center items-center w-full;
}

.vehiculo_tarjeta {
  @apply bg-[color:var(--colorBusquedaCiudadanoTarjeta)] w-48 h-16 flex flex-col justify-center gap-2 pl-8 rounded-[0.7rem];
}

.vehiculo_tarjeta p {
  @apply text-base;
}

.vehiculo_perfil_botones {
  @apply flex gap-8 bg-[color:var(--colorBusquedaCiudadanoTarjeta)] w-full h-32 justify-center items-center rounded-[0.7rem];
}

.vehiculo_perfil_boton input[type="radio"] {
  @apply hidden;
}

.vehiculo_perfil_boton label {
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

.vehiculo_perfil_botones_izquierda {
  @apply flex flex-col items-center gap-4;
}

.vehiculo_perfil_botones_izquierda h2 {
  @apply text-[color:var(--colorTextoTarjeta)];
}

@media (max-width: 1497px) {
  .vehiculo_perfil_usuario {
    @apply flex w-full gap-12 flex-col;
  }

  .vehiculo_perfil_botones {
    @apply flex gap-8 bg-[color:var(--colorBusquedaCiudadanoTarjeta)] w-full h-32 justify-center items-center mt-[25px] rounded-[0.7rem];
  }

  .ciudadano_boton {
    @apply flex h-8 w-20 items-center justify-center bg-[color:var(--colorBotonBusquedaCiudadano)] text-[color:var(--colorTextoTarjeta)] no-underline mt-[5px];
  }
}

@media (max-width: 1120px) {
  .vehiculo_menu {
    @apply flex flex-col w-4/5 gap-8 h-[50rem];
  }

  .vehiculo_menu_izquierda {
    @apply bg-[color:var(--colorFondoCiudadano2)] w-full flex flex-col gap-8 py-8 rounded-lg;
  }

  .vehiculo_menu_derecha {
    @apply bg-[color:var(--colorFondoCiudadano2)] w-full flex flex-col gap-8 py-8 rounded-lg;
  }
}

@media (max-width: 787px) {
  .vehiculo_perfil_usuario_derecha {
    @apply flex grid-cols-[repeat(3, 1fr)] gap-4 justify-center items-center w-full flex-col;
  }
}

@media (max-width: 620px) {
  .vehiculo_perfil_boton {
    @apply flex flex-col mb-1.5;
  }

  .vehiculo_perfil_botones {
    @apply flex gap-8 bg-[color:var(--colorBusquedaCiudadanoTarjeta)] w-full h-36 justify-center items-center mt-[25px] rounded-[0.7rem];
  }
}
</style>