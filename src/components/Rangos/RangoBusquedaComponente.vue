<script lang="ts">
import { defineComponent, ref, onMounted, type Ref } from 'vue';
import RangoList from '@/components/Rangos/ListaRangosComponente.vue';
import { useListadoRangos, type Rango } from '@/stores/storeRango';

export default defineComponent({
  components: {
    RangoList
  },
  setup() {
    const { infoRangos, cargarDatosRangos } = useListadoRangos();
    const searchQuery = ref('');
    const filteredRanges: Ref<Rango[]> = ref([]);

    onMounted(async () => {
      await cargarDatosRangos();
      filteredRanges.value = infoRangos;
    });

    function searchRanges() {
      filteredRanges.value = infoRangos;
    }

    return {
      filteredRanges,
      searchRanges,
      searchQuery
    };
  }
});

</script>

<template>
  <div class="rango_menu_izquierda">
    <div class="rango_menu_izquierda_titulo">
      <h2>{{ $t('Rangos.List') }}</h2>
    </div>
    <RangoList :ranges="filteredRanges" />
  </div>
</template>


<style scoped>
.rango_menu_izquierda {
  @apply bg-[color:var(--colorFondoCiudadano2)] w-[25%] flex flex-col gap-4 py-4 rounded-lg;
}

.rango_menu_izquierda_titulo {
  @apply flex justify-center items-center;
}

.rango_menu_izquierda_titulo h2 {
  @apply bg-[color:var(--colorFondoCiudadano)] h-8 text-[color:var(--colorTextoTarjeta)] flex items-center w-3/4 flex justify-center text-base rounded-[0.5rem];
}

.rango_lista {
  @apply overflow-y-auto max-h-[30rem];
}

@media (max-width: 1024px) {
  .rango_menu_izquierda {
    @apply w-[100%];
  }

  .rango_menu_izquierda_titulo h2 {
    @apply text-sm;
  }

  .rango_lista {
    @apply max-h-[20rem];
  }
}

@media (max-width: 768px) {
  .rango_menu_izquierda {
    @apply p-0.5;
    @apply w-full;
  }

  .rango_menu_izquierda_titulo h2 {
    @apply w-4/5;
    @apply text-xs;
  }

  .rango_lista {
    @apply max-h-[15rem];
  }
}

@media (max-width: 480px) {
  .rango_menu_izquierda {
    @apply w-full py-2;
  }

  .rango_menu_izquierda_titulo h2 {
    @apply text-xs;
  }

  .rango_menu_izquierda_contenedor {
    @apply max-h-[200px] overflow-y-auto;
  }

  .rango_lista {
    @apply max-h-[10rem];
  }
}
</style>