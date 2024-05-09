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
    padding: 20px;
    font-family: Arial, sans-serif;
}

.titulo {
    text-align: center;
    margin-bottom: 20px;
}

.boton-idioma {
    display: inline-block;
    height: 30px;
    font-family: Playfair Display, serif;
    font-weight: 700;
    background-color: #216ce7;
    border-radius: 20px;
    text-decoration: none;
    border: solid 2px black;
    color: black;
}

.contenedor-botones {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 20px;
}

.boton-agregar,
.boton-editar,
.boton-borrar {
    background-color: #1E3367;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-right: 5px;
}

.boton-agregar:hover,
.boton-editar:hover,
.boton-borrar:hover {
    background-color: #152c50;
}

.tabla-obras {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
}

.tabla-obras th,
.tabla-obras td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
}

.tabla-obras th {
    background-color: #1E3367;
    color: white;
}

.tabla-obras tr:nth-child(even) {
    background-color: #f2f2f2;
}

.tabla-obras tr:hover {
    background-color: #ddd;
}

@media (max-width: 1500px) {

    .tabla-obras,
    .tabla-obras tbody,
    .tabla-obras th,
    .tabla-obras td,
    .tabla-obras tr {
        display: block;
    }

    .tabla-obras thead {
        display: none;
    }

    .tabla-obras tr {
        margin-bottom: 15px;
        border: 1px solid #ddd;
    }

    .tabla-obras td {
        padding-left: 50%;
        text-align: right;
        position: relative;
    }

    .tabla-obras td::before {}

    .tabla-obras td {
        border: none;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-left: 10px;
        text-align: left;
    }

    .formulario {

        display: flex;
        flex-direction: column;
    }

}
</style>