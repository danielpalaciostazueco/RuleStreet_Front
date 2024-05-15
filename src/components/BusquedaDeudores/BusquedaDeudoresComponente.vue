<template>
  <div>
    <input v-model="searchQuery" placeholder="Buscar deudor..." @input="filterDeudores" />

    <div>
      Filtrar por:
      <select v-model="filterField" @change="filterDeudores">
        <option value="nombre">Nombre</option>
        <option value="apellidos">Apellidos</option>
        <option value="dni">DNI</option>
        <option value="genero">Género</option>
        <option value="nacionalidad">Nacionalidad</option>
  
        <option value="pagada">Deuda Pagada</option>
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
            <th v-if="filterField !== 'dni'">DNI</th>
            <th v-if="filterField !== 'genero'">Género</th>
            <th v-if="filterField !== 'nacionalidad'">Nacionalidad</th>
            <th v-if="filterField !== 'pagada'">Deuda Pagada</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="deudor in filteredDeudores" :key="deudor.idCiudadano">
            <td><img :src="deudor.imagenUrl" alt="Foto del deudor" /></td>
            <td v-if="filterField">{{ deudor[filterField as keyof typeof deudor] }}</td>
            <td v-if="filterField !== 'nombre'">{{ deudor.nombre }}</td>
            <td v-if="filterField !== 'apellidos'">{{ deudor.apellidos }}</td>
            <td v-if="filterField !== 'dni'">{{ deudor.dni }}</td>
            <td v-if="filterField !== 'genero'">{{ deudor.genero }}</td>
            <td v-if="filterField !== 'nacionalidad'">{{ deudor.nacionalidad }}</td>
   
            <td v-if="filterField !== 'pagada'">{{ deudor.pagada ? 'Sí' : 'No' }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <button @click="exportToExcel">Exportar a Excel</button>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useListadoCiudadanos } from '@/stores/storeCiudadano';
import * as XLSX from 'xlsx';

const { infoDeudores, cargarDatosCiudadanosDeudores } = useListadoCiudadanos();
const searchQuery = ref('');
const filterField = ref('nombre');
const filteredDeudores = computed(() => {
  const searchLower = searchQuery.value.toLowerCase();
  return infoDeudores.filter(deudor => {
    return String(deudor[filterField.value as keyof typeof deudor]).toLowerCase().includes(searchLower);
  });
});

function fieldDisplayName(field: any) {
  const names = {
    nombre: 'Nombre',
    apellidos: 'Apellidos',
    dni: 'DNI',
    genero: 'Género',
    nacionalidad: 'Nacionalidad',
    pagada: 'Deuda Pagada'
  };
  return names[field] || field;
}
const exportToExcel = () => {
  const dataToExport = filteredDeudores.value.map(deudor => ({
    Nombre: deudor.nombre,
    Apellidos: deudor.apellidos,
    DNI: deudor.dni,
    Género: deudor.genero,
    Nacionalidad: deudor.nacionalidad,

    Deuda_Pagada: deudor.pagada ? 'Sí' : 'No'
  }));
  const ws = XLSX.utils.json_to_sheet(dataToExport);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Deudores");
  XLSX.writeFile(wb, "Listado_Deudores.xlsx");
};
cargarDatosCiudadanosDeudores();
</script>

<style scoped>
table {
  @apply w-full bg-[#f1f8ff] overflow-hidden rounded-lg border-collapse;
}
th,
td {
  @apply text-left text-[#333] px-2 py-3 border-b-[#ccc] border-b border-solid;
}
th {
  @apply bg-[#0056b3] text-[white] text-base;

  /* Azul oscuro */
}
td {
  @apply bg-[#e7f0fd];

  /* Azul claro */
}
img {
  @apply w-[60px] h-auto rounded-[50%];
}
input,
select {
  @apply w-[calc(100%_-_16px)] rounded border mb-2.5 p-2 border-solid border-[#ccc];
}
input {
  @apply bg-[white] shadow-[0_2px_5px_rgba(0,0,0,0.1)];
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
  @apply font-[bold] text-[#c10000];


}

.table-wrapper {
  @apply overflow-x-auto;
}

table {
  @apply min-w-[600px];
}


@media (max-width: 1024px) {
  table {
    @apply min-w-[500px];
  }
  th,
  td {
    @apply text-sm px-2 py-1.5;
  }
  img {
    @apply w-[50px];
  }
}

@media (max-width: 768px) {
  table {
    @apply min-w-[400px];
  }
  th,
  td {
    @apply text-xs px-1.5 py-1;
  }
  img {
    @apply w-[40px];
  }
}

@media (max-width: 480px) {
  table {
    @apply min-w-[300px];
  }
  th,
  td {
    @apply text-xs px-1 py-0.5;
  }
  img {
    @apply w-[30px];
  }
}
</style>
