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
      <input type="text" v-model="filtro" :placeholder="t('Buscar en el código penal...')"
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
                class="codigoPenal_tablas5">
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
  background-color: var(--colorFondo);
  flex-direction: column;
  display: flex;
  min-height: 100vh;
  padding: 2rem;
  align-items: center;
  gap: 2rem;
}

.codigoPenal_div {
  box-shadow: var(--colorNegro);
  color: var(--colorBlanco);
  font-family: Arial, sans-serif;
  background-color: var(--colorFondoModal);
  border-radius: 10px;
  flex-grow: 1;
  width: 80%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.codigoPenal_busqueda {
  color: var(--colorTextoTarjeta);
  font-size: 1rem;
  line-height: 1.5rem;
  padding: 0.625rem;
  background-color: var(--colorNegro);
  border-style: solid;
  border-width: 1px;
  border-radius: 0.7rem;
  width: 100%;
  box-sizing: border-box;
  outline: none;
  border: none;
}


.ciudadano_boton {
  display: flex;
  height: 2rem;
  width: 5rem;
  align-items: center;
  justify-content: center;
  background-color: var(--colorBotonBusquedaCiudadano);
  color: var(--colorTextoTarjeta);
  text-decoration-line: none;
}

.codigoPenal_divContainer {
  overflow-x: auto;
}

.codigoPenal_tabla {
  border-radius: 10px;
  overflow: hidden;
  border-collapse: separate;
  width: 100%;
}

.codigoPenal_cabecera {
  text-align: left;
  background-color: var(--colorNegro);
  border-bottom-color: var(--colorFondoCiudadano);
  width: 1.25rem;
  height: 3rem;
}

.codigoPenal_tablas{
  text-align: left;
  padding: 0.625rem;
  background-color: var(--colorFondoTablaModal)
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
