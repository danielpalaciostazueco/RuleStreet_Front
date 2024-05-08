<template>
    <div class="contenedor-botones">

        <RouterLink to="/" class="boton-idioma">pagina principal</RouterLink>
    </div>
    <div class="gestion-obras">
        <h2 class="titulo">gestion</h2>
        <button @click="nuevaObra" class="boton-agregar">crear</button>
        <table class="tabla-obras">
            <thead>
                <tr>
                    <th>Imagen</th>
                    <th>descripción</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="obra in obras" :key="obra.obraID">
                    <td>{{ obra.obraID }}</td>
                    <td>{{ obra.nombre }}</td>
                    <td>{{ obra.descripcion }}</td>
                    <td>{{ obra.autores }}</td>
                    <td>{{ obra.duracion }}</td>
                    <td>{{ obra.actores }}</td>
                    <td>
                        <ul>
                            <li v-for="imagen in obra.imagenes.split(',')" :key="imagen">{{ imagen }}</li>
                        </ul>
                    </td>
                    <td>{{ obra.fechaUno }}</td>
                    <td>{{ obra.fechaDos }}</td>
                    <td>{{ obra.fechaTres }}</td>
                    <td><img :src="obra.cartel" alt="Cartel" style="width: 100px; height: auto;" /></td>
                    <td>
                        <button @click="editarObra(obra)">{{ $t('AdminPanel.edit') }}</button>
                        <button @click="borrarObra(obra.obraID)">{{ $t('AdminPanel.cancel') }}</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <div v-if="mostrarFormulario" class="formulario">
            <input v-model="obraEditando.nombre" placeholder="Imagen" />
            <input v-model="obraEditando.autores" placeholder="Descripción" />
            <input type="datetime-local" v-model="obraEditando.fechaUno" placeholder="Fecha" />

            <button @click="guardarActualizarObra">Guardar</button>
            <button @click="cerrarFormulario">Cancelar</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useListadoObrasAdminStore } from '../store/Admin-Store';

/*import { useI18n } from 'vue-i18n';
const store = useListadoObrasAdminStore();
const { t, locale } = useI18n();
const idiomaActual = computed(() => locale.value === 'en' ? 'Español' : 'English');

const idiomaCambiado = () => {
    locale.value = locale.value === 'en' ? 'es' : 'en';
}*/
const mostrarFormulario = ref(false);


const obras = store.obras;
const obraEditando = store.obraEditando;

const nuevaObra = () => {
    store.resetObraEditando();
    mostrarFormulario.value = true;
};

const editarObra = (obra: any) => {
    Object.assign(obraEditando, obra);
    mostrarFormulario.value = true;
};

const guardarActualizarObra = () => {

    const Datos = {
        obraID: obraEditando.obraID || 0,
        nombre: obraEditando.nombre,
        descripcion: obraEditando.descripcion,
        autores: obraEditando.autores,
        duracion: obraEditando.duracion,
        actores: obraEditando.actores,
        imagenes: obraEditando.imagenes,
        fechaUno: obraEditando.fechaUno,
        fechaDos: obraEditando.fechaDos,
        fechaTres: obraEditando.fechaTres,
        cartel: obraEditando.cartel
    };




    if (obraEditando.obraID) {
        store.actualizarObra(Datos);
    } else {
        store.guardarObra(Datos);
    }
    cerrarFormulario();
};


const borrarObra = (obraID: number) => {
    store.borrarObra(obraID);
};

const cerrarFormulario = () => {
    mostrarFormulario.value = false;
};

onMounted(() => {
    store.cargarObras();
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