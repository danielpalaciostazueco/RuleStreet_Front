<script lang="ts">
import { defineComponent, type PropType, computed } from 'vue';
import VehicleCard from '@/components/BusquedaVehiculo/TarjetaVehiculoComponente.vue';
interface Vehiculo {
  idVehiculo: number;
  matricula: string;
  marca: string;
  modelo: string;
  color: string;
  enColor: string;
  idCiudadano: number;
  photo: string;
  ciudadano: Ciudadano;
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
  codigoPenal: CodigoPenal[];
}

export interface Ciudadano {
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
  imagenUrl: string;
  isPeligroso: boolean;
  diaIntroducidoListaCaptura: Date;
  multas: Multa[];
  vehiculos: Vehiculo[];
}
import { useI18n } from 'vue-i18n';

export default defineComponent({
  components: {
    VehicleCard
  },
  props: {
    vehicles: {
      type: Array as PropType<Vehiculo[]>,
      required: true
    }
  },
  setup() {
    const { t, locale } = useI18n();
    const currentLocale = computed(() => locale.value);

    return {
      t,
      locale: currentLocale
    };
  }
});
</script>

<template>
  <div class="vehiculo_menu_izquierda_contenedor">
    <div class="vehiculo_contenedor_tarjeta" v-if="vehicles && vehicles.length > 0">
      <VehicleCard v-if="locale === 'es'" v-for="vehicle in vehicles" :key="vehicle.idVehiculo" :vehicle="{
        idVehiculo: vehicle.idVehiculo,
        matricula: vehicle.matricula,
        modelo: vehicle.modelo,
        marca: vehicle.marca,
        color: vehicle.color,
        Photo: vehicle.photo,
        ciudadano: vehicle.ciudadano
      }" />

      <VehicleCard v-if="locale === 'en'" v-for="vehicle in vehicles" :key="vehicle.idVehiculo" :vehicle="{
        idVehiculo: vehicle.idVehiculo,
        matricula: vehicle.matricula,
        modelo: vehicle.modelo,
        marca: vehicle.marca,
        color: vehicle.enColor,
        Photo: vehicle.photo,
        ciudadano: vehicle.ciudadano
      }" />
    </div>
    <p v-else>{{ $t('ListadoCiudadano.Title') }}</p>
  </div>
</template>
<style scoped>
.vehiculo_contenedor_tarjeta {
  @apply flex flex-col gap-8;
}

.vehiculo_menu_izquierda_contenedor {
  @apply flex flex-col h-full overflow-y-auto px-8 rounded-lg;
}

.vehiculo_menu_izquierda_contenedor p {
  @apply text-[color:var(--colorTextoTarjeta)];
}

.vehiculo_menu_izquierda_contenedor::-webkit-scrollbar {
  @apply w-2;
}

.vehiculo_menu_izquierda_contenedor::-webkit-scrollbar-track {
  @apply bg-[color:var(--colorFondoCiudadano2)];
}

.vehiculo_menu_izquierda_contenedor::-webkit-scrollbar-thumb {
  @apply bg-[color:var(--colorBlanco)] rounded hover:bg-[color:var(--colorFondoCiudadano)];
}

@media (max-width: 768px) {
  .vehiculo_menu_izquierda_contenedor {
    @apply px-4;
  }
}

@media (max-width: 480px) {
  .vehiculo_menu_izquierda_contenedor {
    @apply px-2;
  }

  .vehiculo_contenedor_tarjeta {
    @apply max-h-40 overflow-y-auto;
  }
}
</style>
