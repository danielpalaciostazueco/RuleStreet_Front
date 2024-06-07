<template>
  <div class="shadow-lg rounded-lg overflow-x-auto">
    <table class="table-auto w-full">
      <thead>
        <tr class="bg-blue-800 text-white">
          <th class="cabecera">{{ $t('DeudoresTabla.Photo') }}</th>
          <th v-if="filterField" class="cabecera">{{ OrdenarPorNombre(filterField) }}</th>
          <th v-if="filterField !== 'nombre'" class="cabecera">{{ $t('DeudoresTabla.Name') }}</th>
          <th v-if="filterField !== 'apellidos'" class="cabecera">{{ $t('DeudoresTabla.Surname') }}</th>
          <th v-if="filterField !== 'genero'" class="cabecera">{{ $t('DeudoresTabla.Gender') }}</th>
          <th v-if="filterField !== 'nacionalidad'" class="cabecera">{{ $t('DeudoresTabla.Nationality') }}</th>
          <th v-if="filterField !== 'cantidad'" class="cabecera">{{ $t('DeudoresTabla.Cantidad') }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="deudor in filteredDeudores" :key="deudor.idCiudadano" class="hover:bg-blue-100">
          <td class="tabla">
            <img :src="deudor.imagenUrl" alt="Foto del deudor" class="rounded-full w-12 h-12 object-cover mx-auto" />
          </td>
          <td v-if="filterField" class="tabla">{{ deudor[filterField as keyof typeof deudor] }}</td>
          <td v-if="filterField !== 'nombre'" class="tabla">{{ deudor.nombre }}</td>
          <td v-if="filterField !== 'apellidos'" class="tabla">{{ deudor.apellidos }}</td>
          <td v-if="filterField !== 'genero'" class="tabla">{{ deudor.genero }}</td>
          <td v-if="filterField !== 'nacionalidad'" class="tabla">{{ deudor.nacionalidad }}</td>
          <td v-if="filterField !== 'cantidad'" class="tabla">{{ deudor.cantidad }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="divBotones">
    <button id="excel-2" @click="ExportarExcel" class="botonExcel">
      {{ $t('DeudoresTabla.Excel') }}
    </button>
    <BotonPaginaPrincipalComponente />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import { useListadoCiudadanos } from '@/stores/storeCiudadano';
import * as XLSX from 'xlsx';
import { useI18n } from 'vue-i18n';
import BotonPaginaPrincipalComponente from '../ComponentesGenerales/BotonPaginaPrincipalComponente.vue';

const { t, locale } = useI18n();
const { infoDeudores, cargarDatosCiudadanosDeudores } = useListadoCiudadanos();
const searchQuery = ref('');
const filterField = ref('nombre');

onMounted(async () => {
  await cargarDatosCiudadanosDeudores();
});

const filteredDeudores = computed(() => {
  const searchLower = searchQuery.value.toLowerCase();
  return infoDeudores.filter((deudor: typeof infoDeudores[0]) => {
    return String(deudor[filterField.value as keyof typeof deudor]).toLowerCase().includes(searchLower);
  });
});

function OrdenarPorNombre(field: any) {
  const names: { [key: string]: string } = {
    nombre: 'Nombre',
    apellidos: 'Apellidos',
    genero: 'Género',
    nacionalidad: 'Nacionalidad',
    cantidad: 'Cantidad',
  };
  return names[field] || field;
}

const ExportarExcel = () => {
  const dataToExport = filteredDeudores.value.map((deudor: typeof infoDeudores[0]) => ({
    Nombre: deudor.nombre,
    Apellidos: deudor.apellidos,
    Género: deudor.genero,
    Nacionalidad: deudor.nacionalidad,
    Cantidad: deudor.cantidad,
  }));
  const ws = XLSX.utils.json_to_sheet(dataToExport);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Deudores");
  XLSX.writeFile(wb, "Listado_Deudores.xlsx");
};
</script>

<style scoped>
.ciudadano_boton {
  @apply flex h-8 w-20 items-center justify-center bg-[color:var(--colorBotonBusquedaCiudadano)] text-[color:var(--colorTextoTarjeta)] no-underline mt-2.5 rounded-[10px];
}

.cabecera {
  text-align: center;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
  background-color: var(--colorFondoCiudadano2);
  color: var(--colorTextoTarjeta);
}

.tabla {
  text-align: center;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
  background-color: var(--colorBlanco);
}

.botonExcel {
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
  color: var(--colorBlanco);
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
  background-color: var(--colorBotonBusquedaCiudadanoActivo);
  border-radius: 0.5rem;
  cursor: pointer;
  margin-top: 1rem;
  width: 10rem;
}

.divBotones{
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.table-auto th,
.table-auto td {
  text-align: center;
}

@media (max-width: 768px) {

  th,
  td {
    @apply text-sm;
  }

  img {
    @apply w-10 h-10;
  }
}

@media (max-width: 480px) {

  th,
  td {
    @apply text-xs;
  }

  img {
    @apply w-8 h-8;
  }
}
</style>
