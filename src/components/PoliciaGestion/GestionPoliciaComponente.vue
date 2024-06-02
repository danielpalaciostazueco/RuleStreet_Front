<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useListadoPolicias } from '@/stores/storePolicia';
import { useListadoRangos } from '@/stores/storeRango';

export default defineComponent({
  setup() {
    const { cargarDatosPolicias, infoPolicias, actualizarPolicia } = useListadoPolicias();
    const { cargarDatosRangos, infoRangos } = useListadoRangos();

    onMounted(() => {
      cargarDatosPolicias();
      cargarDatosRangos();
    });

    const editMode = ref<{ [key: number]: boolean }>({});

    const startEdit = (idPolicia: number) => {
      editMode.value[idPolicia] = true;
    };

    const saveChanges = async (policia: any) => {
      if (policia.rango && policia.rango.nombre) {
        // Buscar el rango seleccionado por nombre y asignar su idRango
        const selectedRango = infoRangos.find(rango => rango.nombre === policia.rango.nombre);
        if (selectedRango) {
          policia.rango.idRango = selectedRango.idRango;
        }
      }

      // Construir PoliciaPostDTO
      const policiaPostDTO = {
        IdPolicia: policia.idPolicia,
        IdCiudadano: policia.idCiudadano,
        RangoId: policia.rango.idRango,
        NumeroPlaca: policia.numeroPlaca,
        Contrasena: policia.contrasena,
      };

      await actualizarPolicia(policiaPostDTO);
      editMode.value[policia.idPolicia] = false;
    };

    return {
      infoPolicias,
      infoRangos,
      editMode,
      startEdit,
      saveChanges
    };
  }
});
</script>

<template>
  <div class="container">
    <h1>Editar Rangos de Policías</h1>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Foto</th>
          <th>Nombre</th>
          <th>Rango</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="policia in infoPolicias" :key="policia.idPolicia">
          <td>{{ policia.idPolicia }}</td>
          <td><img :src="policia.ciudadano.imagenUrl" alt="Foto del Policía" class="police-photo"></td>
          <td>{{ policia.ciudadano.nombre }}</td>
          <td>
            <template v-if="editMode[policia.idPolicia]">
              <select v-model="policia.rango.nombre">
                <option v-for="rango in infoRangos" :key="rango.idRango" :value="rango.nombre">
                  {{ rango.nombre }}
                </option>
              </select>
            </template>
            <template v-else>
              {{ policia.rango ? policia.rango.nombre : 'Sin Rango' }}
            </template>
          </td>
          <td>
            <template v-if="editMode[policia.idPolicia]">
              <button @click="saveChanges(policia)">Guardar</button>
            </template>
            <template v-else>
              <button @click="startEdit(policia.idPolicia)">Editar</button>
            </template>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
html, body, .container {
  height: 100%;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.container{
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;

}

table {
  width: 80%;
  max-width: 1000px;
  border-collapse: collapse;
  background-color: #1f3b57;
  color: #ffffff;
  border-radius: 8px;
  overflow: hidden;
}

th, td {
  border: 1px solid #28527a;
  padding: 12px;
  text-align: left;
}

th {
  background-color: #28527a;
  font-weight: bold;
}

td {
  background-color: #1f3b57;
}

button {
  background-color: #4a90e2;
  border: none;
  color: white;
  padding: 8px 16px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  margin: 4px 2px;
  transition-duration: 0.4s;
  cursor: pointer;
  border-radius: 4px;
}

button:hover {
  background-color: white;
  color: #1f3b57;
  border: 2px solid #4a90e2;
}

select {
  background-color: #4a90e2;
  color: white;
  border: 1px solid #28527a;
  padding: 8px;
  border-radius: 4px;
}

select option {
  background-color: #1f3b57;
  color: white;
}

.police-photo {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #4a90e2;
}


</style>