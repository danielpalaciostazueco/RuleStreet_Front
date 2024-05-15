<template>
  <div>
    <input v-model="searchQuery" placeholder="Buscar ciudadano..." @input="filterCiudadanos" />

    <div>
      Filtrar por:
      <select v-model="filterField" @change="filterCiudadanos">
        <option value="nombre">Nombre</option>
        <option value="apellidos">Apellidos</option>
        <option value="dni">DNI</option>
        <option value="genero">Género</option>
        <option value="nacionalidad">Nacionalidad</option>
        <option value="isPeligroso">Es peligroso</option>
      </select>
    </div>

    <div class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Foto</th>
            <th v-if="filterField">{{ fieldDisplayName(filterField) }}</th>
            <th v-if="filterField !== 'nombre'">Nombre</th>
            <th v-if="filterField !== 'apellidos'">Apellidos</th>
            <th v-if="filterField !== 'genero'">Género</th>
            <th v-if="filterField !== 'nacionalidad'">Nacionalidad</th>
            <th v-if="filterField !== 'isPeligroso'">Peligroso</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="ciudadano in filteredCiudadanos" :key="ciudadano.idCiudadano">
            <td><img :src="ciudadano.imagenUrl" alt="Foto del ciudadano" /></td>
            <td v-if="filterField">{{ ciudadano[filterField as keyof typeof ciudadano] }}</td>
            <td v-if="filterField !== 'nombre'">{{ ciudadano.nombre }}</td>
            <td v-if="filterField !== 'apellidos'">{{ ciudadano.apellidos }}</td>
            <td v-if="filterField !== 'genero'">{{ ciudadano.genero }}</td>
            <td v-if="filterField !== 'nacionalidad'">{{ ciudadano.nacionalidad }}</td>
            <td v-if="filterField !== 'isPeligroso'">{{ ciudadano.isPeligroso ? 'Sí' : 'No' }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <button @click="exportToExcel">Exportar a Excel</button>
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
table {
  @apply w-full bg-[#f1f8ff] overflow-hidden rounded-lg border-collapse;
  font-size: calc(12px + 0.5vw); 
}
th,
td {
  @apply text-left text-[#333] px-2 py-3 border-b border-b-[#ccc] border-solid;
}
th {
  @apply bg-[#0056b3] text-white text-base;
}
td {
  @apply bg-[#e7f0fd];
}
img {
  @apply w-[calc(30px+2vw)] h-auto rounded-full;
}
input,
select {
  @apply w-[calc(100%-16px)] rounded border border-[#ccc] mb-2.5 p-2;
}
input {
  @apply bg-white shadow-[0_2px_5px_rgba(0,0,0,0.1)];
}
select {
  @apply bg-[#e7f0fd] text-[#333];
}
input::placeholder {
  @apply text-[#aaa];
}
tr:hover {
  @apply bg-[#ccefff];
}
td:nth-last-child(1) {
  @apply font-bold text-[#c10000];
}

.table-wrapper {
  @apply overflow-x-auto min-w-full;
}

@media (max-width: 768px) {
  th,
  td {
    @apply text-sm px-2 py-1.5;
    font-size: calc(10px + 1vw); 
  }
  img {
    @apply w-[calc(20px+2vw)]; 
  }
}

@media (max-width: 480px) {
  th,
  td {
    @apply text-xs px-1.5 py-1;
    font-size: calc(8px + 1vw); 
  }
  img {
    @apply w-[calc(15px+2vw)]; 
  }
}
</style>