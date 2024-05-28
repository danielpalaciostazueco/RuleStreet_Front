<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import DenunciaCard from '@/components/Denuncias/TarjetaDenunciaComponente.vue';
import type { Denuncia } from '@/stores/storeDenuncia';

export default defineComponent({
  components: {
    DenunciaCard
  },
  props: {
    denuncias: Array as PropType<Denuncia[]>
  },
  methods: {
    selectDenuncia(idDenuncia: number) {
      this.$emit('select-denuncia', idDenuncia);
    }
  }
});
</script>

<template>
  <div class="denuncia_menu_izquierda_contenedor">
    <div class="denuncia_contenedor_tarjetas" v-if="denuncias && denuncias.length > 0">
      <denuncia-card v-for="denuncia in denuncias" :key="denuncia.idDenuncia" :denuncia="{
        id: denuncia.idDenuncia,
        titulo: denuncia.titulo,
      }" @click="selectDenuncia(denuncia.idDenuncia)" />
    </div>
    <p v-else>No se encontraron resultados para tu búsqueda.</p>
  </div>
</template>

<style scoped>
.denuncia_menu_izquierda_contenedor {
  display: flex;
  flex-direction: column;
  border-radius: 0.5rem;
  padding-left: 2rem;
  padding-right: 2rem;
  height: 100%;
  overflow-y: auto;
}

.denuncia_menu_izquierda_contenedor p {
  color: var(--colorTextoTarjeta);
}

.denuncia_menu_izquierda_contenedor::-webkit-scrollbar {
  width: 8px;
}

.denuncia_menu_izquierda_contenedor::-webkit-scrollbar-track {
  background-color: var(--colorFondoCiudadano2);
}

.denuncia_menu_izquierda_contenedor::-webkit-scrollbar-thumb {
  background-color: var(--colorBlanco);
  border-radius: 4px;
}

.denuncia_menu_izquierda_contenedor::-webkit-scrollbar-thumb:hover {
  background-color: var(--colorFondoCiudadano);
}

.denuncia_boton_contenedor {
  display: flex;
  justify-content: center;
}

.denuncia_contenedor_tarjetas {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
</style>