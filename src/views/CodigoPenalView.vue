<template>
  <div class="codigo-penal-container">
    <h1>Código Penal</h1>
    <input type="text" v-model="filtro" placeholder="Buscar en el código penal..." class="search-input" />
    <table>
      <thead>
        <tr>
          <th>Artículo</th>
          <th>Descripción</th>
          <th>Precio</th>
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
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue';
import { useListadoCodigoPenal } from '../stores/storeCodigoPenal'; 

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

<style scoped>
.codigo-penal-container {
  width: 80%;
  margin: auto;
  font-family: Arial, sans-serif;
}

h1 {
  text-align: center;
  color: #333;
}

.search-input {
  margin: 20px 0;
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
}

table {
  width: 100%;
  border-collapse: collapse;
}

table, th, td {
  border: 1px solid #ddd;
}

th, td {
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f4f4f4;
}
</style>
