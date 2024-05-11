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
        <option value="fechaNacimiento">Fecha de Nacimiento</option>
        <option value="isPeligroso">Es peligroso</option>
      </select>
    </div>

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
          <th v-if="filterField !== 'fechaNacimiento'">Fecha de Nacimiento</th>
          <th v-if="filterField !== 'isPeligroso'">Peligroso</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="ciudadano in filteredCiudadanos" :key="ciudadano.idCiudadano">
          <td><img :src="ciudadano.fotoUrl" alt="Foto del ciudadano" /></td>
          <td v-if="filterField">{{ ciudadano[filterField as keyof typeof ciudadano] }}</td>
          <td v-if="filterField !== 'nombre'">{{ ciudadano.nombre }}</td>
          <td v-if="filterField !== 'apellidos'">{{ ciudadano.apellidos }}</td>
          <td v-if="filterField !== 'dni'">{{ ciudadano.dni }}</td>
          <td v-if="filterField !== 'genero'">{{ ciudadano.genero }}</td>
          <td v-if="filterField !== 'nacionalidad'">{{ ciudadano.nacionalidad }}</td>
          <td v-if="filterField !== 'fechaNacimiento'">{{ ciudadano.fechaNacimiento }}</td>
          <td v-if="filterField !== 'isPeligroso'">{{ ciudadano.isPeligroso ? 'Sí' : 'No' }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <button @click="exportToExcel">Exportar a Excel</button>
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
    dni: 'DNI',
    genero: 'Género',
    nacionalidad: 'Nacionalidad',
    fechaNacimiento: 'Fecha de Nacimiento',
    isPeligroso: 'Peligroso'
  };
  return names[field] || field;
}

const exportToExcel = () => {
  const ws = XLSX.utils.json_to_sheet(filteredCiudadanos.value.map(ciudadano => ({
    Nombre: ciudadano.nombre,
    Apellidos: ciudadano.apellidos,
    DNI: ciudadano.dni,
    Género: ciudadano.genero,
    Nacionalidad: ciudadano.nacionalidad,
    Fecha_de_Nacimiento: ciudadano.fechaNacimiento,
    Peligroso: ciudadano.isPeligroso ? 'Sí' : 'No'
  })));
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Ciudadanos");
  XLSX.writeFile(wb, "Listado_de_Ciudadanos.xlsx");
};

</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  background-color: #f1f8ff;
  border-radius: 8px;
  overflow: hidden;
}

th,
td {
  border-bottom: 1px solid #ccc;
  padding: 12px 8px;
  text-align: left;
  color: #333;
}

th {
  background-color: #0056b3;
  /* Azul oscuro */
  color: white;
  font-size: 16px;
}

td {
  background-color: #e7f0fd;
  /* Azul claro */
}

img {
  width: 60px;
  height: auto;
  border-radius: 50%;
}

input,
select {
  margin-bottom: 10px;
  width: calc(100% - 16px);
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

input {
  background-color: white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

select {
  background-color: #e7f0fd;
  color: #333;
}

input::placeholder {
  color: #aaa;
}

tr:hover {
  background-color: #ccefff;
  /* Azul muy claro para hover */
}

/* Estilo para resaltar la importancia de la columna de "Peligroso" */
td:nth-last-child(1) {
  font-weight: bold;
  color: #c10000;
  /* Rojo para indicar peligro */
}

@media (max-width: 768px) {

  table,
  thead,
  tbody,
  th,
  td,
  tr {
    display: block;
  }

  thead tr {
    position: absolute;
    top: -9999px;
    left: -9999px;
  }

  td {
    position: relative;
    padding-left: 50%;
    text-align: right;
    border: none;
  }

  td:before {
    position: absolute;
    top: 6px;
    left: 6px;
    width: 45%;
    padding-right: 10px;
    white-space: nowrap;
    font-weight: bold;
    text-align: left;
    content: attr(data-label);
  }

  select,
  input {
    width: 100%;
  }
}
</style>