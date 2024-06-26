<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from 'vue';
import ReturnButton from '@/components/ComponentesGenerales/BotonPaginaPrincipalComponente.vue';
import { useListadoPolicias } from '@/stores/storePolicia';
import { useListadoRangos } from '@/stores/storeRango';
import { useListadoAuditorias } from '@/stores/storeAuditoria';
import { useListadoAuth } from '@/stores/storeAuth';

export default defineComponent({
  components: {
    ReturnButton
  },
  setup() {
    const { cargarDatosPolicias, infoPolicias, actualizarPolicia } = useListadoPolicias();
    const { cargarDatosRangos, infoRangos } = useListadoRangos();
    const { guardarAuditoria } = useListadoAuditorias();
    const storeAuth = useListadoAuth();
    const storePolicia = useListadoPolicias();
    const storeRango = useListadoRangos();
    const policiaActualId = ref(0);

    onMounted(async () => {
      await storePolicia.cargarDatosPolicias();
      await storeRango.cargarDatosRangos();
      await storeAuth.loadPoliceInfo();

      if (storeAuth.infoPoliciasAuth.IdPolicia) {
        policiaActualId.value = storeAuth.infoPoliciasAuth.IdPolicia;
        await storePolicia.cargarDatosPoliciasId(policiaActualId.value);
        console.log(storePolicia.infoPoli);
      }
    });


    const editMode = ref<{ [key: number]: boolean }>({});
    const rangosOriginales = reactive<{ [key: number]: string }>({});

    const startEdit = (idPolicia: number) => {
      editMode.value[idPolicia] = true;
      const policia = infoPolicias.find(p => p.idPolicia === idPolicia);
      if (policia && policia.rango) {
        rangosOriginales[idPolicia] = policia.rango.nombre;
      }
    };

    const GuardarCambios = async (policia: any) => {
      const rangoAntiguo = rangosOriginales[policia.idPolicia] || 'Sin Rango';

      if (policia.rango && policia.rango.nombre) {
        const selectedRango = infoRangos.find(rango => rango.nombre === policia.rango.nombre);
        if (selectedRango && selectedRango.nombre !== rangoAntiguo) {
          policia.rango.idRango = selectedRango.idRango;
        } else {
          return;
        }
      }

      const policiaPostDTO = {
        IdPolicia: policia.idPolicia,
        IdCiudadano: policia.idCiudadano,
        RangoId: policia.rango.idRango,
        NumeroPlaca: policia.numeroPlaca,
        Contrasena: policia.contrasena,
      };

      await actualizarPolicia(policiaPostDTO);

      if (rangoAntiguo !== policia.rango.nombre) {
        const fechaFormateada = new Date().toLocaleString('es-ES', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false
        });
        const descripcionAuditoria = `El ${storePolicia.infoPoli.rango.nombre} ${storePolicia.infoPoli.ciudadano.nombre} ha modificado el rango ${rangoAntiguo} a ${policia.rango.nombre} del agente ${policia.ciudadano.nombre} el día ${fechaFormateada}`;
        
        const auditoria = {
          idAuditoria: 0,
          titulo: "Cambio de Rango",
          descripcion: descripcionAuditoria,
          fecha: new Date(),
          idPolicia: policia.idPolicia,
        };
        await guardarAuditoria(auditoria);
      }

      editMode.value[policia.idPolicia] = false;
      delete rangosOriginales[policia.idPolicia];
    };

    return {
      infoPolicias,
      infoRangos,
      editMode,
      startEdit,
      GuardarCambios
    };
  }
});
</script>

<template>
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
            <button @click="GuardarCambios(policia)">Guardar</button>
          </template>
          <template v-else>
            <button @click="startEdit(policia.idPolicia)">Editar</button>
          </template>
        </td>
      </tr>
    </tbody>
  </table>
  <return-button />
</template>

<style scoped>
.container {}

table {
  width: 80%;
  max-width: 1000px;
  border-collapse: collapse;
  color: var(--colorTextoTarjeta);
  border-radius: 8px;
  overflow: hidden;
}

th,
td {
  border: 1px solid var(--colorFondoCiudadano2);
  padding: 12px;
  text-align: left;
}

th {
  background-color: var(--colorFondoCiudadano2);
  font-weight: bold;
}

td {
  background-color: var(--colorBusquedaCiudadanoTarjeta);
}

button {
  background-color: var(--colorBotonBusquedaCiudadano);
  border: none;
  color: var(--colorTextoTarjeta);
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
  background-color: var(--colorBotonBusquedaCiudadanoActivo);
  color: var(--colorBlanco);
  border: none;
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
