<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import RangoCard from '@/components/Rangos/TarjetaRangoComponente.vue';
import type { Rango } from '@/stores/storeRango';

export default defineComponent({
  components: {
    RangoCard
  },
  props: {
    ranges: Array as PropType<Rango[]>
  },
  methods: {
    selectRange(idRango: number) {
      this.$emit('select-range', idRango);
    }
  }
});
</script>

<template>
  <div class="rango_menu_izquierda_contenedor">
    <div class="rango_contenedor_tarjetas" v-if="ranges && ranges.length > 0">
      <RangoCard v-for="range in ranges" :key="range.idRango" :range="{
        id: range.idRango,
        name: range.nombre,
      }" @select-range="selectRange" />
    </div>
    <p v-else>{{ $t('ListadoRango.Title') }}</p> 
  </div>
</template>
<style scoped>
.rango_menu_izquierda_contenedor {
  @apply flex flex-col h-full overflow-y-auto px-8 rounded-lg;
}

.rango_menu_izquierda_contenedor p {
  @apply text-[color:var(--colorTextoTarjeta)];
}

.rango_menu_izquierda_contenedor::-webkit-scrollbar {
  @apply w-2;
}

.rango_menu_izquierda_contenedor::-webkit-scrollbar-track {
  @apply bg-[color:var(--colorFondoCiudadano2)];
}

.rango_menu_izquierda_contenedor::-webkit-scrollbar-thumb {
  @apply bg-[color:var(--colorBlanco)] rounded hover:bg-[color:var(--colorFondoCiudadano)];
}

.rango_contenedor_tarjetas {
  @apply flex flex-col gap-8;
}
</style>