<template>
    <div class="contenedor-botones">
        <RouterLink to="/" class="boton-idioma">pagina principal</RouterLink>
    </div>
    <div class="gestion-obras">
        <h2 class="titulo">gestion</h2>
        <button @click="nuevoEvento" class="boton-agregar">crear</button>
        <table class="tabla-obras">
            <thead>
                <tr>
                    <th>ID</th> <!-- Corregido de Imagen a ID -->
                    <th>Descripción</th>
                    <th>Fecha</th> <!-- Agregado el título de Fecha -->
                    <th>Imagen</th> <!-- Movido Imagen aquí -->
                </tr>
            </thead>
            <tbody>
                <tr v-for="evento in store.infoEventos" :key="evento.idEventos">
                    <td>{{ evento.idEventos }}</td>
                    <td>{{ evento.descripcion }}</td>
                    <td>{{ evento.fecha }}</td>
                    <td>
                        <img :src="evento.imagen" alt="Imagen del evento" style="width: 100px; height: auto;">
                        <!-- Asegurarse de mostrar la imagen -->
                    </td>
                    <td>
                        <button @click="editarEvento(evento)">Editar</button>
                        <button @click="borrarEvento(evento.idEventos)">Borrar</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <div v-if="mostrarFormulario" class="formulario">
            <input v-model="eventoEditando.imagen" placeholder="Imagen" />
            <input v-model="eventoEditando.descripcion" placeholder="Descripción" />
            <input type="datetime-local" v-model="eventoEditando.fecha" placeholder="Fecha" />

            <button @click="guardarActualizarEvento">Guardar</button>
            <button @click="cerrarFormulario">Cancelar</button>
        </div>
    </div>
</template>


<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useListadoEvento } from '@/stores/storeEventos';

/*import { useI18n } from 'vue-i18n';
const store = useListadoObrasAdminStore();
const { t, locale } = useI18n();
const idiomaActual = computed(() => locale.value === 'en' ? 'Español' : 'English');

const idiomaCambiado = () => {
    locale.value = locale.value === 'en' ? 'es' : 'en';
}*/
const mostrarFormulario = ref(false);

const store = useListadoEvento();
const obras = store.infoEventos;
const eventoEditando = store.eventoEditando;

const nuevoEvento = () => {
    store.resetEventoEditando();
    mostrarFormulario.value = true;
};

const editarEvento = (obra: any) => {
    Object.assign(eventoEditando, obra);
    mostrarFormulario.value = true;
};

const guardarActualizarEvento = () => {
    const Datos = {
        idEventos: eventoEditando.idEventos || 0,
        descripcion: eventoEditando.descripcion,
        imagen: eventoEditando.imagen,
        fecha: eventoEditando.fecha,
    };

    if (eventoEditando.idEventos) {
        store.actualizarEventos({ ...Datos, fecha: new Date(Datos.fecha) });
    } else {
        store.guardarEvento({ ...Datos, fecha: new Date(Datos.fecha) });
    }
    cerrarFormulario();
};



const borrarEvento = (obraID: number) => {
    store.borrarDatosEvento(obraID);
};

const cerrarFormulario = () => {
    mostrarFormulario.value = false;
};

onMounted(() => {
    store.cargarDatosEventos();
});
</script>
<style scoped>
.gestion-obras {
  @apply p-5 font-sans;
}
.titulo {
  @apply text-center mb-5;
}
.boton-idioma {
  @apply inline-block h-8 font-serif font-bold bg-blue-600 rounded-full text-black border-2 border-black no-underline;
}
.contenedor-botones {
  @apply flex justify-end mb-5;
}
.boton-agregar,
.boton-editar,
.boton-borrar {
  @apply bg-blue-900 text-white px-3 py-2 rounded-lg cursor-pointer mr-1;
}
.boton-agregar:hover,
.boton-editar:hover,
.boton-borrar:hover {
  @apply bg-blue-800;
}
.tabla-wrapper {
  @apply overflow-x-auto;
}
.tabla-obras {
  @apply text-[calc(12px_+_0.5vw)];
  @apply w-full bg-white rounded-lg border-collapse text-sm lg:text-base;
}
.tabla-obras th,
.tabla-obras td {
  @apply border p-2 lg:p-4 text-left;
}
.tabla-obras th {
  @apply bg-blue-900 text-white;
}
.tabla-obras td {
  @apply bg-blue-100;
}
.tabla-obras tr:nth-child(even) {
  @apply bg-blue-50;
}
.tabla-obras tr:hover {
  @apply bg-blue-200;
}
.img-evento {
  @apply w-[calc(60px_+_2vw)] h-auto;

}
.input-formulario {
  @apply w-full mb-4 p-2 border rounded;
}
.boton-formulario {
  @apply bg-blue-900 text-white px-3 py-2 rounded-lg cursor-pointer mr-2;
}
@media (max-width: 768px) {
  .tabla-obras {
    @apply text-xs;
  }
  .tabla-obras th,
  .tabla-obras td {
    @apply p-2;
  }
  .img-evento {
    @apply w-[calc(50px_+_2vw)];

  }
}
@media (max-width: 480px) {
  .tabla-obras {
    @apply text-xs;
  }
  .tabla-obras th,
  .tabla-obras td {
    @apply p-1;
  }
  .img-evento {
    @apply w-[calc(40px_+_2vw)];
 
  }
}

</style>
