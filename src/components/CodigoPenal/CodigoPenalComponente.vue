<script lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue';
import { useListadoCodigoPenal } from '@/stores/storeCodigoPenal';
import TituloComponente from '@/components/ComponentesGenerales/TituloComponente.vue';
import BotonPaginaPrincipalComponente from '../ComponentesGenerales/BotonPaginaPrincipalComponente.vue';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  components: {
    TituloComponente,
    BotonPaginaPrincipalComponente
  },
  setup() {
    const { t, locale } = useI18n();
    const { infoCodigoPenal, cargarDatosCodigoPenal } = useListadoCodigoPenal();
    const filtro = ref('');

    onMounted(async () => {
      await cargarDatosCodigoPenal();
    });

    const filtrarCodigos = computed(() => {
      return infoCodigoPenal.filter((codigo: any) =>
        codigo.articulo.toLowerCase().includes(filtro.value.toLowerCase()) ||
        codigo.descripcion.toLowerCase().includes(filtro.value.toLowerCase()) ||
        codigo.description.toLowerCase().includes(filtro.value.toLowerCase()) ||
        codigo.precio.toString().includes(filtro.value) ||
        codigo.sentencia.toLowerCase().includes(filtro.value.toLowerCase())
      );
    });

    return {
      filtro,
      filtrarCodigos,
      locale,
      t
    };
  }
});
</script>

<template>
  <div>
    <TituloComponente />
    <div class="flex flex-col bg-[color:var(--colorFondo)]">
      <div
        class="w-4/5 bg-[color:var(--colorFondoCiudadano)] text-[color:var(--colorBlanco)] shadow-[0_4px_8px_rgba(0,0,0,0.1)] grow m-auto p-5 rounded-[10px] font-[Arial,sans-serif]">
        <TitleBar :title="t('Código Penal')" />
        <input type="text" v-model="filtro" :placeholder="t('Buscar en el código penal...')"
          class="w-full box-border border border-[color:var(--colorBlanco)] bg-[rgb(70,69,69)] text-[white] mx-0 my-5 p-2.5 rounded-[5px] border-solid text-base md:text-sm sm:text-xs" />
        <div class="overflow-x-auto">
          <table class="w-full overflow-hidden rounded-[10px] border-separate"
            style="--tw-border-spacing-x: 0.625rem; --tw-border-spacing-y: 0.625rem;">
            <thead>
              <tr>
                <th class="text-left border-b-[color:var(--colorFondoCiudadano)] bg-[rgb(36,35,35)] w-5 p-2.5">
                  {{ t('Artículo') }}
                </th>
                <th class="text-left border-b-[color:var(--colorFondoCiudadano)] bg-[rgb(36,35,35)] w-5 p-2.5">
                  {{ t('Descripción') }}
                </th>
                <th class="text-left border-b-[color:var(--colorFondoCiudadano)] bg-[rgb(36,35,35)] w-5 p-2.5">
                  {{ t('Precio') }}
                </th>
                <th class="text-left border-b-[color:var(--colorFondoCiudadano)] bg-[rgb(36,35,35)] w-5 p-2.5">
                  {{ t('Sentencia') }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="codigo in filtrarCodigos" :key="codigo.idCodigoPenal"
                class="hover:bg-[color:var(--colorFondoCiudadano2)]">
                <td class="text-left border-b-[color:var(--colorFondoCiudadano)] bg-[#525C67] w-5 p-2.5">
                  {{ codigo.articulo }}
                </td>
                <td v-if="locale === 'es'"
                  class="text-left border-b-[color:var(--colorFondoCiudadano)] bg-[#525C67] w-5 p-2.5">
                  {{ codigo.descripcion }}
                </td>
                <td v-if="locale === 'en'"
                  class="text-left border-b-[color:var(--colorFondoCiudadano)] bg-[#525C67] w-5 p-2.5">
                  {{ codigo.description }}
                </td>
                <td class="text-left border-b-[color:var(--colorFondoCiudadano)] bg-[#525C67] w-5 p-2.5">
                  ${{ codigo.precio }}
                </td>
                <td class="text-left border-b-[color:var(--colorFondoCiudadano)] bg-[#525C67] w-5 p-2.5">
                  {{ codigo.sentencia }}
                </td>
              </tr>
              <tr v-if="!filtrarCodigos.length">
                <td colspan="4" class="text-center text-[color:var(--colorTextoTarjeta)]">
                  {{ t('No se encontraron resultados') }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <BotonPaginaPrincipalComponente />
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


<style scoped>
@media (max-width: 1024px) {
  .codigo-penal-container {
    @apply w-[90%];
  }

  th,
  td {
    @apply text-xs p-2;
  }

  .search-input {
    @apply text-xs p-2;
  }
}

@media (max-width: 768px) {
  .codigo-penal-container {
    @apply w-full;
  }

  th,
  td {
    @apply text-xs p-1;
  }

  .search-input {
    @apply text-xs p-1;
  }
}

@media (max-width: 480px) {
  .codigo-penal-container {
    @apply w-full;
  }

  th,
  td {
    @apply text-xs p-1;
  }

  .search-input {
    @apply text-xs p-1;
  }

}
</style>
