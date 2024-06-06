<template>
  <div class="container_dashboard">
    <div class="contenedor-botones">
      <RouterLink to="/" class="boton-idioma">Página Principal</RouterLink>
    </div>
    <div class="gestion-obras">
      <h2 class="titulo">Gestión de Eventos</h2>
      <button @click="nuevoEvento" class="boton-agregar">Crear Evento</button>
      <div class="tabla-wrapper">
        <table class="tabla-obras">
          <thead>
            <tr>
              <th>ID</th>
              <th>{{ $t('DashAyuntamiento.Description') }}</th>
              <th>{{ $t('DashAyuntamiento.Date') }}</th>
              <th>{{ $t('DashAyuntamiento.Image') }}</th>
              <th>{{ $t('DashAyuntamiento.Actions') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="evento in store.infoEventos" :key="evento.idEventos">
              <td>{{ evento.idEventos }}</td>
              <td v-if="locale === 'es'">{{ evento.descripcion }}</td>
              <td v-if="locale === 'en'">{{ evento.description }}</td>
              <td>{{ evento.fecha }}</td>
              <td>
                <img :src="evento.imagen" alt="Imagen del evento" class="img-evento">
              </td>
              <td>
                <button @click="editarEvento(evento)" class="boton-editar">{{ $t('DashAyuntamiento.Edit') }}</button>
                <button @click="borrarEvento(evento.idEventos)" class="boton-borrar ml-2">{{
                  $t('DashAyuntamiento.Delete')
                }}</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-if="mostrarFormulario" class="formulario">
        <input v-model="eventoEditando.imagen" placeholder="Imagen" class="input-formulario" />
        <input v-if="locale === 'es'" v-model="eventoEditando.descripcion"
          :placeholder="$t('DashAyuntamiento.Description')" class="input-formulario" />
        <input v-if="locale === 'en'" v-model="eventoEditando.description"
          :placeholder="$t('DashAyuntamiento.Description')" class="input-formulario" />
        <input type="datetime-local" v-model="eventoEditando.fecha" :placeholder="$t('DashAyuntamiento.Date')"
          class="input-formulario" />

        <button @click="guardarActualizarEvento" class="boton-formulario">{{ $t('DashAyuntamiento.Save') }}</button>
        <button @click="cerrarFormulario" class="boton-formulario">{{ $t('DashAyuntamiento.Cancel') }}</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useListadoEvento } from '@/stores/storeEventos';
import { useI18n } from 'vue-i18n';

const mostrarFormulario = ref(false);
const { t, locale } = useI18n();
const store = useListadoEvento();
const eventoEditando = store.eventoEditando;

const nuevoEvento = () => {
  store.resetEventoEditando();
  mostrarFormulario.value = true;
};

const editarEvento = (evento: any) => {
  store.setObraEditando(evento);
  mostrarFormulario.value = true;
};

const guardarActualizarEvento = async () => {
  if (eventoEditando.idEventos) {
    await store.actualizarEventos(eventoEditando);
  } else {
    await store.guardarEvento(eventoEditando);
  }
  cerrarFormulario();
};

const borrarEvento = async (eventoID: number) => {
  await store.borrarDatosEvento(eventoID);
};

const cerrarFormulario = () => {
  mostrarFormulario.value = false;
};

onMounted(() => {
  store.cargarDatosEventos();
});
</script>


<style scoped>
.container_dashboard {
  background-color: var(--colorFondo);
  height: 100vh;
  display: flex;
  justify-content: start;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;
}

.gestion-obras {
  @apply p-8 font-sans bg-gray-50 rounded-lg shadow-lg;
}

.titulo {
  @apply text-center text-2xl font-bold mb-6 text-gray-800;
}

.boton-idioma {
  @apply inline-block h-10 px-4 py-2 font-serif font-bold bg-blue-600 text-white rounded-full border-2 border-blue-800 no-underline;
}

.contenedor-botones {
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: flex-end;
}

.boton-agregar,
.boton-editar,
.boton-borrar {
  @apply bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer transition-all duration-300 ease-in-out;
}

.boton-agregar:hover,
.boton-editar:hover,
.boton-borrar:hover {
  @apply bg-blue-700;
}

.tabla-wrapper {
  @apply overflow-x-auto bg-white shadow-lg rounded-lg;
}

.tabla-obras {
  @apply w-full bg-white rounded-lg border-collapse text-sm lg:text-base;
}

.tabla-obras th,
.tabla-obras td {
  @apply border p-4 text-left;
}

.tabla-obras th {
  @apply bg-blue-600 text-white;
}

.tabla-obras td {
  @apply bg-blue-50;
}

.tabla-obras tr:nth-child(even) {
  @apply bg-blue-100;
}

.tabla-obras tr:hover {
  @apply bg-blue-200;
}

.img-evento {
  @apply w-24 h-auto rounded-md;
}

.input-formulario {
  @apply w-full mb-4 p-3 border rounded-lg shadow-sm focus:outline-none focus:border-blue-600;
}

.boton-formulario {
  @apply bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer mr-2 transition-all duration-300 ease-in-out;
}

.boton-formulario:hover {
  @apply bg-blue-700;
}

@media (max-width: 768px) {

  .tabla-obras th,
  .tabla-obras td {
    @apply p-2 text-xs;
  }

  .img-evento {
    @apply w-20;
  }
}

@media (max-width: 480px) {

  .tabla-obras th,
  .tabla-obras td {
    @apply p-1 text-xs;
  }

  .img-evento {
    @apply w-16;
  }
}
</style>
