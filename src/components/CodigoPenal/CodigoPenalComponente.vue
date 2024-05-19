<script lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue';
import { useListadoCodigoPenal } from '@/stores/storeCodigoPenal';
import TituloComponente from '@/components/ComponentesGenerales/TituloComponente.vue';
import BotonPaginaPrincipalComponente from '../ComponentesGenerales/BotonPaginaPrincipalComponente.vue';

export default defineComponent({
  setup() {
    const { infoCodigoPenal, cargarDatosCodigoPenal } = useListadoCodigoPenal();
    const filtro = ref('');

    onMounted(async () => {
      await cargarDatosCodigoPenal();
    });

    const filtrarCodigos = computed(() => {
      return infoCodigoPenal.filter(codigo =>
        codigo.articulo.toLowerCase().includes(filtro.value.toLowerCase()) ||
        codigo.descripcion.toLowerCase().includes(filtro.value.toLowerCase()) ||
        codigo.precio.toString().includes(filtro.value) ||
        codigo.sentencia.toLowerCase().includes(filtro.value.toLowerCase())
      );
    });

    return {
      filtro,
      filtrarCodigos
    };
  }
});
</script>

<template>

  <body>
    <TituloComponente />
    <div class="body-container">
      <div class="codigo-penal-container">
        <TitleBar title="Código Penal" />
        <input type="text" v-model="filtro" placeholder="Buscar en el código penal..." class="search-input" />
        <div class="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Artículo</th>
                <th>Descripción</th>
                <th>Cantidad</th>
                <th>Sentencia</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="codigo in filtrarCodigos" :key="codigo.idCodigoPenal">
                <td>{{ codigo.articulo }}</td>
                <td>{{ codigo.descripcion }}</td>
                <td>${{ codigo.precio }}</td>
                <td>{{ codigo.sentencia }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <BotonPaginaPrincipalComponente />
  </body>
</template>

<style scoped>
html,
body {
  @apply h-[500vh] bg-[color:var(--colorFondo)] m-0;
}

.body-container {
  @apply flex flex-col bg-[color:var(--colorFondo)];
}

.codigo-penal-container {
  @apply w-4/5 bg-[color:var(--colorFondoCiudadano)] text-[color:var(--colorBlanco)] shadow-[0_4px_8px_rgba(0, 0, 0, 0.1)] grow m-auto p-5 rounded-[10px];
  font-family: Arial, sans-serif;
}

.search-input {
  @apply w-full box-border border border-[color:var(--colorBlanco)] bg-[rgb(70, 69, 69)] text-[white] mx-0 my-5 p-2.5 rounded-[5px] border-solid;
}

.table-wrapper {
  @apply overflow-x-auto;
}

table {
  @apply w-full overflow-hidden rounded-[10px] border-separate;
  --tw-border-spacing-x: 0.625rem;
  --tw-border-spacing-y: 0.625rem;
}

th,
td {
  @apply text-left border-b-[color:var(--colorFondoCiudadano)] bg-[#525C67] w-5 p-2.5 border-b border-solid;
}

th {
  @apply bg-[rgb(36, 35, 35)];
}

tbody tr:hover {
  @apply bg-[color:var(--colorFondoCiudadano2)];
}

tbody tr:last-child td {
  @apply border-b-[none];
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
