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
  <body>
    <div class="policia_container">
    <title-bar :title="$t('RangoPerfil.SearchPolice')" />
    <div class="policia_menu" :style="{ height: containerHeight }">
      <search-panel />
      <profile-section />
    </div>
  </div>
  </body>
</template>
<style scoped>
template,
html,
body {
  @apply bg-[color:var(--colorFondo)];
  height: 120%;
  
}

.policia_container {
  @apply bg-[color:var(--colorFondo)] min-h-screen flex flex-col items-center justify-center gap-12 p-8;
}

.policia_menu {
  @apply flex flex-row w-full gap-8;
 
}
.policia_icono[data-v-bfd5f251] {
    /* margin-left: 1.5rem; */
    height: 0.75rem;
    width: 0.75rem;
    fill: var(--colorSvg);
    transition: transform 0.3s ease, width 0.3s ease, height 0.3s ease;
}


@media screen and (max-width: 1329px) {
  .policia_menu {
  @apply min-h-[auto];
  @apply flex-col;
}
.policia_menu_izquierda[data-v-bfd5f251] {
  @apply flex w-full flex-col gap-4 bg-[color:var(--colorFondoCiudadano2)] py-4 rounded-lg;
}
.policia_busqueda button[data-v-bfd5f251][data-v-bfd5f251][data-v-bfd5f251] {
  @apply h-6 w-[5%] bg-[color:var(--colorBusquedaCiudadanoPerfilBoton)];
}

}

@media screen and (max-width: 768px) {
  .policia_menu {
    @apply flex-col w-full;
    min-height: auto;
  }
  
}

@media screen and (max-width: 480px) {
html,
body {
  @apply bg-[color:var(--colorFondo)];
  height: 465vh;
}
  .policia_menu {
    @apply flex-col w-full;
    min-height: auto;
    gap: 4; 
    
  }
}
</style>


