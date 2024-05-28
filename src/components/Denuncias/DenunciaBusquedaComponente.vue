<script lang="ts">
import { defineComponent, ref, onMounted, type Ref } from 'vue';
import DenunciaList from '@/components/Denuncias/ListaDenunciasComponente.vue';
import { useListadoDenuncias } from '@/stores/storeDenuncia';

export default defineComponent({
  components: {
    DenunciaList
  },
  setup() {
    const { infoDenuncias, cargarDatosDenuncias } = useListadoDenuncias();
    const searchQuery = ref('');
    const filteredDenuncias: Ref<Denuncia[]> = ref([]);

    onMounted(async () => {
      await cargarDatosDenuncias();
    });

    function searchDenuncias() {
      if (searchQuery.value.trim()) {
        filteredDenuncias.value = infoDenuncias.filter(denuncia =>
          denuncia.titulo.toLowerCase().includes(searchQuery.value.toLowerCase())
        );
      } else {
        filteredDenuncias.value = [];
      }
    }

    return { filteredDenuncias, searchDenuncias, searchQuery };
  }
});
</script>

<template>
  <div class="denuncia_menu_izquierda">
    <div class="denuncia_menu_izquierda_titulo">
      <h2>LISTA DE DENUNCIAS</h2>
    </div>
    <div class="denuncia_busqueda">
      <input type="text" placeholder="Buscar denuncia" v-model="searchQuery">
      <button @click="searchDenuncias">
        <svg class="denuncia_icono" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path
            d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
        </svg>
      </button>
    </div>
    <DenunciaList :denuncias="filteredDenuncias" />
  </div>
</template>

<style>
.denuncia_menu_izquierda {
  background-color: var(--colorFondoCiudadano2);
  width: 30%;
  display: flex;
  flex-direction: column;
  border-radius: 0.5rem;
  padding-top: 2rem;
  padding-bottom: 2rem;
  gap: 2rem;
}

.denuncia_menu_izquierda_titulo {
  display: flex;
  justify-content: center;
  align-items: center;
}

.denuncia_menu_izquierda_titulo h2 {
  background-color: var(--colorFondoCiudadano);
  border-radius: 0.7rem;
  height: 2.5rem;
  color: var(--colorTextoTarjeta);
  display: flex;
  align-items: center;
  width: 80%;
  display: flex;
  justify-content: center;
  font-size: 18px;
}

.denuncia_busqueda {
  display: flex;
  align-items: center;
  justify-content: center;
}

.denuncia_busqueda input {
  height: 2rem;
  outline: none;
  background-color: var(--colorBusquedaCiudadanoBusqueda);
  border: 1px solid var(--colorBusquedaCiudadanoBusqueda);
  color: var(--colorBlanco);
  padding-left: 1rem;
}

.denuncia_busqueda input::placeholder {
  color: var(--colorBlanco);
}

.denuncia_busqueda button {
  width: 5rem;
  height: 2rem;
  background-color: var(--colorBotonBusquedaCiudadano);
  border: none;
}

.denuncia_busqueda button:hover {
  background-color: var(--colorBotonBusquedaCiudadanoActivo);
  cursor: pointer;
}

.denuncia_icono {
  width: 1rem;
  height: 1rem;
  fill: var(--colorSvg);
  transition: transform 0.3s ease, width 0.3s ease, height 0.3s ease;
}
</style>