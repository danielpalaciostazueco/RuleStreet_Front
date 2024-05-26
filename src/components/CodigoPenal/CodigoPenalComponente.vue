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
      <BotonPaginaPrincipalComponente />
    </div>
  </div>
</template>



<style scoped>
.ciudadano_boton {
  display: flex;
  height: 2rem;
  width: 5rem;
  align-items: center;
  justify-content: center;
  background-color: var(--colorBotonBusquedaCiudadano);
  color: var(--colorTextoTarjeta);
  text-decoration-line: none;
  margin-left: 45%;
  margin-top: 10px;
}

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
