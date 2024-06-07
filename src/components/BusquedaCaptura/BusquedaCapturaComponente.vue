<template>
  <div class="mx-auto p-4">
    <div class="shadow-lg rounded-lg overflow-hidden">
      <table class="table-auto w-full border-collapse">
        <thead>
          <tr class="bg-blue-800 text-white">
            <th class="cabecera">{{ $t('BusquedaCapturaTabla.Photo') }}</th>
            <th v-if="filterField" class="cabecera">{{ OrdenarNombre(filterField) }}</th>
            <th v-if="filterField !== 'nombre'" class="cabecera">{{ $t('BusquedaCapturaTabla.Name') }}</th>
            <th v-if="filterField !== 'apellidos'" class="cabecera">{{ $t('BusquedaCapturaTabla.Surname') }}</th>
            <th v-if="filterField !== 'genero'" class="cabecera">{{ $t('BusquedaCapturaTabla.Gender') }}</th>
            <th v-if="filterField !== 'isPeligroso'" class="cabecera">{{ $t('BusquedaCapturaTabla.Danger') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="ciudadano in CiudadanosFiltrados" :key="ciudadano.idCiudadano" class="hover:bg-blue-100">
            <td class="tabla"><img :src="ciudadano.imagenUrl" alt="Foto del ciudadano"
                class="rounded-full w-12 h-12 object-cover" /></td>
            <td v-if="filterField" class="tabla">{{ ciudadano[filterField as keyof typeof ciudadano] }}</td>
            <td v-if="filterField !== 'nombre'" class="tabla">{{ ciudadano.nombre }}</td>
            <td v-if="filterField !== 'apellidos'" class="tabla">{{ ciudadano.apellidos }}</td>
            <td v-if="filterField !== 'genero' && locale === 'es'" class="tabla">{{ ciudadano.genero }}</td>
            <td v-if="filterField !== 'genero' && locale === 'en'" class="tabla">{{ ciudadano.gender }}</td>
            <td v-if="filterField !== 'isPeligroso' && locale === 'es'" class="tabla">{{ ciudadano.isPeligroso ?
              'Sí' : 'No' }}</td>
            <td v-if="filterField !== 'isPeligroso' && locale === 'en'" class="tabla">{{ ciudadano.isPeligroso ?
              'Yes' : 'No' }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="div_botones">
      <button id="excel-1" @click="ExportarExcel"
        class="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer transition-all duration-300 ease-in-out hover:bg-blue-700">{{
          $t('BusquedaCapturaTabla.Excel') }}</button>
      <BotonPaginaPrincipalComponente />
    </div>

  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import { useListadoCiudadanos } from '@/stores/storeCiudadano';
import * as XLSX from 'xlsx';
import { useI18n } from 'vue-i18n';
import BotonPaginaPrincipalComponente from '../ComponentesGenerales/BotonPaginaPrincipalComponente.vue';

const { t, locale } = useI18n();
const store = useListadoCiudadanos();
const { infoCiudadanosBusquedaCaptura, cargarDatosCiudadanosBusquedaCaptura } = store;
const searchQuery = ref('');
const filterField = ref('nombre');

onMounted(async () => {
  await cargarDatosCiudadanosBusquedaCaptura();
});

const CiudadanosFiltrados = computed(() => {
  const searchLower = searchQuery.value.toLowerCase();
  return infoCiudadanosBusquedaCaptura.filter((ciudadano: any) =>
    ciudadano.nombre.toLowerCase().includes(searchLower) ||
    ciudadano.apellidos.toLowerCase().includes(searchLower) ||
    ciudadano.genero.toLowerCase().includes(searchLower) ||
    ciudadano.dni.toLowerCase().includes(searchLower)
  );
});

function OrdenarNombre(field: any) {
  const names: { [key: string]: string } = {
    nombre: 'Nombre',
    apellidos: 'Apellidos',
    genero: 'Género',
    nacionalidad: 'Nacionalidad',
    isPeligroso: 'Peligroso'
  };
  return names[field] || field;
}

const ExportarExcel = () => {
  const ws = XLSX.utils.json_to_sheet(CiudadanosFiltrados.value.map((ciudadano: any) => ({
    Nombre: ciudadano.nombre,
    Apellidos: ciudadano.apellidos,
    Género: ciudadano.genero,
    Nacionalidad: ciudadano.nacionalidad,
    Peligroso: ciudadano.isPeligroso ? 'Sí' : 'No'
  })));
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Ciudadanos");
  XLSX.writeFile(wb, "Listado_de_Ciudadanos.xlsx");
};
</script>

<style scoped>
.table-auto {
  width: 100%;
  border-collapse: collapse;
}

.cabecera {
  background-color: var(--colorFondoCiudadano2);
  color: var(--colorTextoTarjeta);
}

.tabla {
  background-color: var(--colorBusquedaCiudadanoTarjeta);
  border: 1px solid #ccc;
  color: var(--colorTextoTarjeta);
  text-align: left;
  padding: 8px;
}

.div_botones{
  display: flex;
  flex-direction: column;
  align-items: center;
}

th,
td {
  border: 1px solid #ccc;
  text-align: left;
  padding: 8px;
}

th {
  background-color: #2c5282;
  color: white;
}

tbody tr:hover {
  background-color: #ebf8ff;
}

img {
  border-radius: 9999px;
  width: 3rem;
  height: 3rem;
  object-cover: cover;
}

.ciudadano_boton {
  @apply flex h-8 w-20 items-center justify-center bg-[color:var(--colorBotonBusquedaCiudadano)] text-[color:var(--colorTextoTarjeta)] no-underline mt-2.5 rounded-[5px];
}

@media (max-width: 768px) {

  th,
  td {
    font-size: 0.875rem;
  }

  img {
    width: 2.5rem;
    height: 2.5rem;
  }
}

@media (max-width: 480px) {

  th,
  td {
    font-size: 0.75rem;
  }

  img {
    width: 2rem;
    height: 2rem;
  }
}
</style>
