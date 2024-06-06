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
  <div class="codigoPenal_container">
    <div class="codigoPenal_div">
      <TitleBar :title="t('Código Penal')" />
      <input type="text" v-model="filtro" :placeholder="$t('CodigoPenalTabla.BusquedaCodigoPenal')"
        class="codigoPenal_busqueda" />
      <div class="codigoPenal_divContainer">
        <table class="codigoPenal_tabla">
          <thead>
            <tr>
              <th class="codigoPenal_cabecera">
                {{ t('Artículo') }}
              </th>
              <th class="codigoPenal_cabecera">
                {{ t('Descripción') }}
              </th>
              <th class="codigoPenal_cabecera">
                {{ t('Precio') }}
              </th>
              <th class="codigoPenal_cabecera">
                {{ t('Sentencia') }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="codigo in filtrarCodigos" :key="codigo.idCodigoPenal"
              class="hover:bg-[color:var(--colorFondoCiudadano2)]">
              <td class="codigoPenal_tablas">
                {{ codigo.articulo }}
              </td>
              <td v-if="locale === 'es'"
                class="codigoPenal_tablas">
                {{ codigo.descripcion }}
              </td>
              <td v-if="locale === 'en'"
                class="codigoPenal_tablas">
                {{ codigo.description }}
              </td>
              <td class="codigoPenal_tablas">
                {{ codigo.precio }} €
              </td>
              <td class="codigoPenal_tablas">
                {{ codigo.sentencia }} {{ $t('CodigoPenalTabla.Month') }}
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
</template>

<style scoped>
.codigoPenal_container {
  @apply bg-[color:var(--colorFondo)] flex-col flex min-h-screen items-center gap-8 p-8;
}
.codigoPenal_div {
  @apply shadow-[var(--colorNegro)] text-[color:var(--colorBlanco)] bg-[color:var(--colorFondoModal)] grow w-4/5 flex flex-col gap-8 mx-auto my-0 rounded-[10px];
  font-family: Arial, sans-serif;

  /* Centrar horizontalmente */
}
.codigoPenal_busqueda {
  @apply text-[color:var(--colorTextoTarjeta)] text-base leading-6 bg-[color:var(--colorNegro)] border w-full box-border p-2.5 rounded-[0.7rem] border-solid border-[none];
  outline: none;
}
.ciudadano_boton {
  @apply flex h-8 w-20 items-center justify-center bg-[color:var(--colorBotonBusquedaCiudadano)] text-[color:var(--colorTextoTarjeta)] no-underline;
}
.codigoPenal_divContainer {
  @apply overflow-x-auto w-full;

  /* Ajustar el contenedor al ancho completo */
}
.codigoPenal_tabla {
  @apply overflow-hidden w-full rounded-[10px] border-separate;

  /* Ajustar la tabla al ancho completo */
}
.codigoPenal_cabecera {
  @apply text-left bg-[color:var(--colorNegro)] border-b-[color:var(--colorFondoCiudadano)] w-5 h-12;
}
.codigoPenal_tablas {
  @apply text-left bg-[color:var(--colorFondoTablaModal)] p-2.5;
}

/* Responsive adjustments */
@media (max-width: 1024px) {
  .codigoPenal_div {
    @apply w-[90%];
  }
  .codigoPenal_cabecera,
  .codigoPenal_tablas {
    @apply text-sm p-2;
  }
  .codigoPenal_busqueda {
    @apply text-sm p-2;
  }
}
@media (max-width: 768px) {
  .codigoPenal_div {
    @apply w-full;
  }
  .codigoPenal_cabecera,
  .codigoPenal_tablas {
    @apply text-xs p-[0.4rem];
  }
  .codigoPenal_busqueda {
    @apply text-xs p-[0.4rem];
  }
}
@media (max-width: 480px) {
  .codigoPenal_div {
    @apply w-full;
  }
  .codigoPenal_cabecera,
  .codigoPenal_tablas {
    @apply text-[0.625rem] p-[0.3rem];
  }
  .codigoPenal_busqueda {
    @apply text-[0.625rem] p-[0.3rem];
  }
}


</style>
