<template>
  <div class="container mx-auto p-4">
    <div class="search-section mb-4">
      <input v-model="searchQuery" placeholder="Buscar ciudadano..." @input="filterCiudadanos" class="search-input" />
      <div class="filter-section mt-2">
        <label for="filterField" class="mr-2">Filtrar por:</label>
        <select v-model="filterField" @change="filterCiudadanos" class="filter-select">
          <option value="nombre">Nombre</option>
          <option value="apellidos">Apellidos</option>
          <option value="dni">DNI</option>
          <option value="genero">Género</option>
          <option value="isPeligroso">Es peligroso</option>
        </select>
      </div>
    </div>
    <div class="table-wrapper shadow-lg rounded-lg overflow-hidden">
      <table class="table-auto w-full">
        <thead>
          <tr class="bg-blue-800 text-white">
            <th class="px-4 py-2">Foto</th>
            <th v-if="filterField" class="px-4 py-2">{{ fieldDisplayName(filterField) }}</th>
            <th v-if="filterField !== 'nombre'" class="px-4 py-2">Nombre</th>
            <th v-if="filterField !== 'apellidos'" class="px-4 py-2">Apellidos</th>
            <th v-if="filterField !== 'genero'" class="px-4 py-2">Género</th>
            <th v-if="filterField !== 'isPeligroso'" class="px-4 py-2">Peligroso</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="ciudadano in filteredCiudadanos" :key="ciudadano.idCiudadano" class="hover:bg-blue-100">
            <td class="px-4 py-2"><img :src="ciudadano.imagenUrl" alt="Foto del ciudadano" class="rounded-full w-12 h-12 object-cover" /></td>
            <td v-if="filterField" class="px-4 py-2">{{ ciudadano[filterField as keyof typeof ciudadano] }}</td>
            <td v-if="filterField !== 'nombre'" class="px-4 py-2">{{ ciudadano.nombre }}</td>
            <td v-if="filterField !== 'apellidos'" class="px-4 py-2">{{ ciudadano.apellidos }}</td>
            <td v-if="filterField !== 'genero'" class="px-4 py-2">{{ ciudadano.genero }}</td>
            <td v-if="filterField !== 'isPeligroso'" class="px-4 py-2">{{ ciudadano.isPeligroso ? 'Sí' : 'No' }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <button @click="exportToExcel" class="export-button mt-4">Exportar a Excel</button>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import { useListadoCiudadanos } from '@/stores/storeCiudadano';
import * as XLSX from 'xlsx';

const store = useListadoCiudadanos();
const { infoCiudadanosBusquedaCaptura, cargarDatosCiudadanosBusquedaCaptura } = store;
const searchQuery = ref('');
const filterField = ref('nombre');

onMounted(async () => {
  await cargarDatosCiudadanosBusquedaCaptura();
});

const filteredCiudadanos = computed(() => {
  const searchLower = searchQuery.value.toLowerCase();
  return infoCiudadanosBusquedaCaptura.filter(ciudadano =>
    ciudadano.nombre.toLowerCase().includes(searchLower) ||
    ciudadano.apellidos.toLowerCase().includes(searchLower) ||
    ciudadano.genero.toLowerCase().includes(searchLower) ||
    ciudadano.dni.toLowerCase().includes(searchLower)
  );
});

function fieldDisplayName(field: any) {
  const names = {
    nombre: 'Nombre',
    apellidos: 'Apellidos',
    genero: 'Género',
    nacionalidad: 'Nacionalidad',
    isPeligroso: 'Peligroso'
  };
  return names[field] || field;
}

const exportToExcel = () => {
  const ws = XLSX.utils.json_to_sheet(filteredCiudadanos.value.map(ciudadano => ({
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
.container {
  @apply mx-auto p-4;
}
.search-section {
  @apply mb-4;
}
.search-input {
  @apply w-full p-2 mb-2 border rounded focus:outline-none focus:border-blue-600;
}
.filter-section {
  @apply mt-2;
}
.filter-select {
  @apply p-2 border rounded focus:outline-none focus:border-blue-600;
}
.table-wrapper {
  @apply shadow-lg rounded-lg overflow-hidden;
}
table {
  @apply table-auto w-full;
}
th, td {
  @apply px-4 py-2;
}
th {
  @apply bg-blue-800 text-white;
}
tbody tr:hover {
  @apply bg-blue-100;
}
img {
  @apply rounded-full w-12 h-12 object-cover;
}
.export-button {
  @apply mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer transition-all duration-300 ease-in-out;
}
.export-button:hover {
  @apply bg-blue-700;
}
@media (max-width: 768px) {
  th, td {
    @apply text-sm;
  }
  img {
    @apply w-10 h-10;
  }
}
@media (max-width: 480px) {
  th, td {
    @apply text-xs;
  }
  img {
    @apply w-8 h-8;
  }
}
</style>
