<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import TitleBar from '@/components/ComponentesGenerales/TituloComponente.vue';
import SearchPanel from '@/components/BusquedaPolicia/PoliciaBusquedaComponente.vue';
import ProfileSection from '@/components/BusquedaPolicia/PoliciaPerfilComponente.vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  components: {
    TitleBar,
    SearchPanel,
    ProfileSection
  },
  setup() {
    const route = useRoute();
    const containerHeight = computed(() => {
      return route.path.includes('/agentes/') ? '90rem' : '50rem';
    });

    return { containerHeight };
  }
});
</script>

<template>
  <div class="policia_container">
    <title-bar title="BUSCAR POLICIA" />
    <div class="policia_menu" :style="{ height: containerHeight }">
      <search-panel />
      <profile-section />
    </div>
  </div>
</template>

<style scoped>
.policia_container {
  padding: 2rem;
  background-color: var(--colorFondo);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3rem;
}

.policia_menu {
  display: flex;
  flex-direction: row;
  width: 80%;
  gap: 2rem;
}
</style>
