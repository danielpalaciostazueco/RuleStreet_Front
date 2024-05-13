
<script lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue';
import { useListadoCodigoPenal } from '@/stores/storeCodigoPenal';
import TituloComponente from '@/components/ComponentesGenerales/TituloComponente.vue';


export default defineComponent({
  setup() {
    const { infoCodigoPenal, cargarDatosCodigoPenal } = useListadoCodigoPenal();
    const filtro = ref('');

    onMounted(async () => {
      await cargarDatosCodigoPenal();
    });

    const filtrarCodigos = computed(() => {
      return infoCodigoPenal.filter(codigo =>
        codigo.articulo.toLowerCase().includes(filtro.value.toLowerCase()) ||
        codigo.descripcion.toLowerCase().includes(filtro.value.toLowerCase()) ||
        codigo.precio.toString().includes(filtro.value) ||
        codigo.sentencia.toLowerCase().includes(filtro.value.toLowerCase())
      );
    });

    return {
      filtro,
      filtrarCodigos
    };
  }
});
</script>
<template>
  <body>
  <TituloComponente />
  <div class="body-container">
    <div class="codigo-penal-container">
      <TitleBar title="Código Penal" />
      <input type="text" v-model="filtro" placeholder="Buscar en el código penal..." class="search-input" />
      <div class="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Artículo</th>
              <th>Descripción</th>
              <th>Cantidad</th>
              <th>Sentencia</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="codigo in filtrarCodigos" :key="codigo.idCodigoPenal">
              <td>{{ codigo.articulo }}</td>
              <td>{{ codigo.descripcion }}</td>
              <td>${{ codigo.precio }}</td>
              <td>{{ codigo.sentencia }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  </body>
</template>

<style scoped>
html, body {
  height: 500vh;
  margin: 0; 
  background-color: var(--colorFondo); 
}

.body-container {

  display: flex;
  flex-direction: column;
  background-color: var(--colorFondo); 
}

.codigo-penal-container {
  width: 80%;
  margin: auto;
  padding: 20px;
  background-color: var(--colorFondoCiudadano);
  color: var(--colorBlanco);
  font-family: Arial, sans-serif;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  flex-grow: 1;
}
.search-input {
  margin: 20px 0;
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid var(--colorBlanco);
  background-color: rgb(70, 69, 69);
  color: white; 
  border-radius: 5px;
}


.table-wrapper {
  overflow-x: auto;
}

table {
  width: 100%;
  border-spacing: 10px; 
  border-collapse: separate;
  border-radius: 10px;
  overflow: hidden;
}

th, td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid var(--colorFondoCiudadano);
  background-color: #525C67;
  width: 20px;
}

th {
  background-color:rgb(36, 35, 35);
}

tbody tr:hover {
  background-color: var(--colorFondoCiudadano2);
}

tbody tr:last-child td {
  border-bottom: none;
}
</style>
