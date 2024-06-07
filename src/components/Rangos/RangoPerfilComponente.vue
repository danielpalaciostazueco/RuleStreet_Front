<script lang="ts">
import { defineComponent, ref, computed, watch, onMounted } from 'vue';
import ReturnButton from '@/components/ComponentesGenerales/BotonPaginaPrincipalComponente.vue';
import { useRoute } from 'vue-router';
import { useListadoRangos, type Rango } from '@/stores/storeRango';
import { useListadoPermisos, type Permiso } from '@/stores/storePermiso';
import { useI18n } from 'vue-i18n';
import { useListadoAuditorias } from '@/stores/storeAuditoria';
import { useListadoAuth } from '@/stores/storeAuth';
import { useListadoPolicias } from '@/stores/storePolicia';

interface PermisoConEstado extends Permiso {
  active: boolean;
}

export default defineComponent({
  components: {
    ReturnButton
  },
  setup() {
    const route = useRoute();
    const rangeId = ref(parseInt(parseRouteParam(route.params.id) || '0'));
    const storeRango = useListadoRangos();
    const storePermiso = useListadoPermisos();
    const storePolicia = useListadoPolicias();
    const { t } = useI18n();
    const permisosConEstado = ref<PermisoConEstado[]>([]);
    const originalPermisos = ref<PermisoConEstado[]>([]);
    const editing = ref(false);
    const editableSalary = ref(0);
    const { guardarAuditoria } = useListadoAuditorias();
    const storeAuth = useListadoAuth();
    const policiaActualId = ref(0);

    onMounted(async () => {
      if (rangeId.value) {
        await storeRango.cargarDatosRangosId(rangeId.value);
        await storePermiso.cargarDatosPermisos();
        editableSalary.value = storeRango.infoRangos.find(r => r.idRango === rangeId.value)?.salario || 0;
      }
      await storeAuth.loadPoliceInfo();
      if (storeAuth.infoPoliciasAuth.IdPolicia) {
        policiaActualId.value = storeAuth.infoPoliciasAuth.IdPolicia;
        await storePolicia.cargarDatosPoliciasId(policiaActualId.value);
      }
    });

    const rangeDetails = computed<Rango | undefined>(() => {
      return storeRango.infoRangos.find(c => c.idRango === rangeId.value);
    });

    const permisos = computed<Permiso[]>(() => {
      return storePermiso.infoPermiso;
    });

    const actualizarDatos = async (id: number) => {
      await storeRango.cargarDatosRangosId(id);
      await storePermiso.cargarDatosPermisos();

      const rango = storeRango.infoRangos.find(r => r.idRango === id);
      if (rango && Array.isArray(rango.permisos)) {
        permisosConEstado.value = storePermiso.infoPermiso.map(permiso => ({
          ...permiso,
          active: Array.isArray(rango.permisos) && rango.permisos.some((p: { idPermiso: number; }) => p.idPermiso === permiso.idPermiso) || false
        }));
      } else {
        permisosConEstado.value = storePermiso.infoPermiso.map(permiso => ({
          ...permiso,
          active: false
        }));
      }
    };

    const Editando = () => {
      if (!editing.value) {
        originalPermisos.value = permisosConEstado.value.map(permiso => ({
          ...permiso
        }));
      }
      editing.value = !editing.value;
    };

    const cancelEdit = async () => {
      if (rangeId.value) {
        await actualizarDatos(rangeId.value);
      }
      editing.value = false;
    };
    const GuardarEdicion = async () => {
      const updatedRango: Rango = {
        idRango: rangeId.value,
        nombre: rangeDetails.value?.nombre || '',
        salario: editableSalary.value,
        isLocal: true,
        permisos: permisosConEstado.value
          .filter(p => p.active)
          .map(permiso => ({
            idPermiso: permiso.idPermiso,
            nombre: permiso.nombre || '',
            name: permiso.name || '',
            idRango: permiso.idRango || 0,
            active: permiso.active
          })) as Permiso[]
        ,
        idPolicia: 0,
        name: '',
        active: false
      };

      try {
        await storeRango.actualizarRango(updatedRango);
        crearMensajeAuditoria(updatedRango.nombre);
        editing.value = false;
      } catch (error) {
        console.error('Error al actualizar el rango:', error);
      }
    };

    const crearMensajeAuditoria = async (nombreRango: string) => {
      const fechaFormateada = new Date().toLocaleString('es-ES', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      });

      const descripcionAuditoria = `El ${storePolicia.infoPoli.rango.nombre} ${storePolicia.infoPoli.ciudadano.nombre} ha modificado el rango: ${nombreRango} el día ${fechaFormateada}`;
      const auditoria = {
        idAuditoria: 0,
        titulo: 'Rango',
        descripcion: descripcionAuditoria,
        fecha: new Date(),
        idPolicia: rangeId.value
      };

      try {
        await guardarAuditoria(auditoria);
      } catch (error) {
        console.error('Error al crear el mensaje de auditoría:', error);
      }
    };

    watch(() => route.params.id, async (newId) => {
      const parsedId = parseInt(parseRouteParam(newId));
      if (parsedId) {
        rangeId.value = parsedId;
        await actualizarDatos(parsedId);
      }
    }, { immediate: true });

    const ManejarPermiso = (permisoId: number, active: boolean) => {
      console.log(`Permiso ID: ${permisoId}, Estado actual: ${active}`);
    };

    return {
      rangeDetails,
      rangeId,
      permisos,
      permisosConEstado,
      editing,
      Editando,
      cancelEdit,
      GuardarEdicion,
      editableSalary,
      ManejarPermiso,
      t
    };
  }
});

function parseRouteParam(param: string | string[]): string {
  return Array.isArray(param) ? param[0] : param || '0';
}
</script>


<template>
  <div class="ciudadano_menu_derecha">
    <div class="ciudadano_menu_derecha_titulo">
      <h2>{{ $t('RangoPerfil.Profile') }}</h2>
    </div>
    <div class="ciudadano_perfil">
      <p v-if="!rangeId">{{ $t('RangoPerfil.Select') }}</p>
      <template v-else>
        <div class="ciudadano_perfil_usuario_derecha">
          <div class="ciudadano_tarjeta">
            <p>{{ $t('PerfilCiudadano.Name') }}</p>
            <p>{{ rangeDetails?.nombre }}</p>
          </div>
          <div class="ciudadano_tarjeta">
            <p>{{ $t('PerfilCiudadano.Name') }}</p>
            <template v-if="editing">
              <input type="number" v-model="editableSalary" class="input_salario">
            </template>
            <template v-else>
              <p>{{ rangeDetails?.salario }}€</p>
            </template>
          </div>
        </div>
        <div class="permisos">
          <label v-for="permiso in permisosConEstado" :key="permiso.idPermiso" class="switch">
            <input type="checkbox" v-model="permiso.active" :disabled="!editing"
              @change="ManejarPermiso(permiso.idPermiso, permiso.active)">
            <span class="slider round"></span>
            {{ permiso.nombre }}
          </label>
        </div>
        <button class="ciudadano_boton" v-if="!editing" @click="Editando">Editar</button>
        <button class="ciudadano_boton" v-if="editing" @click="GuardarEdicion">Guardar</button>
        <button class="ciudadano_boton" v-if="editing" @click="cancelEdit">Cancelar</button>
      </template>
      <return-button />
    </div>
  </div>
</template>

<style scoped>
.ciudadano_menu_derecha {
  @apply bg-[color:var(--colorFondoCiudadano2)] w-[70%] flex flex-col gap-8 py-8 rounded-lg;
}

.ciudadano_menu_derecha_titulo {
  @apply flex justify-center items-center;
}

.ciudadano_menu_derecha_titulo h2 {
  @apply bg-[color:var(--colorFondoCiudadano)] h-10 text-[color:var(--colorTextoTarjeta)] flex items-center w-4/5 flex justify-center text-lg rounded-[0.7rem];
}

.ciudadano_perfil_usuario {
  @apply flex w-full gap-12;
}

.ciudadano_perfil_usuario_izquierda {
  @apply flex justify-center items-center;
}

.ciudadano_perfil_usuario_izquierda img {
  @apply w-60 h-60;
}

.ciudadano_perfil_usuario_derecha {
  display: flex;
  width: 100%;
  gap: 0.5rem;
  justify-content: space-around;
}

.ciudadano_tarjeta {
  @apply bg-[color:var(--colorBusquedaCiudadanoTarjeta)] w-48 h-16 flex flex-col justify-center gap-2 pl-8 rounded-[0.7rem];
}

.ciudadano_tarjeta p {
  @apply text-base;
}

.ciudadano_perfil_botones {
  @apply flex gap-8 bg-[color:var(--colorBusquedaCiudadanoTarjeta)] w-full h-32 justify-center items-center rounded-[0.7rem];
}

.ciudadano_perfil_boton input[type="radio"] {
  @apply hidden;
}

.ciudadano_perfil_boton label {
  @apply inline-block w-52 text-center text-[color:var(--colorBlanco)] bg-[color:var(--colorBusquedaCiudadanoTarjeta)] cursor-pointer border border-[color:var(--colorTextoTarjeta)] text-[color:var(--colorTextoTarjeta)] p-2.5 border-solid;
}

#no_izquierda:checked+label,
#no_derecha:checked+label {
  @apply bg-[color:var(--colorBusquedaCiudadanoPerfilBoton)] text-[color:var(--colorTextoTarjeta)];
}

#yes_izquierda:checked+label,
#yes_derecha:checked+label {
  @apply bg-[color:var(--colorBusquedaCiudadanoPerfilBoton)] text-[color:var(--colorTextoTarjeta)];
}

.ciudadano_perfil_botones_derecha {
  @apply flex flex-col items-center gap-4;
}

.ciudadano_perfil_botones_izquierda {
  @apply flex flex-col items-center gap-4;
}

.ciudadano_perfil_botones_derecha h2 {
  @apply text-[color:var(--colorTextoTarjeta)];
}

.ciudadano_perfil_botones_izquierda h2 {
  @apply text-[color:var(--colorTextoTarjeta)];
}

.ciudadano_perfil_otros {
  @apply grid grid-cols-custom2 gap-4 justify-center items-center w-full;
}

.ciudadano_perfil_otros_container {
  @apply flex bg-[color:var(--colorBusquedaCiudadanoTarjeta)] w-full h-80 rounded-[0.7rem];
}

.ciudadano_icono {
  @apply w-8 h-4;
}

.ciudadano_perfil_notasdiv {
  @apply flex w-full gap-2 flex-col p-4;
}

.ciudadano_perfil_notasdiv p {
  @apply text-base;
}

.ciudadano_perfil_multas {
  @apply flex w-full justify-end;
}

.ciudadano_perfil_multas p {
  @apply text-base;
}

.ciudadano_perfil {
  @apply flex items-center justify-center flex-col justify-between h-full p-8;
}

.ciudadano_perfil p {
  @apply text-[color:var(--colorTextoTarjeta)];
}

.ciudadano_perfil_notasdiv_titulo {
  @apply flex;
}

.notas_container {
  @apply w-full h-full overflow-y-auto flex gap-4 flex-col;
}

.notas_container::-webkit-scrollbar {
  @apply w-2;
}

.notas_container::-webkit-scrollbar-thumb {
  @apply bg-[color:var(--colorBlanco)] rounded hover:bg-[color:var(--colorFondoCiudadano)];
}

.tarjeta_otros {
  @apply bg-[color:var(--colorBusquedaCiudadanoPerfilOtrosTarjeta)] min-h-[2rem] flex flex-col justify-center gap-4 pl-8 pl-4 p-2 rounded-[0.7rem];
}

.tarjeta_otros_cabecera {
  @apply flex justify-between;
}

.tarjeta_otros_cabecera h1 {
  @apply text-[color:var(--colorTextoTarjeta)];
}

.tarjeta_multa {
  @apply bg-[color:var(--colorBusquedaCiudadanoPerfilOtrosTarjeta)] h-40 flex flex-col justify-center gap-4 pl-8 pl-4 p-2 rounded-[0.7rem];
}

.tarjeta_multa_titulo {
  @apply bg-[color:var(--colorBusquedaCiudadanoPerfilOtrosTarjeta)] flex flex-col justify-center gap-4 pl-8 pl-4 p-2 rounded-[0.7rem];
}

.tarjeta_multa_pagada {
  @apply bg-[color:var(--colorBusquedaCiudadanoPerfilOtrosMultaPagada)] h-40 flex flex-col justify-center gap-4 pl-8 pl-4 p-2 rounded-[0.7rem];
}

.tarjeta_multa_info {
  @apply flex gap-4 justify-end;
}

.tarjeta_multa_icono {
  @apply fill-[var(--colorBlanco)] w-6 h-4;
}

.tarjeta_multa_iconos {
  @apply flex items-center;
}

.permisos {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px 40px;
  align-items: center;
  justify-items: center;
}

.switch {
  display: flex;
  align-items: center;
  width: 100%;
  color: var(--colorTextoTarjeta);

}

.switch input {
  opacity: 0;
  position: absolute;
  z-index: -1;
}

.slider {
  cursor: pointer;
  height: 2.1rem;
  width: 4rem;
  background-color: var(--colorPermisos);
  border-radius: 34px;
  position: relative;
  margin-right: 10px;
}


.slider:before {
  content: "";
  position: absolute;
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: var(--colorBlanco);
  transition: .4s;
  border-radius: 50%;
}

input:checked+.slider {
  background-color: var(--colorBotonBusquedaCiudadanoActivo);
}

input:focus+.slider {
  box-shadow: 0 0 1px var(--colorBotonBusquedaCiudadanoActivo);
}

input:checked+.slider:before {
  transform: translateX(26px);
}

.ciudadano_boton {
  @apply bg-[color:var(--colorBotonBusquedaCiudadano)] w-20 h-8 flex justify-center items-center text-[color:var(--colorTextoTarjeta)] no-underline hover:bg-[color:var(--colorBotonBusquedaCiudadanoActivo)] hover:text-[color:var(--colorBlanco)];
}

.input_salario {
  outline: none;
  background-color: var(--colorBusquedaCiudadanoTarjeta);
  width: 80%;
  color: var(--colorTextoTarjeta);
}

.input_salario::-webkit-inner-spin-button,
.input_salario::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}


@media (max-width: 1407px) {
  .ciudadano_perfil_usuario {
    @apply flex w-full gap-12 flex-col;
  }

  .ciudadano_perfil_botones[data-v-a5cac0f2] {
    @apply flex h-32 w-full items-center justify-center gap-8 bg-[color:var(--colorBusquedaCiudadanoTarjeta)] mt-5 rounded-[0.7rem];
  }

  .ciudadano_perfil_boton {
    @apply flex w-6/12 mb-2.5;
  }

  .ciudadano_perfil_otros {
    @apply grid grid-cols-custom2 gap-4 justify-center items-center w-full;
  }

  .ciudadano_boton {
    @apply flex h-8 w-20 items-center justify-center bg-[color:var(--colorBotonBusquedaCiudadano)] text-[color:var(--colorTextoTarjeta)] no-underline mt-2.5;
  }
}

@media (max-width: 1124px) {
  .ciudadano_menu_derecha {
    @apply w-full;
  }

  .ciudadano_perfil_usuario {
    @apply flex-col gap-4;
  }

  .ciudadano_perfil_usuario_derecha {
    @apply grid-cols-2;
  }

  .ciudadano_tarjeta {
    @apply w-full;
  }

  .ciudadano_perfil_otros {
    @apply grid-cols-1;
  }

  .ciudadano_perfil_botones {
    @apply h-auto flex-col gap-4 mt-4;
  }

  .ciudadano_perfil_otros_container {
    @apply flex h-80 w-full bg-[BusquedaCiudadanoTarjeta] mt-4 rounded-[0.7rem];
  }
}

@media (max-width: 768px) {
  .ciudadano_menu_derecha {
    @apply w-full;
  }

  .ciudadano_menu_derecha_titulo h2 {
    @apply text-sm;
  }

  .ciudadano_tarjeta p {
    @apply text-sm;
  }

  .ciudadano_perfil_usuario_derecha {
    @apply grid-cols-1;
  }

  .ciudadano_perfil_botones[data-v-a5cac0f2] {
    @apply h-auto flex-col gap-2 mt-4;
  }

  .ciudadano_perfil_otros {
    @apply grid-cols-1;
  }

  .notas_container {
    @apply p-2;
  }

  .tarjeta_otros,
  .tarjeta_multa,
  .tarjeta_multa_pagada {
    @apply h-auto p-2;
  }

  .ciudadano_perfil_otros_container[data-v-a5cac0f2] {
    @apply flex h-80 w-full bg-[color:var(--colorBusquedaCiudadanoTarjeta)] mt-4 rounded-[0.7rem];
  }

  .ciudadano_busqueda[data-v-845bb2b1] {
    @apply gap-1;

  }
}

@media (max-width: 480px) {
  .ciudadano_menu_derecha {
    @apply w-full;
  }

  .ciudadano_menu_derecha_titulo h2 {
    @apply text-xs;
  }

  .ciudadano_tarjeta p {
    @apply text-xs;
  }

  .ciudadano_perfil_usuario_derecha {
    @apply grid-cols-1;
  }

  .ciudadano_perfil_botones {
    @apply flex-col h-auto gap-2;
  }

  .ciudadano_perfil_otros {
    @apply grid-cols-1;
  }

  .notas_container {
    @apply p-2;
  }

  .tarjeta_otros,
  .tarjeta_multa,
  .tarjeta_multa_pagada {
    @apply h-auto p-2;
  }

  .ciudadano_perfil_boton label[data-v-a5cac0f2] {
    @apply inline-block w-52 cursor-pointer border border-[color:var(--colorTextoTarjeta)] bg-[color:var(--colorBusquedaCiudadanoTarjeta)] text-center text-[color:var(--colorBlanco)] text-[color:var(--colorTextoTarjeta)] ml-5 p-2.5 border-solid;
  }

  #no_izquierda:checked+label[data-v-a5cac0f2],
  #no_derecha:checked+label[data-v-a5cac0f2] {
    @apply bg-[color:var(--colorBusquedaCiudadanoPerfilBoton)] text-[color:var(--colorTextoTarjeta)] ml-5;
  }

  .ciudadano_boton[data-v-edd735a0] {
    @apply flex h-8 w-20 items-center justify-center bg-[color:var(--colorBotonBusquedaCiudadano)] text-[color:var(--colorTextoTarjeta)] no-underline mt-4;
  }

  .ciudadano_busqueda {
    @apply gap-1;
    /* flex-direction: column; */
  }
}

@media (max-width: 400px) {
  .ciudadano_menu_derecha {
    @apply w-full py-4 gap-4;
  }

  .ciudadano_menu_derecha_titulo h2 {
    @apply text-xs;
  }

  .ciudadano_tarjeta p {
    @apply text-xs;
  }

  .ciudadano_perfil_boton label[data-v-a5cac0f2] {
    @apply inline-block w-52 cursor-pointer border border-[color:var(--colorTextoTarjeta)] bg-[color:var(--colorBusquedaCiudadanoTarjeta)] text-center text-[color:var(--colorBlanco)] text-[color:var(--colorTextoTarjeta)] ml-5 p-2.5 border-solid;
  }

  #no_izquierda:checked+label[data-v-a5cac0f2],
  #no_derecha:checked+label[data-v-a5cac0f2] {
    @apply bg-[color:var(--colorBusquedaCiudadanoPerfilBoton)] text-[color:var(--colorTextoTarjeta)] ml-5;
  }

  .ciudadano_perfil_usuario_derecha {
    @apply grid-cols-1;
  }

  .ciudadano_perfil_botones[data-v-a5cac0f2][data-v-a5cac0f2] {
    @apply h-[19rem] flex-col gap-2 mt-4;
  }

  .ciudadano_perfil_otros {
    @apply grid-cols-1;
  }

  .ciudadano_perfil_otros_container[data-v-a5cac0f2] {
    @apply flex h-80 w-full bg-[color:var(--colorBusquedaCiudadanoTarjeta)] mt-4 rounded-[0.7rem];
  }

  .notas_container {
    @apply p-2;
  }

  .tarjeta_otros,
  .tarjeta_multa,
  .tarjeta_multa_pagada {
    @apply h-auto p-2;
  }

  .ciudadano_perfil_usuario_izquierda img {
    @apply w-40 h-40;
  }

  .ciudadano_boton[data-v-edd735a0] {
    @apply flex h-8 w-20 items-center justify-center bg-[color:var(--colorBotonBusquedaCiudadano)] text-[color:var(--colorTextoTarjeta)] no-underline mt-4;
  }

  .ciudadano_busqueda {
    @apply gap-1;
  }
}
</style>