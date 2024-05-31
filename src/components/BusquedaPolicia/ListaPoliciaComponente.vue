<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import PoliciaCard from '@/components/BusquedaPolicia/TarjetaPoliciaComponente.vue';
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
  multas: any[];
  vehiculos: any[];
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
    PoliciaCard
  },
  props: {
    policias: Array as PropType<Array<Policia>>
  }
});
</script>

<template>
  <div class="policia_menu_izquierda_contenedor">
    <div class="policia_contenedor_tarjeta" v-if="policias && policias.length > 0">
      <policia-card v-for="poli in policias" :key="poli.idPolicia" :policia="{
        idPolicia: poli.idPolicia,
        nombre: poli.ciudadano.nombre,
        apellidos: poli.ciudadano.apellidos,
        rango: poli.rango,
        numeroPlaca: poli.numeroPlaca
      }" />
    </div>
    <p v-else>{{ $t('ListadoCiudadano.Title') }}</p>
  </div>
</template>

<style scoped>
.policia_contenedor_tarjeta {
  @apply flex flex-col gap-8;
}

.policia_menu_izquierda_contenedor {
  @apply flex flex-col h-full overflow-y-auto px-8 rounded-lg;
}

.policia_menu_izquierda_contenedor p {
  @apply text-[color:var(--colorTextoTarjeta)];
}

.policia_menu_izquierda_contenedor::-webkit-scrollbar {
  @apply w-2;
}

.policia_menu_izquierda_contenedor::-webkit-scrollbar-track {
  @apply bg-[color:var(--colorFondoCiudadano2)];
}

.vpolicia_menu_izquierda_contenedor::-webkit-scrollbar-thumb {
  @apply bg-[color:var(--colorBlanco)] rounded;
}

.policia_menu_izquierda_contenedor::-webkit-scrollbar-thumb:hover {
  @apply bg-[color:var(--colorFondoCiudadano)];
}
</style>